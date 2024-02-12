import {
	createFlamesFromJson,
	type Flames,
} from '$lib/FlamesUtils/Flames';
import aashader from '$lib/FlamesUtils/shaders/aa.comp.wgsl?raw'
import blurshader from '$lib/FlamesUtils/shaders/blur.comp.wgsl?raw'
import colorShader from '$lib/FlamesUtils/shaders/coloring.comp.wgsl?raw'
import gammaShader from '$lib/FlamesUtils/shaders/gamma.comp.wgsl?raw'
import flamesShader from '$lib/FlamesUtils/shaders/flames.comp.wgsl?raw'
import type { XY } from '$lib/FlamesUtils/mathu';
import {
	createRenderData,
	iterateRenderData,
	resetRenderData,
	type RenderData
} from '../lib/FlamesUtils/render';
import type { FlamesWorkerMessage } from './messageType';
import { createRenderDataBinding, type RenderDataBinding } from '$lib/FlamesUtils/webgpu/renderDataBinding';
import { createFlamesBinding, type FlamesBinding } from '$lib/FlamesUtils/webgpu/flamesbinding';
import { updateGPUBuffer } from '$lib/FlamesUtils/webgpu/renderpass';

let flames: Flames | undefined;
let p: XY = { x: 0, y: 0 };
let canvasResolution: XY = { x: 0, y: 0 };
let nbIteration = 0;
let rotation = 0;

// In order to switch in and out of anti aliasing, we compute both the normal sample and the super sample at the same time.
// The performance cost of this is mostly trivial since the heavy calculation happen when trying to render, rather than plotting the data.
// The memory cost is also trivial as we had a mere 11.11% memory usage because we will plot the super sample data anyway, which is 9 times larger (3 * 3)
// than the default one.
//
// Finally : The advantage of this is to remove the heavy weight of rendering the supersample every time, because we can just render the default sample and thus increase the performance.
let renderData: RenderData | undefined;
let renderData3x: RenderData | undefined;

let canvasContent: Uint8ClampedArray | undefined;

let outputReadBuffer!: GPUBuffer

let rDataBinding!: RenderDataBinding
let flamesBinding!: FlamesBinding

let device: GPUDevice;
let blurPipeline!: GPUComputePipeline
let flamesPipeline!: GPUComputePipeline
let colorPipeline!: GPUComputePipeline
let gammaPipeline!: GPUComputePipeline
let aaPipeline!: GPUComputePipeline
let pipelineLayout!: GPUPipelineLayout


function addPipeline(pass: GPUComputePassEncoder, pipeline: GPUComputePipeline, sizeX: number = 1920, sizeY: number = 1080) {
	pass.setPipeline(pipeline);
	pass.setBindGroup(0, rDataBinding.bindgroup);
	pass.setBindGroup(1, flamesBinding.bindgroup);
	pass.dispatchWorkgroups(sizeX / 8, sizeY / 8);
}

async function frameWebGpu(renderData: RenderData, ctx: OffscreenCanvasRenderingContext2D) {
	updateGPUBuffer(device, renderData, flames!, rDataBinding, flamesBinding)

	let outputbuffer = rDataBinding.buffers.finalImage
	let encoder = device.createCommandEncoder({ label: 'Compute encoder' });

	let pass = encoder.beginComputePass();

	addPipeline(pass, flamesPipeline, 64, 64);
	addPipeline(pass, colorPipeline);

	if (flames?.antialiasing)
		addPipeline(pass, aaPipeline)
	else
		addPipeline(pass, gammaPipeline)

	if (flames?.densityEstimation) {
		addPipeline(pass, blurPipeline)
		outputbuffer = rDataBinding.buffers.blurredImage
	}

	pass.end();

	encoder.copyBufferToBuffer(outputbuffer, 0, outputReadBuffer, 0, outputReadBuffer.size);

	device.queue.submit([encoder.finish()]);

	await outputReadBuffer.mapAsync(GPUMapMode.READ);

	const imageData = new Uint8ClampedArray(outputReadBuffer.getMappedRange());
	const image = new ImageData(imageData, 1920, 1080);
	ctx.putImageData(image, 0, 0);
	outputReadBuffer.unmap();
}
/* 
function resetGPUData() {
	device.queue.writeBuffer(renderDataBinding.buffers.heatmapMax, 0, new Uint32Array([renderData.heatmapMax]))

}
 */
