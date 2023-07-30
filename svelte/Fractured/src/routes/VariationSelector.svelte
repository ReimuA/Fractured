<script lang="ts">
	import { onMount } from 'svelte';
	import { allVariations, type Variation } from './FlamesUtils/Variations';
	import { version } from '$app/environment';
	import { variationsPools } from './stores';
	// import '../app.css';

	let variations = allVariations.map((v) => {
		return {
			variation: v,
			selected: false
		};
	});

	function updateVariationPools() {
		variationsPools.set(variations.filter((e) => e.selected == true).map((e) => e.variation));
	}
</script>

<div class="absolute left-0 top-0 h-screen bg-slate-800/25 w-52">
	{#each variations as v}
		<button
			class="block w-full"
			on:click={() => {
				v.selected = !v.selected;
			}}
		>
			<p class="py-1 text-center" class:text-white={v.selected} class:text-slate-600={!v.selected}>
				{v.variation.name}
			</p>
		</button>
	{/each}

	<div class="flex justify-center w-full mt-6 ">
		<button class="block " on:click={() => updateVariationPools()}>
			<p class="bg-slate-700 text-white py-1 px-4 rounded">NEW</p>
		</button>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
