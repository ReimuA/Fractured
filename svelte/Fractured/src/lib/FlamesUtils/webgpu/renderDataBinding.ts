export type RenderDataBinding = {
    bindgroup: GPUBindGroup
    bindgroupLayout: GPUBindGroupLayout
    buffers: {
        pixels: GPUBuffer
        heatmap: GPUBuffer
        heatmapMax: GPUBuffer
        finalImage: GPUBuffer
        blurredImage: GPUBuffer
        renderingAccumulator: GPUBuffer
    }
}

const createBindGroupLayout = (device: GPUDevice) => device.createBindGroupLayout({
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
        },
        {
            binding: 2,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage'
            }
        },
        {
            binding: 3,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage'
            }
        },
        {
            binding: 4,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage'
            }
        },
        {
            binding: 5,
            visibility: GPUShaderStage.COMPUTE,
            buffer: {
                type: 'storage'
            }
        }
    ]
});

export function createRenderDataBinding(device: GPUDevice): RenderDataBinding {
    const bindgroupLayout = createBindGroupLayout(device)

    const pixels = device.createBuffer({
        size: 1920 * 1080 * 4 * 9,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    const heatmapMax = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    const heatmap = device.createBuffer({
        size: 1920 * 1080 * 9 * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });


    const renderingAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 9,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })

    const finalImage = device.createBuffer({
        size: 1920 * 1080 * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
    });

    const blurredImage = device.createBuffer({
        size: 1920 * 1080 * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
    });

    const bindgroup = device.createBindGroup({
        layout: bindgroupLayout,
        entries: [
            { binding: 0, resource: { buffer: heatmap } },
            { binding: 1, resource: { buffer: pixels } },
            { binding: 2, resource: { buffer: finalImage } },
            { binding: 3, resource: { buffer: heatmapMax } },
            { binding: 4, resource: { buffer: blurredImage } },
            { binding: 5, resource: { buffer: renderingAccumulator } },
        ]
    });

    return {
        bindgroupLayout: bindgroupLayout,
        bindgroup: bindgroup,
        buffers: {
            pixels,
            heatmap,
            heatmapMax,
            finalImage,
            blurredImage,
            renderingAccumulator,
        }
    }
}