<script lang="ts">
	import { onMount } from 'svelte';
	import { createFlamesFromJson, type Flames } from '$lib/FlamesUtils/Flames';
	import { renderModeStore, variationsPools, colorPaletteStore, flamesJsonMetadata, canvasRef, spaceWarpingStore, flamesStore } from './stores';
	import type { InitMessage, PaletteChangeMessage, ResetMessage, SoftResetMessage } from './messageType';
	import {  writable } from 'svelte/store';


	let canvas: HTMLCanvasElement;
	let syncWorker: Worker | undefined;

	// New variations pools, reset the canvas
	variationsPools.subscribe((v) => {
		if (!(canvas && v.length != 0)) return;

		const resetMsg: ResetMessage = { type: 'FlamesReset', variationsPools: v.map((e) => e.name) };
		syncWorker?.postMessage(resetMsg);
	});

	// New rotation symetry
	spaceWarpingStore.subscribe((n) => {
		const softResetMsg: SoftResetMessage = { type: 'FlamesSoftReset',  spaceWarping: n };
		syncWorker?.postMessage(softResetMsg);
	});

	colorPaletteStore.subscribe((palette) => {
		const msg: PaletteChangeMessage = { type: 'FlamesPaletteChange', namedColorPalette: palette };
		syncWorker?.postMessage(msg);
	});

	renderModeStore.subscribe((renderMode) =>
		syncWorker?.postMessage({ type: 'FlamesRenderModeChange', renderMode })
	);

	const loadWorker = async () => {
		const canvasContext = canvas.transferControlToOffscreen();
		const SyncWorker = await import('./flamesWorker?worker');

		syncWorker = new SyncWorker.default();
		syncWorker.onmessage = ({data}) => {
			$flamesStore = createFlamesFromJson(data.flames)
			$flamesJsonMetadata = data.flames
		};
		syncWorker.onerror = console.error;
		syncWorker.onmessageerror = console.error;

		const initMsg: InitMessage = { type: 'FlamesInit', canvasContext: canvasContext };
		syncWorker.postMessage(initMsg, [canvasContext]);
	};

	onMount(() => {
		loadWorker();
		$canvasRef = canvas
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
