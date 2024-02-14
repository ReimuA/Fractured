export function createPipeline(device: GPUDevice, layout: GPUPipelineLayout, code: string): GPUComputePipeline {
    return device.createComputePipeline({
		layout: layout,
		compute: {
			module: device.createShaderModule({ code }),
			entryPoint: 'main'
		}
	})
}