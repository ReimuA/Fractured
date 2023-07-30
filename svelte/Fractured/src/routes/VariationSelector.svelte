<script lang="ts">
	import { onMount } from 'svelte';
	import { allVariations, type Variation } from './Variations';
	import { version } from '$app/environment';
	import { variationsPools } from './stores';
	// import '../app.css';

	let variations = allVariations.map(v => {
		return {
			variation: v,
			selected: false
		}
	})
</script>

<div class="absolute left-0 top-0 h-screen bg-slate-800/25 w-52">
	{#each variations as v}
	<button class="block w-full" 
	on:click={() => {
		v.selected = !v.selected
		variationsPools.set(
			variations.filter(e => e.selected == true).map(e => e.variation)
		)
	}}>
		<p class="py-1 text-center"
			class:text-white={v.selected}
			class:text-slate-600={!v.selected}
			>
				{v.variation.name}
		</p>
	</button>
	{/each}
</div>

<style lang="postcss">
	:global(html) {}
</style>
