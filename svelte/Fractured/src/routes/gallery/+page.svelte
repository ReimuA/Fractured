<script lang="ts">
	import cuda from '$lib/gallery/cuda.png';
	import _8 from '$lib/gallery/8.png';
	import bz52 from '$lib/gallery/bz52.png';
	import helix from '$lib/gallery/helix.png';
	import nebula from '$lib/gallery/nebula.png';
	import neon from '$lib/gallery/neon-donut.png';
	import chevronLeft from '$lib/images/chevron-left.svg';
	import chevronRight from '$lib/images/chevron-right.svg';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { derived } from 'svelte/store';

	const imgs = [
		{ img: cuda, anim: tweened(1, { duration: 750, easing: cubicOut }) },
		{ img: _8, anim: tweened(0, { duration: 750, easing: cubicOut }) },
		{ img: bz52, anim: tweened(0, { duration: 750, easing: cubicOut }) },
		{ img: helix, anim: tweened(0, { duration: 750, easing: cubicOut }) },
		{ img: nebula, anim: tweened(0, { duration: 750, easing: cubicOut }) },
		{ img: neon, anim: tweened(0, { duration: 750, easing: cubicOut }) }
	];
	
	const d = derived(imgs.map(e => e.anim), (e) => e);

	let currentIdx = 0;

	function updateDisplayedImage(inc: number) {
		imgs[currentIdx].anim.set(0);
		currentIdx += inc;

		if (currentIdx < 0) currentIdx = imgs.length - 1;
		if (currentIdx > imgs.length - 1) currentIdx = 0;

		imgs[currentIdx].anim.set(1);
	}
</script>

{#each imgs as img, idx}
	<img
		src={img.img}
		class="absolute top-0 left-0 h-full w-full -z-10"
		style="opacity: {$d[idx]}"
		alt="A fractal flames"
	/>
{/each}

<button class="absolute left-12 top-1/2" on:click={() => updateDisplayedImage(-1)}>
	<img src={chevronLeft} width="64" height="64" alt="left" class="filter-white opacity-50"/>
</button>

<button class="absolute right-12 top-1/2" on:click={() => updateDisplayedImage(1)}>
	<img src={chevronRight} width="64" height="64" alt="right" class="filter-white opacity-50"/>
</button>

<style lang="postcss">
	:global(html) {
	}

	.filter-white{
        filter: invert(95%) sepia(100%) saturate(0%) hue-rotate(291deg) brightness(102%) contrast(103%);
    }
</style>
