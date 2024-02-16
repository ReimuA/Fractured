<script lang="ts">
	import { renderModeList } from '$lib/FlamesUtils/flames';
	import { namedPalettesList } from '$lib/FlamesUtils/palette';
	import { writable } from 'svelte/store';
	import { flamesBuilderStore, flamesStore } from '../stores';

	let selectClasses =
		'round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48';
	let localStore = writable({
		palette: $flamesStore.flames.namedPalette,
		renderMode: $flamesStore.flames.renderMode
	});

	localStore.subscribe((store) => {
		const flames = $flamesStore.flames
		flames.namedPalette = store.palette
		flames.renderMode = store.renderMode

		$flamesStore = {
			flames: flames,
			resetType: 'none'
		};
	});
</script>

<div>
	<p class="pt-8 pl-6 text-white">Color</p>
	<select class={selectClasses} bind:value={$localStore.palette}>
		{#each namedPalettesList as namedPalette}
			<option class="text-white bg-slate-900" value={namedPalette}>{namedPalette.name}</option>
		{/each}
	</select>

	<p class="pt-8 pl-6 text-white">Color render mode</p>

	<select class={selectClasses} bind:value={$localStore.renderMode}>
		{#each renderModeList as renderMode}
			<option class="text-white bg-slate-900" value={renderMode}>{renderMode}</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
