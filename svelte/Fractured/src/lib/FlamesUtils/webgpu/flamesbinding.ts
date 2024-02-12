import { makeShaderDataDefinitions, makeStructuredView, type StructuredView, } from "webgpu-utils"
import blurshader from '$lib/FlamesUtils/shaders/blur.comp.wgsl?raw'

export type FlamesBinding = {
    bindgroup: GPUBindGroup
    bindgroupLayout: GPUBindGroupLayout
    structuredView: StructuredView
    buffers: {
        gamma: GPUBuffer // Boolean
        logDensity: GPUBuffer // Boolean
        densityEstimation: GPUBuffer // Boolean - u32 (min sigma) - u32 (max sigma)
        antialiasing: GPUBuffer // Boolean
        flames: GPUBuffer // Everything
        timeElapsed: GPUBuffer // u32
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
        {
            binding: 2,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        },
        {
            binding: 3,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        },
        {
            binding: 4,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        },
        {
            binding: 5,
            visibility: GPUShaderStage.COMPUTE,
            buffer: { type: 'uniform' }
        }
    ]
})

export function createFlamesBinding(device: GPUDevice): FlamesBinding {
    const typeDefinition = makeShaderDataDefinitions(blurshader)
    const structuredView = makeStructuredView(typeDefinition.uniforms.flames)

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

    const antialiasing = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })

    const flames = device.createBuffer({
        size: structuredView.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })

    const timeElapsed = device.createBuffer({
        size: structuredView.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })

    const bindgroup = device.createBindGroup({
        layout: bindgroupLayout,
        entries: [
            { binding: 0, resource: { buffer: gamma } },
            { binding: 1, resource: { buffer: logDensity } },
            { binding: 2, resource: { buffer: densityEstimation } },
            { binding: 3, resource: { buffer: antialiasing } },
            { binding: 4, resource: { buffer: flames } },
            { binding: 5, resource: { buffer: timeElapsed } }
        ]
    })

    return {
        bindgroup,
        bindgroupLayout,
        structuredView,
        buffers: {
            gamma,
            logDensity,
            densityEstimation,
            antialiasing,
            flames,
            timeElapsed
        }
    }
}