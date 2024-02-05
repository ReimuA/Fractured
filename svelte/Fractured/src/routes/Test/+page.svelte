<script lang="ts">
	import { applyAA3x } from '$lib/FlamesUtils/antialiasing';
	import blurshader from '$lib/FlamesUtils/shaders/blur.comp.wgsl?raw';
	import { createFlamesBinding } from '$lib/FlamesUtils/webgpu/flamesbinding';
	import { createRenderDataBinding } from '$lib/FlamesUtils/webgpu/renderDataBinding';
	import { onMount } from 'svelte';

	onMount(async () => {
		const adapter = await navigator.gpu.requestAdapter();
		let device = await adapter!.requestDevice();

		let renderDataBinding = createRenderDataBinding(device)
		let flamesDataBinding = createFlamesBinding(device)

		let outputReadBuffer = device.createBuffer({
			size: 1920 * 1080 * 4,
			usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
		});


		let pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [renderDataBinding.bindgroupLayout,flamesDataBinding.bindgroupLayout] });

		let pipeline = device.createComputePipeline({
			layout: pipelineLayout,
			compute: {
				module: device.createShaderModule({ code: blurshader }),
				entryPoint: 'main'
			}
		});

		let testBuffer = new Uint8ClampedArray(1920 * 1080 * 4).map((x, i) => i <= 3 ? 255 : 0);

		let resBuffer = new Uint8ClampedArray(1920 * 1080 * 4);

        console.log(testBuffer)
		//applyAA3x({ x: 1920, y: 1080 }, testBuffer, resBuffer, new Uint32Array(), false, 0);
		console.log(resBuffer);

		device.queue.writeBuffer(renderDataBinding.buffers.finalImage, 0, testBuffer)		
		device.queue.writeBuffer(flamesDataBinding.buffers.densityEstimation, 0, new Float32Array([0, 1, 2]))

		let encoder = device.createCommandEncoder({ label: 'Compute encoder' });

		let pass = encoder.beginComputePass();

		pass.setPipeline(pipeline);
		pass.setBindGroup(0, renderDataBinding.bindgroup);
		pass.setBindGroup(1, flamesDataBinding.bindgroup);
		pass.dispatchWorkgroups(1920 / 8, 1080 / 8);
		pass.end();

		encoder.copyBufferToBuffer(renderDataBinding.buffers.blurredImage, 0, outputReadBuffer, 0, outputReadBuffer.size);

		device.queue.submit([encoder.finish()]);

		await outputReadBuffer.mapAsync(GPUMapMode.READ);

		const imageData = new Uint8ClampedArray(outputReadBuffer.getMappedRange());
		console.log(imageData);
	});
</script>

<div>coucou</div>