async function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
	if (!renderData3x || !renderData || !canvasContent || !flames) return;

	if (!flames.GPUCompute) {
		console.log("iteration " + (25000 * nbIteration));
		p = iterateRenderData(flames, renderData, renderData3x, p, rotation, 25000, 25000 * nbIteration++);

	}

	if (flames.spaceWarp.rotationalSymmetry > 1)
		rotation = (rotation + (2 * Math.PI) / flames.spaceWarp.rotationalSymmetry) % (2 * Math.PI);
	
	let rData = flames.antialiasing ? renderData3x : renderData;
	const time = Date.now()
	await frameWebGpu(rData, ctx)
	console.log('Frame cost : ' + (Date.now() - time) + ', Total iteration :' + ((nbIteration++) * 1000 * 64 * 64))
}

async function init(newFlames: Flames, canvas: OffscreenCanvas) {
	const ctx = canvas.getContext('2d');

	if (ctx === null) {
		console.error('Failure to initialize the flames worker due to invaldie canvas context');
		return;
	}

	const adapter = await navigator.gpu.requestAdapter();
	device = await adapter!.requestDevice();
	console.log(device.limits)
	rDataBinding = createRenderDataBinding(device)
	flamesBinding = createFlamesBinding(device)


	outputReadBuffer = device.createBuffer({
		size: 1920 * 1080 * 4,
		usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
	});


	pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [rDataBinding.bindgroupLayout, flamesBinding.bindgroupLayout] });

	flamesPipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: flamesShader }),
			entryPoint: 'main'
		}
	});

	colorPipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: colorShader }),
			entryPoint: 'main'
		}
	});

	aaPipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: aashader }),
			entryPoint: 'main'
		}
	});

	gammaPipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: gammaShader }),
			entryPoint: 'main'
		}
	})

	blurPipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: blurshader }),
			entryPoint: 'main'
		}
	});

	canvasResolution = { x: canvas.width, y: canvas.height };

	flames = newFlames;
	canvasContent ??= new Uint8ClampedArray(canvasResolution.x * canvasResolution.y * 4);
	renderData ??= createRenderData(flames.resolution.x * flames.resolution.y);
	renderData3x ??= createRenderData(flames.resolution.x * flames.resolution.y * 3 * 3);

	requestAnimationFrame(flamesIteration);

	async function flamesIteration() {
		if (flames !== undefined && ctx) {
			await updateCanvas(ctx);
		}
		setTimeout(() => requestAnimationFrame(flamesIteration), 1000 / 60);
	}
}

function reset(newFlames: Flames) {
	p = { x: 0, y: 0 };
	flames = newFlames;
	if (renderData3x) resetRenderData(renderData3x);
	if (renderData) resetRenderData(renderData);
}

function softreset(newFlames: Flames) {
	rotation = 0;
	flames = newFlames;

	p = { x: 0, y: 0 };
	if (renderData3x) resetRenderData(renderData3x);
	if (renderData) resetRenderData(renderData);
}

function update(newFlames: Flames) {
	flames = newFlames;

}

onmessage = async ({ data }: MessageEvent<FlamesWorkerMessage>) => {
	const flames = createFlamesFromJson(data.rawFlames);
	switch (data.resetType) {
		case 'init':
			if (data.canvasContext) await init(flames, data.canvasContext);
			break;
		case 'full':
			reset(flames);
			break;
		case 'soft':
			softreset(flames);
			break;
		case 'none':
			update(flames);
			break;
	}

	postMessage({ flames: JSON.stringify(flames, null, 4) });
};

export { };

