<script lang="ts">
	import { onMount } from 'svelte';
	// import '../app.css';
	import { createRandomFlames } from './random';
	import { createDensityArray, createFlamesPixelBufferFromDensity, updateDensityArray, updatePixelsBuffer } from './image';
	import { getRandomColorPalette, yellowRed } from './palette';
	import type { XY } from './mathu';
	import { applyAA, superSampleResolution } from './antialiasing';

	let canvas: HTMLCanvasElement;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		let baseResolution = {x: canvas.width, y: canvas.height}
		let resolution = superSampleResolution(baseResolution)
		let flames = createRandomFlames(resolution);
		console.log(resolution)
		let heatmap = new Array<number>(resolution.x * resolution.y).fill(0)
		let p: XY = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
		let frame = requestAnimationFrame(loop);

		let nbIteration = 0
		const pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0)

		const palette = getRandomColorPalette()

		function loop(t: number) {
			if (ctx === null) return;
			console.log('ouhouh');

			const iter = updateDensityArray(resolution, flames, heatmap, p, 5000, 5000 * (nbIteration++));
			p = iter.p
			heatmap = iter.heatmap
			updatePixelsBuffer(pixels, heatmap, palette, 10);
			var img = new ImageData(applyAA(baseResolution, pixels), resolution.x / 2, resolution.y / 2);
			ctx.putImageData(img, 0, 0);
			frame = requestAnimationFrame(loop);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<canvas bind:this={canvas} width="1920" height="1080" class="h-screen w-screen bg-slate-900 absolute top-0 left-0 -z-10" />

<style lang="postcss">
	:global(html) {
	}
</style>
