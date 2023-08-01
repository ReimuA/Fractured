<script lang="ts">
	import { onMount } from 'svelte';
	// import '../app.css';
	import { createRandomFlames } from './FlamesUtils/random';
	import { updateDensityArray, updateDensityArrayForStructuralColoring, updatePixelsBuffer, type HeatmapCell, updatePixelsBufferForStructuralColoring } from './FlamesUtils/image';
	import { namedPalettesList, type ColorPalette } from './FlamesUtils//palette';
	import type { XY } from './FlamesUtils/mathu';
	import { applyAA, superSampleResolution } from './FlamesUtils/antialiasing';
	import type { Flames } from './FlamesUtils//Flames';
	import { canvasRef, colorModeStore, flamesMetadata, variationsPools } from './stores';
	import { allVariations, type Variation } from './FlamesUtils/Variations';

	let canvas: HTMLCanvasElement;
	let flames: Flames;
	let p: XY = { x: 0, y: 0 };
	let resolution: XY = { x: 0, y: 0 };
	let baseResolution: XY = { x: 0, y: 0 };
	let nbIteration: number = 0;
	let heatmap: HeatmapCell[]
	let pixels: Uint8ClampedArray | undefined

	// New variations pools, we reset the canvas
	variationsPools.subscribe((v) => {
		if (canvas && v.length != 0)
			resetCanvasData(v)
	})

	function resetCanvasData(variation: Variation[]) {
		let currentPalette = flames?.palette ?? namedPalettesList[0].palette

		p = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
		baseResolution = { x: canvas.width, y: canvas.height };
		resolution = superSampleResolution(baseResolution);
		flames = createRandomFlames(resolution, currentPalette, variation);
		heatmap ??= new Array<HeatmapCell>(resolution.x * resolution.y);
		for (let i = 0; i < heatmap.length; i++) {
			heatmap[i] = {
				color: 0,
				accumulator: 0
			}
		}

		pixels ??= new Uint8ClampedArray(resolution.x * resolution.y * 4);
		pixels.fill(0)
		nbIteration = 0;
		flamesMetadata.set(flames)
	}

	function updateCanvas(ctx: CanvasRenderingContext2D) {
		if (!pixels || !heatmap) return

		({heatmap, p} = updateDensityArrayForStructuralColoring(resolution, flames, heatmap, p, 5000, 5000 * nbIteration++));
		if (($colorModeStore).structuralColoring)
			updatePixelsBufferForStructuralColoring(pixels, heatmap, flames.palette, 10);
		else
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
