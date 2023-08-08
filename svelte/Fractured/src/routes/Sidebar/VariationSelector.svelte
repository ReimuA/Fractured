<script lang="ts">
	import { allVariations } from '$lib/FlamesUtils/Variations';
	import { flamesStore, variationsPools } from '../stores';

	let variations = allVariations.map((v) => {
		return {
			variation: v,
			selected: false
		};
	});

	function updateVariationPools() {
		variationsPools.set(variations.filter((e) => e.selected == true).map((e) => e.variation));
	}

	flamesStore.subscribe(flames => {
		if (flames == undefined) return

		for (const variation of variations)
			variation.selected = false

		for (const variation of flames.final.weightedVariations)
		{
			const v = variations.find(v => v.variation.name == variation.variation.name)
			if (v)
			 	v.selected = true
		}

		for (const component of flames.components) {
			for (const variation of component.weightedVariations)
			{
				const v = variations.find(v => v.variation.name == variation.variation.name)
				if (v)
					v.selected = true
			}
		}

		// deep copy bullshit for update
		variations = [...variations]
	})
</script>

<p class="pt-8 pl-6 text-white">Enable variations</p>
<div class="">
	{#each variations as v}
		<button
			class="block pl-12"
			on:click={() => {
				v.selected = !v.selected;
			}}
		>
			<p class="" class:text-white={v.selected} class:text-slate-600={!v.selected}>
				{v.variation.name}
			</p>
		</button>
	{/each}

	<div class="flex justify-center w-full my-6 ">
		<button class="block " on:click={() => updateVariationPools()}>
			<p class="bg-slate-700 text-white py-1 px-4 rounded">NEW</p>
		</button>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
