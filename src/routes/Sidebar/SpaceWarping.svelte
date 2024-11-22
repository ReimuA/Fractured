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
		const flames = $flamesStore.flames;
		flames.spaceWarp = {
			mirrorX: store.mirrorX,
			mirrorY: store.mirrorY,
			rotationalSymmetry: store.rotationalSymmetry,
			zoom: store.zoom
		};

		$flamesStore = {
			resetType: 'soft',
			flames: flames
		};
	});
</script>

<div class="flex flex-col gap-2">
	<h2>Space warping</h2>
	<div class="pl-6 flex flex-col gap-2">
		<div class="flex">
			<span class="w-28">Zoom</span>
			<input type="number" bind:value={$localStore.zoom} min="0" class="w-16" />
		</div>
		<div class="flex">
			<span class="w-28">Space warping</span>
			<input type="number" bind:value={$localStore.rotationalSymmetry} min="1" class="w-16" />
		</div>
		<label class="block">
			<input type="checkbox" bind:checked={$localStore.mirrorX} />
			<span>Mirror X Axis</span>
		</label>

		<label class="block">
			<input type="checkbox" bind:checked={$localStore.mirrorY} />
			<span>Mirror Y Axis</span>
		</label>
	</div>
</div>

<style lang="postcss">
	:global(html) {
	}
</style>
