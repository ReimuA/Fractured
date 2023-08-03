<script lang="ts">
	import { namedPalettesList, type ColorPalette } from '$lib/FlamesUtils/palette';
	import { defaultRenderMode, renderModeList, type RenderMode } from '$lib/FlamesUtils/render';
	import { renderModeStore, flamesJsonMetadata, colorPaletteStore } from '../stores';

	let selectedPalette: ColorPalette = namedPalettesList[0].palette;
	let renderMode: RenderMode = defaultRenderMode;

	let selectClasses =
		'round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48';

	renderModeStore.subscribe((mode) => (renderMode = mode));

	function updatePalette() {
		colorPaletteStore.set(selectedPalette);
	}

	function updateRenderMode() {
		renderModeStore.set(renderMode);
	}
</script>

<div>
	<p class="pt-8 pl-6 text-white">Color</p>
	<select class={selectClasses} bind:value={selectedPalette} on:change={() => updatePalette()}>
		{#each namedPalettesList as namedPalette}
			<option class="text-white bg-slate-900" value={namedPalette.palette}
				>{namedPalette.name}</option
			>
		{/each}
	</select>

	<p class="pt-8 pl-6 text-white">Color render mode</p>

	<select class={selectClasses} bind:value={renderMode} on:change={() => updateRenderMode()}>
		{#each renderModeList as renderMode}
			<option class="text-white bg-slate-900" value={renderMode}>{renderMode}</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
