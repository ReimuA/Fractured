<script lang="ts">
	import { onMount } from 'svelte';
	import { flamesJsonMetadata, canvasRef, flamesBuilderStore } from './stores';
	import type {
		FlamesWorkerMessage,
	} from './messageType';
	import { writable } from 'svelte/store';

	let canvas: HTMLCanvasElement;
	let syncWorker: Worker | undefined;

	const loadWorker = async () => {
		const canvasContext = canvas.transferControlToOffscreen();
		const SyncWorker = await import('./flamesWorker?worker');

		syncWorker = new SyncWorker.default();
		syncWorker.onmessage = ({ data }) => {
			$flamesJsonMetadata = data.flames;
		};
		syncWorker.onerror = console.error;
		syncWorker.onmessageerror = console.error;
		const rawFlames = JSON.stringify($flamesBuilderStore.builder.build())
		const initMsg: FlamesWorkerMessage = { resetType: 'init', rawFlames, canvasContext: canvasContext };
		syncWorker.postMessage(initMsg, [canvasContext]);
	};

	onMount(() => {
		loadWorker();

		flamesBuilderStore.subscribe((builder) => {
			const rawFlames = JSON.stringify(builder.builder.build())
			const msg: FlamesWorkerMessage = { rawFlames, resetType: builder.resetType};
			syncWorker?.postMessage(msg);
		});

		$canvasRef = canvas;
	});
</script>

<canvas
	bind:this={canvas}
	width="1920"
	height="1080"
	class="h-screen w-screen bg-black absolute top-0 left-0 -z-10"
/>

<style lang="postcss">
	:global(html) {
	}
</style>
