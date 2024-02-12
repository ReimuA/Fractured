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


    const paletteIndexAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 9,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })

    const colorAccumulator = device.createBuffer({
        size: 1920 * 1080 * 4 * 9,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
    })

    const colorPaletteAccumulator = device.createBuffer({
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