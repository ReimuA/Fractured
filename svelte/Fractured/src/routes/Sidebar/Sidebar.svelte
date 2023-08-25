<script lang="ts">
	import { canvasRef, flamesBuilderStore, flamesJsonMetadata } from '../stores';
	import VariationSelector from './VariationSelector.svelte';
	import ColorationOptions from './ColorationOptions.svelte';
	import SpaceWarping from './SpaceWarping.svelte';
	import type { DensityEstimation } from '$lib/FlamesUtils/Flames';

	export let open = false;

	let antialiased = false;
	let densityEstimation = false;
	let gammaCorrection: number = 0.454545
	let minSigma = 0
	let maxSigma = 3
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

	function updateDensityEstimation() {
		let dEstimation: DensityEstimation | null = null

		if (densityEstimation) {
			dEstimation = {minSigma: 0, maxSigma: 3}
		}

		flamesBuilderStore.update((builder) => ({
			builder: builder.builder.withDensityEstimation(dEstimation),
			resetType: 'none'
		}))
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
		<a bind:this={metadataLink} class=" text-white block" href="#metadata">Metadata</a>
		<button class="text-white block" on:click={() => downloadImage()}>Image</button>
	</nav>

	<p class="pt-12 pl-6 text-white">Quality enhancement</p>
	<label class="block">
		<span class="ml-12 p-1 text-white">Gamma correction</span>
		<input
			bind:value={gammaCorrection}
			on:change={() => flamesBuilderStore.update(builder => ({
				builder: builder.builder.withgammaCorrection(gammaCorrection),
				resetType: 'none',
			}))}
			type="number"
			min={minSigma + 1}
			class="round-r-4 text-white bg-slate-900  w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
		/>
	</label>
	<label class="block">
		<input
			bind:checked={antialiased}
			on:change={() =>
				flamesBuilderStore.update((builder) => ({
					builder: builder.builder.withSuperSampleRatio(antialiased),
					resetType: 'none'
				}))}
			type="checkbox"
			class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
		/>
		<span class="text-white">Anti aliasing</span>
	</label>
	<label class="block">
		<input
			bind:checked={densityEstimation}
			on:change={updateDensityEstimation}
			type="checkbox"
			class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
		/>
		<span class="text-white">Density estimation</span>
	</label>

	<label class="block">
		<span class="ml-12 p-1 text-white">Min sigma</span>
		<input
			bind:value={minSigma}
			on:change={updateDensityEstimation}
			type="number"
			min="0"
			max={maxSigma - 1}
			class="round-r-4 text-white bg-slate-900 w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
		/>
	</label>
	<label class="block">
		<span class="ml-12 p-1 text-white">Max sigma</span>
		<input
			bind:value={maxSigma}
			on:change={updateDensityEstimation}
			type="number"
			min={minSigma + 1}
			class="round-r-4 text-white bg-slate-900  w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
		/>
	</label>
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
