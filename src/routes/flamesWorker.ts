import {
	createFlamesFromJson,
	type Flames,
} from '$lib/FlamesUtils/Flames';
import aashader from '$lib/FlamesUtils/shaders/aa.comp.wgsl?raw'
import blurshader from '$lib/FlamesUtils/shaders/blur.comp.wgsl?raw'
import colorShader from '$lib/FlamesUtils/shaders/coloring.comp.wgsl?raw'
import gammaShader from '$lib/FlamesUtils/shaders/gamma.comp.wgsl?raw'
import flamesShader from '$lib/FlamesUtils/shaders/flames.comp.wgsl?raw'
import resetShader from '$lib/FlamesUtils/shaders/reset.comp.wgsl?raw'
import type { XY } from '$lib/FlamesUtils/mathu';
import type { FlamesWorkerMessage } from './messageType';
import { createRenderDataBinding, type RenderDataBinding } from '$lib/FlamesUtils/webgpu/renderDataBinding';
import { createFlamesBinding, type FlamesBinding } from '$lib/FlamesUtils/webgpu/flamesbinding';
import { updateGPUBuffer } from '$lib/FlamesUtils/webgpu/renderpass';
import { createPipeline } from '$lib/FlamesUtils/webgpu/pipeline';

let flames: Flames | undefined;
let canvasResolution: XY = { x: 0, y: 0 };

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
let resetPipeline!: GPUComputePipeline


function addPipeline(pass: GPUComputePassEncoder, pipeline: GPUComputePipeline, sizeX: number = 1920, sizeY: number = 1080) {
	pass.setPipeline(pipeline);
	pass.setBindGroup(0, rDataBinding.bindgroup);
	pass.setBindGroup(1, flamesBinding.bindgroup);
	pass.dispatchWorkgroups(sizeX / 8, sizeY / 8);
}

async function frameWebGpu(ctx: OffscreenCanvasRenderingContext2D) {
	updateGPUBuffer(device, flames!, rDataBinding, flamesBinding)

	let outputbuffer = rDataBinding.buffers.finalImage
	let encoder = device.createCommandEncoder({ label: 'Compute encoder' });

	let pass = encoder.beginComputePass();

	addPipeline(pass, flamesPipeline, 16, 16);
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

function resetFrame() {
	let encoder = device.createCommandEncoder({ label: 'Reset render data encoder' });
	let pass = encoder.beginComputePass();

	addPipeline(pass, resetPipeline);

	pass.end();
	device.queue.submit([encoder.finish()]);
}

async function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
	if (!canvasContent || !flames) return;

	await frameWebGpu(ctx)
}

async function init(newFlames: Flames, canvas: OffscreenCanvas) {
	const ctx = canvas.getContext('2d');

	if (ctx === null) {
		console.error('Failure to initialize the flames worker due to invaldie canvas context');
		return;
	}

	const adapter = await navigator.gpu.requestAdapter();
	device = await adapter!.requestDevice();
	rDataBinding = createRenderDataBinding(device)
	flamesBinding = createFlamesBinding(device)


	outputReadBuffer = device.createBuffer({
		size: 1920 * 1080 * 4,
		usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
	});


	pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [rDataBinding.bindgroupLayout, flamesBinding.bindgroupLayout] });

	flamesPipeline = createPipeline(device, pipelineLayout, flamesShader);
	colorPipeline = createPipeline(device, pipelineLayout, colorShader);
	aaPipeline = createPipeline(device, pipelineLayout,  aashader);
	gammaPipeline = createPipeline(device, pipelineLayout, gammaShader)
	blurPipeline = createPipeline(device, pipelineLayout, blurshader);
	resetPipeline = createPipeline(device, pipelineLayout, resetShader);

	canvasResolution = { x: canvas.width, y: canvas.height };

	flames = newFlames;
	canvasContent ??= new Uint8ClampedArray(canvasResolution.x * canvasResolution.y * 4);

	requestAnimationFrame(flamesIteration);

	async function flamesIteration() {
		if (flames !== undefined && ctx) {
			await updateCanvas(ctx);
		}
		setTimeout(() => requestAnimationFrame(flamesIteration), 1000 / 60);
	}
}

function reset(newFlames: Flames) {
	flames = newFlames;
	if (resetPipeline) resetFrame();
}

function softreset(newFlames: Flames) {
	flames = newFlames;

	if (resetPipeline) resetFrame();
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

