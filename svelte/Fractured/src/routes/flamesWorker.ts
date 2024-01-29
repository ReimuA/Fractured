import { localBlur } from '$lib/FlamesUtils/blur';
import { updateFlamesColor } from '$lib/FlamesUtils/colorRendering';
import {
	createFlamesFromJson,
	defaultRenderMode,
	type Flames
} from '../lib/FlamesUtils/Flames';
import aashader from '../lib/FlamesUtils/shaders/aa.comp.wgsl?raw'
import { applyAA3x, applyNoAA } from '../lib/FlamesUtils/antialiasing';
import { c01, type XY } from '../lib/FlamesUtils/mathu';
import {
	createRenderData,
	iterateRenderData,
	resetRenderData,
	type RenderData
} from '../lib/FlamesUtils/render';
import type { FlamesWorkerMessage } from './messageType';

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


let inputBuffer!: GPUBuffer
let outputBuffer!: GPUBuffer
let outputReadBuffer!: GPUBuffer

let gammabuffer!: GPUBuffer
let bindgroup!: GPUBindGroup
let bindgroupLayout!: GPUBindGroupLayout
let flamesBindgroup!: GPUBindGroup
let flamesBindgroupLayout!: GPUBindGroupLayout
let device: GPUDevice;
let pipeline!: GPUComputePipeline
let pipelineLayout!: GPUPipelineLayout


async function frameWebGpu(buffer: Uint8ClampedArray, ctx: OffscreenCanvasRenderingContext2D) {
	device.queue.writeBuffer(inputBuffer, 0, buffer);
	device.queue.writeBuffer(gammabuffer, 0, new Float32Array([flames!.gammaCorrection]))
	let encoder = device.createCommandEncoder({ label: 'Compute encoder' });

	let pass = encoder.beginComputePass();

	pass.setPipeline(pipeline);
	pass.setBindGroup(0, bindgroup);
	pass.setBindGroup(1, flamesBindgroup);
	pass.dispatchWorkgroups(1920 / 8, 1080 / 8);
	pass.end();

	encoder.copyBufferToBuffer(outputBuffer, 0, outputReadBuffer, 0, outputReadBuffer.size);

	device.queue.submit([encoder.finish()]);

	await outputReadBuffer.mapAsync(GPUMapMode.READ);

	const imageData = new Uint8ClampedArray(outputReadBuffer.getMappedRange());

	const image = new ImageData(imageData, 1920, 1080);
	ctx.putImageData(image, 0, 0);

	outputReadBuffer.unmap();
}

async function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
	if (!renderData3x || !renderData || !canvasContent || !flames) return;

	p = iterateRenderData(flames, renderData, renderData3x, p, rotation, 25000, 25000 * nbIteration++);
	if (flames.spaceWarp.rotationalSymmetry > 1)
		rotation = (rotation + (2 * Math.PI) / flames.spaceWarp.rotationalSymmetry) % (2 * Math.PI);

	updateFlamesColor(flames, flames.antialiasing ? renderData3x : renderData);

	let pixelsBuffer = flames.antialiasing ? renderData3x.pixels : renderData.pixels

	if (flames.densityEstimation && !flames.antialiasing) {
		const maxSigma = flames.densityEstimation.maxSigma
		const minSigma = flames.densityEstimation.minSigma

		const jpp = new Uint8ClampedArray(renderData.pixels.length)

		for (let i = 0; i < renderData.heatmap.length; i++) {
			const pixelsIdx = i * 4
			const max = Math.log10(renderData.heatmapMax / 100)
			const current = Math.log10(renderData.heatmap[i])
			const sigma = maxSigma - c01((current / max)) * (maxSigma - minSigma)
			/*  jpp[pixelsIdx] = 255 * sigma / maxSigma
				jpp[pixelsIdx + 1] = 255 * sigma / maxSigma
				jpp[pixelsIdx + 3] = 255 */
			localBlur(pixelsIdx, flames.resolution, renderData.pixels, jpp, sigma)
		}

		pixelsBuffer = jpp
	}

	let time = Date.now()

	if (flames.antialiasing) {
		await frameWebGpu(renderData3x.pixels, ctx)

	} else {
		applyNoAA(canvasResolution, pixelsBuffer, renderData.heatmap, renderData.heatmapMax, canvasContent, flames.renderMode !== defaultRenderMode, flames.gammaCorrection);
		ctx.putImageData(new ImageData(canvasContent, canvasResolution.x, canvasResolution.y), 0, 0);

	}
}

async function init(newFlames: Flames, canvas: OffscreenCanvas) {
	const ctx = canvas.getContext('2d');

	if (ctx === null) {
		console.error('Failure to initialize the flames worker due to invaldie canvas context');
		return;
	}

	const adapter = await navigator.gpu.requestAdapter();
	device = await adapter!.requestDevice();
	bindgroupLayout = device.createBindGroupLayout({
		entries: [
			{
				binding: 0,
				visibility: GPUShaderStage.COMPUTE,
				buffer: {
					type: 'storage'
				}
			},
			{
				binding: 1,
				visibility: GPUShaderStage.COMPUTE,
				buffer: {
					type: 'storage'
				}
			}
		]
	});

	flamesBindgroupLayout = device.createBindGroupLayout({
		entries: [
			{
				binding: 0,
				visibility: GPUShaderStage.COMPUTE,
				buffer: { type: 'uniform' }
			}
		]
	})
	inputBuffer = device.createBuffer({
		size: 1920 * 1080 * 4 * 9,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
	});

	outputBuffer = device.createBuffer({
		size: 1920 * 1080 * 4,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
	});

	gammabuffer = device.createBuffer({
		size: 4,
		usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	})

	outputReadBuffer = device.createBuffer({
		size: 1920 * 1080 * 4,
		usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
	});

	bindgroup = device.createBindGroup({
		layout: bindgroupLayout,
		entries: [
			{ binding: 0, resource: { buffer: inputBuffer } },
			{ binding: 1, resource: { buffer: outputBuffer } }
		]
	});

	flamesBindgroup = device.createBindGroup({
		layout: flamesBindgroupLayout,
		entries: [
			{ binding: 0, resource: { buffer: gammabuffer } }
		]
	})

	pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [bindgroupLayout, flamesBindgroupLayout] });

	pipeline = device.createComputePipeline({
		layout: pipelineLayout,
		compute: {
			module: device.createShaderModule({ code: aashader }),
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

