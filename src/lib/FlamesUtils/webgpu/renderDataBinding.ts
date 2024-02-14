export type RenderDataBinding = {
    bindgroup: GPUBindGroup
    bindgroupLayout: GPUBindGroupLayout
    buffers: {
        pixels: GPUBuffer
        heatmap: GPUBuffer
        heatmapMax: GPUBuffer
        finalImage: GPUBuffer
        blurredImage: GPUBuffer
        paletteIndexAccumulator: GPUBuffer
        colorAccumulator: GPUBuffer
        colorPaletteAccumulator: GPUBuffer
    }
}

const createBindGroupLayout = (device: GPUDevice) => device.createBindGroupLayout({
    entries: Array.from({length: 8}, (_, i) =>({
        binding: i,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
            type: 'storage'
        }
    }))
});

export function createRenderDataBinding(device: GPUDevice): RenderDataBinding {
    const bindgroupLayout = createBindGroupLayout(device)

    const heatmapMax = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    // Due to webgpu's gpu buffer limitation, it is not possible to have more than 8 storage buffer per shader.
    // To avoid this issue, the heatmap, pixels and all accumulator contains both the super sample and the default.
    // Hence we have the resolution * bytesSize * (9 + 1)
    const pixels = device.createBuffer({
        size: 1920 * 1080 * 4 * 10,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });


    const heatmap = device.createBuffer({
        size: 1920 * 1080 * 4 * 10 ,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    });

    const paletteIndexAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 10,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })

    const colorAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 10,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })

    const colorPaletteAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 10,
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
            { binding: 5, resource: { buffer: paletteIndexAccumulator } },
            { binding: 6, resource: { buffer: colorAccumulator } },
            { binding: 7, resource: { buffer: colorPaletteAccumulator } },
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
            paletteIndexAccumulator,
            colorAccumulator,
            colorPaletteAccumulator
        }
    }
}