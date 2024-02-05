import { defaultRenderMode, type Flames } from "../Flames";
import type { RenderData } from "../render";
import type { FlamesBinding } from "./flamesbinding";
import type { RenderDataBinding } from "./renderDataBinding";

export function updateGPUBuffer(device: GPUDevice, renderData: RenderData, flames: Flames, renderDataBinding : RenderDataBinding, flamesBinding: FlamesBinding) {
    device.queue.writeBuffer(renderDataBinding.buffers.pixels, 0, renderData.pixels);
	device.queue.writeBuffer(renderDataBinding.buffers.heatmap, 0, new Float32Array(renderData.heatmap))
	device.queue.writeBuffer(renderDataBinding.buffers.heatmapMax, 0, new Float32Array([renderData.heatmapMax]))
	device.queue.writeBuffer(flamesBinding.buffers.gamma, 0, new Float32Array([flames!.gammaCorrection]))
	device.queue.writeBuffer(flamesBinding.buffers.logDensity, 0, new Float32Array([Number(flames!.renderMode != defaultRenderMode)]))
	device.queue.writeBuffer(flamesBinding.buffers.densityEstimation, 0, new Float32Array([flames?.densityEstimation ? 1 : 0, flames?.densityEstimation?.minSigma ?? 0, flames?.densityEstimation?.maxSigma ?? 0]))
	device.queue.writeBuffer(flamesBinding.buffers.antialiasing, 0, new Float32Array([flames.antialiasing ? 1 : 0]))
}