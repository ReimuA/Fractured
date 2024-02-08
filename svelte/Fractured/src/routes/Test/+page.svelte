<script lang="ts">
	import { applyAA3x } from '$lib/FlamesUtils/antialiasing';
	import flamesShader from '$lib/FlamesUtils/shaders/flames.comp.wgsl?raw';
	import { createFlamesBinding } from '$lib/FlamesUtils/webgpu/flamesbinding';
	import { createRenderDataBinding } from '$lib/FlamesUtils/webgpu/renderDataBinding';
	import { onMount } from 'svelte';

	onMount(async () => {
		const adapter = await navigator.gpu.requestAdapter();
		let device = await adapter!.requestDevice();

		let bgl = device.createBindGroupLayout({
			entries: [
				{
					binding: 0,
					visibility: GPUShaderStage.COMPUTE,
					buffer: {
						type: 'storage'
					}
				}
			]
		});

		let buffer = device.createBuffer({
			size: 1920 * 1080 * 4,
			usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
		});


		let bg = device.createBindGroup({
			layout: bgl,
			entries: [
				{
					binding: 0,
					resource: {
						buffer: buffer
					},
				}
			]
		})

		let renderDataBinding = createRenderDataBinding(device);
		let flamesDataBinding = createFlamesBinding(device);

		let outputReadBuffer = device.createBuffer({
			size: 1920 * 1080 * 4,
			usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
		});

		let pipelineLayout = device.createPipelineLayout({
			bindGroupLayouts: [bgl, flamesDataBinding.bindgroupLayout]
		});

		let pipeline = device.createComputePipeline({
			layout: pipelineLayout,
			compute: {
				module: device.createShaderModule({ code: flamesShader }),
				entryPoint: 'main'
			}
		});

		let encoder = device.createCommandEncoder({ label: 'Compute encoder' });

		let pass = encoder.beginComputePass();

		pass.setPipeline(pipeline);
		pass.setBindGroup(0, bg);
		pass.setBindGroup(1, flamesDataBinding.bindgroup);
		pass.dispatchWorkgroups(1920 / 8, 1080 / 8);
		pass.end();

		encoder.copyBufferToBuffer(
			buffer,
			0,
			outputReadBuffer,
			0,
			outputReadBuffer.size
		);

		device.queue.submit([encoder.finish()]);

		await outputReadBuffer.mapAsync(GPUMapMode.READ);
		let res = new Float32Array(outputReadBuffer.getMappedRange());

		console.log(res);


		let buckets = new Array(100).fill(0)
		console.log(buckets)
		for (let i = 0; i < res.length; i++) {
			let bucket = Math.floor(res[i]* 100);

			buckets[bucket]++;
		}

		for (let i = 0; i < buckets.length; i++) {
			buckets[i] /=res.length
		}
		console.log(buckets)

		console.log(buckets.reduce((p, c) => p + c, 0))

	});
</script>

<div>coucou</div>
