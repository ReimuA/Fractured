<script lang="ts">
	import { onMount } from 'svelte';
	// import '../app.css';
	import { createRandomFlames } from './FlamesUtils/random';
	import { updateDensityArray, updatePixelsBuffer } from './FlamesUtils/image';
	import type { ColorPalette } from './FlamesUtils//palette';
	import type { XY } from './FlamesUtils/mathu';
	import { applyAA, superSampleResolution } from './FlamesUtils/antialiasing';
	import type { Flames } from './FlamesUtils//Flames';
	import { canvasRef, colorPaletteStore, flamesMetadata, variationsPools } from './stores';
	import { allVariations, type Variation } from './FlamesUtils/Variations';

	let canvas: HTMLCanvasElement;
	let flames: Flames;
	let p: XY = { x: 0, y: 0 };
	let resolution: XY = { x: 0, y: 0 };
	let baseResolution: XY = { x: 0, y: 0 };
	let nbIteration: number = 0;
	let currentPalette: ColorPalette | undefined
	let heatmap = new Array<number>(resolution.x * resolution.y).fill(0);
	let pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0);

	// New variations pools, we reset the canvas
	variationsPools.subscribe((v) => {
		if (canvas && v.length != 0)
			resetCanvasData(v)
	})

	colorPaletteStore.subscribe((c) => {
		if (flames != null) flames.palette = c
		currentPalette = c
	})

	function resetCanvasData(variation: Variation[]) {
		p = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
		baseResolution = { x: canvas.width, y: canvas.height };
		resolution = superSampleResolution(baseResolution);
		flames = createRandomFlames(resolution, variation);
		if (currentPalette)
			flames.palette = currentPalette
		heatmap = new Array<number>(resolution.x * resolution.y).fill(0);
		pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0);
		nbIteration = 0;
		flamesMetadata.set(flames)
	}

	function updateCanvas(ctx: CanvasRenderingContext2D) {
		({heatmap, p} = updateDensityArray(resolution, flames, heatmap, p, 5000, 5000 * nbIteration++));
		updatePixelsBuffer(pixels, heatmap, flames.palette, 10);
		ctx.putImageData(
			new ImageData(applyAA(baseResolution, pixels), baseResolution.x, baseResolution.y),
			0,
			0
		);
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		canvasRef.set(canvas)

		resetCanvasData(allVariations);
		let frame = requestAnimationFrame(flamesIteration);

		function flamesIteration(t: number) {
			if (ctx === null) return;
			updateCanvas(ctx);
			setTimeout(() => (frame = requestAnimationFrame(flamesIteration)), 10);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
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
