<script lang="ts">
	import { type RenderMode, defaultRenderMode, renderModeList } from '$lib/FlamesUtils/Flames';
	import { namedPalettesList, type ColorPalette, type NamedColorPalette } from '$lib/FlamesUtils/palette';
	import { renderModeStore, colorPaletteStore, flamesStore } from '../stores';

	let selectedPalette: string = namedPalettesList[0].name;
	let renderMode: RenderMode = defaultRenderMode;

	let selectClasses =
		'round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48';

	renderModeStore.subscribe((mode) => (renderMode = mode));

	function updatePalette() {
		const namedPalette = namedPalettesList.find(p => p.name === selectedPalette)
		if (namedPalette)
			colorPaletteStore.set(namedPalette);
	}

	function updateRenderMode() {
		renderModeStore.set(renderMode);
	}

	flamesStore.subscribe(flames => {
		if (flames == undefined) return

		
		renderMode = flames.renderMode
		selectedPalette = flames.namedPalette.name
	})
</script>

<div>
	<p class="pt-8 pl-6 text-white">Color</p>
	<select class={selectClasses} bind:value={selectedPalette} on:change={() => updatePalette()}>
		{#each namedPalettesList as namedPalette}
			<option class="text-white bg-slate-900" value={namedPalette.name}
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
