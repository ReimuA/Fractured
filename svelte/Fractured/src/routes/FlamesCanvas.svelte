<script lang="ts">
	import { onMount } from 'svelte';
	import type { FlamesWorkerMessage } from './messageType';
	import { canvasRef, flamesBuilderStore, flamesStore } from './stores';

	let canvas: HTMLCanvasElement;
	let syncWorker: Worker | undefined;

	const loadWorker = async () => {
		const canvasContext = canvas.transferControlToOffscreen();
		const SyncWorker = await import('./flamesWorker?worker');

		syncWorker = new SyncWorker.default();
		syncWorker.onerror = console.error;
		syncWorker.onmessageerror = console.error;
		const rawFlames = JSON.stringify($flamesStore.flames);
		const initMsg: FlamesWorkerMessage = {
			resetType: 'init',
			rawFlames,
			canvasContext: canvasContext
		};
		syncWorker.postMessage(initMsg, [canvasContext]);
	};

	onMount(() => {
		loadWorker();

		flamesStore.subscribe((value) => {
			const rawFlames = JSON.stringify(value.flames);
			const msg: FlamesWorkerMessage = { rawFlames, resetType: value.resetType };
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
