<script lang="ts">
	import { onMount } from 'svelte';
	// import '../app.css';
	import { createRandomFlames } from './FlamesUtils/random';
	import {  updateRenderData, type RenderData, createRenderData, paletteStructuralColoring, colorStructuralColoring, resetRenderData, defaultRenderMode, structuralPaletteRenderMode, structularColorRenderMode, updatePixelsBuffer } from './FlamesUtils/render';
	import { namedPalettesList } from './FlamesUtils//palette';
	import type { XY } from './FlamesUtils/mathu';
	import { applyAA, superSampleResolution } from './FlamesUtils/antialiasing';
	import type { Flames } from './FlamesUtils//Flames';
	import { canvasRef, renderModeStore, flamesMetadata, variationsPools } from './stores';
	import { allVariations, type Variation } from './FlamesUtils/Variations';

	let canvas: HTMLCanvasElement;
	let flames: Flames;
	let p: XY = { x: 0, y: 0 };
	let resolution: XY = { x: 0, y: 0 };
	let baseResolution: XY = { x: 0, y: 0 };
	let nbIteration: number = 0;
	let renderData: RenderData | undefined

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
		pixels ??= new Uint8ClampedArray(resolution.x * resolution.y * 4);
		renderData ??= createRenderData(resolution.x * resolution.y)
		resetRenderData(renderData)
		pixels.fill(0)
		
		nbIteration = 0;
		flamesMetadata.set(flames)
	}

	function updateCanvas(ctx: CanvasRenderingContext2D) {
		if (!pixels || !renderData) return

		p = updateRenderData(resolution, flames, renderData, p, 5000, 5000 * nbIteration++);
		if (($renderModeStore) === defaultRenderMode)
			updatePixelsBuffer(pixels, renderData.heatmap, flames.palette, 10)
		else if (($renderModeStore) === structuralPaletteRenderMode)
			paletteStructuralColoring(pixels, renderData.heatmap, renderData.paletteAccumulator, flames.palette, 10);
		else
			colorStructuralColoring(pixels, renderData.heatmap, renderData.colorAccumulator, flames.palette, 10);
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
