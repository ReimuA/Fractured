<script lang="ts">
	import { namedPalettesList, type ColorPalette } from '../FlamesUtils/palette';
	import { colorModeStore, flamesMetadata } from '../stores';

	let selectedPalette: ColorPalette = namedPalettesList[0].palette;
	let structuralColoring: boolean = false;

	colorModeStore.subscribe((colorMode) => (structuralColoring = colorMode.structuralColoring));

	function updateFlame() {
		if (selectedPalette)
			flamesMetadata.update((fm) => {
				fm.palette = selectedPalette;
				return fm;
			});
	}
</script>

<div>
	<p class="pt-8 pl-6 text-white">Color</p>
	<select
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white"
		bind:value={selectedPalette}
		on:change={() => updateFlame()}
	>
		{#each namedPalettesList as namedPalette}
			<option class="text-white bg-slate-900" value={namedPalette.palette}
				>{namedPalette.name}</option
			>
		{/each}
	</select>
	<button
		class="block ml-12 mt-4"
		on:click={() => {
			colorModeStore.set({structuralColoring: !structuralColoring})
		}}
	>
		<p class="" class:text-white={structuralColoring} class:text-slate-600={!structuralColoring}>
			Structural coloring
		</p>
	</button>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
