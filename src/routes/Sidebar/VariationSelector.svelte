<script lang="ts">
	import { allVariations } from '$lib/FlamesUtils/Variations';
	import { xyLength } from '$lib/FlamesUtils/mathu';
	import { flamesBuilderStore, flamesStore } from '../stores';

	let variations = allVariations.map((v) => {
		return {
			variation: v,
			selected: Math.random() < 0.2
		};
	});

	if (!variations.some(x => x.selected))
		variations[0].selected = true;

	updateVariationPools();

	function updateVariationPools() {
		flamesBuilderStore.update((builder) => {
			return builder
				.inferParameterFromFlames($flamesStore.flames)
				.withVariations(
						variations.filter((e) => e.selected).map((e) => e.variation.name)
				)
		});
	}
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

	<div class="flex justify-center w-full my-6">
		<button class="block" on:click={() => updateVariationPools()}>
			<p class="bg-slate-700 text-white py-1 px-4 rounded">NEW</p>
		</button>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
