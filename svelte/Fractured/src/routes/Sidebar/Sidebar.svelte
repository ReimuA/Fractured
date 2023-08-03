<script lang="ts">
	import { canvasRef, flamesJsonMetadata } from '../stores';
	import VariationSelector from './VariationSelector.svelte';
	import ColorationOptions from './ColorationOptions.svelte';

	export let open = false;

	// HTML ref
	let metadataLink: HTMLAnchorElement | undefined;
	let imageLink: HTMLAnchorElement | undefined;

	// Canvas ref from FlamesCanvas.svelte
	let flamesCanvas: HTMLCanvasElement | undefined;

	canvasRef.subscribe((canvas) => (flamesCanvas = canvas));

	flamesJsonMetadata.subscribe((metadata) => {
		if (!metadataLink) return;
		const blob = new Blob([metadata], { type: 'application/json' });
		metadataLink.href = URL.createObjectURL(blob);
		metadataLink.download = 'flames.metadata.json';
	});

	function downloadImage() {
		if (!flamesCanvas) return;
		const link = document.createElement('a');
		link.download = 'flames.png';
		link.href = flamesCanvas.toDataURL();
		link.click();
	}
</script>

<aside class="absolute top-0 w-64 h-full bg-slate-700/25 shadow-lg" class:open>
	<p class="pt-12 pl-6 text-white">Download</p>
	<nav class="pl-12 pt-2 text-l">
		<a bind:this={metadataLink} class=" text-white block" href="#metadata">Metadata</a>
		<button class="text-white block" on:click={() => downloadImage()}>Image</button>
	</nav>
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
