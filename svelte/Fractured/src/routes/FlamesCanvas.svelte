<script lang="ts">
	import { onMount } from 'svelte';
	// import '../app.css';
	import { createRandomFlames } from './FlamesUtils/random';
	import { updateDensityArray, updatePixelsBuffer } from './FlamesUtils/image';
	import { getRandomColorPalette, yellowRed } from './FlamesUtils//palette';
	import type { XY } from './mathu';
	import { applyAA, superSampleResolution } from './FlamesUtils/antialiasing';
	import type { Flames } from './FlamesUtils//Flames';

	let canvas: HTMLCanvasElement;
	let flames: Flames;
	let p: XY = { x: 0, y: 0 };
	let resolution: XY = { x: 0, y: 0 };
	let baseResolution: XY = { x: 0, y: 0 };
	let nbIteration: number = 0;
	let palette = getRandomColorPalette();
	let heatmap = new Array<number>(resolution.x * resolution.y).fill(0);
	let pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0);

	function resetCanvasData() {
		p = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
		baseResolution = { x: canvas.width, y: canvas.height };
		resolution = superSampleResolution(baseResolution);
		flames = createRandomFlames(resolution);
		heatmap = new Array<number>(resolution.x * resolution.y).fill(0);
		pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0);
		nbIteration = 0;
		palette = getRandomColorPalette();
	}

	function updateCanvas(ctx: CanvasRenderingContext2D) {
		const iter = updateDensityArray(resolution, flames, heatmap, p, 5000, 5000 * nbIteration++);
		p = iter.p;
		heatmap = iter.heatmap;
		updatePixelsBuffer(pixels, heatmap, palette, 10);
		let img = new ImageData(applyAA(baseResolution, pixels), resolution.x / 2, resolution.y / 2);
		ctx.putImageData(img, 0, 0);
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');

		resetCanvasData();
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
