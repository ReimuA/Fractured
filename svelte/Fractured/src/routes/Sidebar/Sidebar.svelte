<script lang="ts">
	import { canvasRef, flamesStore } from '../stores';
	import VariationSelector from './VariationSelector.svelte';
	import ColorationOptions from './ColorationOptions.svelte';
	import SpaceWarping from './SpaceWarping.svelte';
	import type { DensityEstimation } from '$lib/FlamesUtils/Flames';
	import QualityEnhancement from './QualityEnhancement.svelte';

	export let open = false;

	let metadataHref = ''
	let metadataName = 'flames.metadata.json'

	// Canvas ref from FlamesCanvas.svelte
	let flamesCanvas: HTMLCanvasElement | undefined;

	canvasRef.subscribe((canvas) => (flamesCanvas = canvas));

	flamesStore.subscribe((value) => {
		updateMetadataLink(value.flames)
	});

	function updateMetadataLink(obj: Object) {
		const blob = new Blob([JSON.stringify(obj, null, 4)], { type: 'application/json' });
		metadataHref = URL.createObjectURL(blob);
		metadataName = 'flames.metadata.json';
	}
	function downloadImage() {
		if (!flamesCanvas) return;
		const link = document.createElement('a');
		link.download = 'flames.png';
		link.href = flamesCanvas.toDataURL();
		link.click();
	}
</script>

<aside
	class="absolute top-0 w-72 h-full bg-slate-700/25 shadow-lg scroll-smooth overflow-y-auto"
	class:open
>
	<p class="pt-12 pl-6 text-white">Download</p>
	<nav class="pl-12 pt-2 text-l">
		<a href={metadataHref} class=" text-white block" download={metadataName} >Metadata</a>
		<button class="text-white block" on:click={() => downloadImage()}>Image</button>
	</nav>

	<QualityEnhancement />
	<SpaceWarping />
	<ColorationOptions />
	<VariationSelector />
</aside>

<style lang="postcss">
	:global(html) {
	}

	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		left: 0;
	}
</style>
