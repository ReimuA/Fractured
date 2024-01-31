export type FlamesBinding = {
    bindgroup: GPUBindGroup
    bindgroupLayout: GPUBindGroupLayout
    buffers: {
        gamma: GPUBuffer // Boolean
        logDensity: GPUBuffer // Boolean
        densityEstimation: GPUBuffer // Boolean - u32 (min sigma) - u32 (max sigma)
    }  
}

const createBindGroupLayout = (device: GPUDevice) => device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        },
        {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        },
       /*  {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        } */
    ]
})

export function createFlamesBinding(device: GPUDevice): FlamesBinding {
    const bindgroupLayout = createBindGroupLayout(device)

    const gamma = device.createBuffer({
		size: 4,
		usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
	})

	const logDensity = device.createBuffer({
		size: 4,
		usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
	})

    const densityEstimation = device.createBuffer({
		size: 4 * 3,
		usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
	})

    
	const bindgroup = device.createBindGroup({
		layout: bindgroupLayout,
		entries: [
			{ binding: 0, resource: { buffer: gamma } },
			{ binding: 1, resource: { buffer: logDensity } },
			// { binding: 2, resource: { buffer: densityEstimation } },
		]
	})

    return {
        bindgroup,
        bindgroupLayout,
        buffers: {
            gamma,
            logDensity,
            densityEstimation
        }
    }
}