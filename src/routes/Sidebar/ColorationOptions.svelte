<script lang="ts">
	import { renderModeList } from '$lib/FlamesUtils/flames';
	import { namedPalettesList } from '$lib/FlamesUtils/palette';
	import { writable } from 'svelte/store';
	import { flamesStore } from '../stores';

	let selectClasses = 'w-32';
	let localStore = writable({
		palette: $flamesStore.flames.namedPalette,
		renderMode: $flamesStore.flames.renderMode
	});

	localStore.subscribe((store) => {
		const flames = $flamesStore.flames;
		flames.namedPalette = store.palette;
		flames.renderMode = store.renderMode;

		$flamesStore = {
			flames: flames,
			resetType: 'none'
		};
	});
</script>

<div class="flex flex-col gap-2">
	<h2>Color</h2>
	<div class="flex flex-col gap-2 pl-6">
		<div class="flex">
			<span class="w-16">Palette</span>
			<select class={selectClasses} bind:value={$localStore.palette}>
				{#each namedPalettesList as namedPalette}
					<option value={namedPalette}>{namedPalette.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex">
			<span class="w-16">Mode</span>
			<select class={selectClasses} bind:value={$localStore.renderMode}>
				{#each renderModeList as renderMode}
					<option value={renderMode}>{renderMode}</option>
				{/each}
			</select>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
