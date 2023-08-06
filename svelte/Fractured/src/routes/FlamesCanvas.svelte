<script lang="ts">
	import { onMount } from 'svelte';
	import type { RenderData } from '$lib/FlamesUtils/render';
	import type { XY } from '$lib/FlamesUtils/mathu';
	import type { Flames } from '$lib/FlamesUtils/Flames';
	import { renderModeStore, variationsPools, colorPaletteStore, flamesJsonMetadata, canvasRef, rotationalSymmetryStore } from './stores';
	import type { InitMessage, PaletteChangeMessage, ResetMessage, SoftResetMessage } from './messageType';

	let canvas: HTMLCanvasElement;
	let syncWorker: Worker | undefined;

	// New variations pools, reset the canvas
	variationsPools.subscribe((v) => {
		if (!(canvas && v.length != 0)) return;

		const resetMsg: ResetMessage = { type: 'FlamesReset', variationsPools: v.map((e) => e.name) };
		syncWorker?.postMessage(resetMsg);
	});

	// New rotation symetry
	rotationalSymmetryStore.subscribe((n) => {
		const softResetMsg: SoftResetMessage = { type: 'FlamesSoftReset',  rotationalSymmetry: n };
		syncWorker?.postMessage(softResetMsg);
	});

	colorPaletteStore.subscribe((palette) => {
		const msg: PaletteChangeMessage = { type: 'FlamesPaletteChange', palette };
		syncWorker?.postMessage(msg);
	});

	renderModeStore.subscribe((renderMode) =>
		syncWorker?.postMessage({ type: 'FlamesRenderModeChange', renderMode })
	);

	const loadWorker = async () => {
		const canvasContext = canvas.transferControlToOffscreen();
		const SyncWorker = await import('./flamesWorker?worker');

		syncWorker = new SyncWorker.default();
		syncWorker.onmessage = ({data}) => $flamesJsonMetadata = data.flames;
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
