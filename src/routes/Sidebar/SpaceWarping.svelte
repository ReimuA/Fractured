<script lang="ts">
	import { writable } from 'svelte/store';
	import { flamesStore } from '../stores';

	let localStore = writable({
		mirrorY: $flamesStore.flames.spaceWarp.mirrorY,
		mirrorX: $flamesStore.flames.spaceWarp.mirrorX,
		rotationalSymmetry: $flamesStore.flames.spaceWarp.rotationalSymmetry,
		zoom: $flamesStore.flames.spaceWarp.zoom
	});

	localStore.subscribe((store) => {
		const flames = $flamesStore.flames
		flames.spaceWarp = {
				mirrorX: store.mirrorX,
				mirrorY: store.mirrorY,
				rotationalSymmetry: store.rotationalSymmetry,
				zoom: store.zoom
			}

		$flamesStore = {
			resetType: 'soft',
			flames: flames,
		};
	});
</script>

<p class="pt-12 pl-6 text-white">Zoom</p>
<input
	type="number"
	bind:value={$localStore.zoom}
	min="0"
	class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48"
/>

<p class="pt-4 pl-6 text-white">Space warping</p>
<input
	type="number"
	bind:value={$localStore.rotationalSymmetry}
	min="1"
	class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48"
/>

<label class="block">
	<input
		type="checkbox"
		bind:checked={$localStore.mirrorX}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror X Axis</span>
</label>

<label class="block">
	<input
		type="checkbox"
		bind:checked={$localStore.mirrorY}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror Y Axis</span>
</label>

<style lang="postcss">
	:global(html) {
	}
</style>
