<script lang="ts">
	import { writable } from 'svelte/store';
	import { flamesBuilderStore } from '../stores';

	let localStore = writable({
		mirrorY: $flamesBuilderStore.builder.spaceWarp.mirrorY,
		mirrorX: $flamesBuilderStore.builder.spaceWarp.mirrorX,
		rotationalSymmetry: $flamesBuilderStore.builder.spaceWarp.rotationalSymmetry
	});

	localStore.subscribe((store) => {
		$flamesBuilderStore = {
			resetType: 'soft',
			builder: $flamesBuilderStore.builder.withSpaceWarp({
				mirrorX: store.mirrorX,
				mirrorY: store.mirrorY,
				rotationalSymmetry: store.rotationalSymmetry
			})
		};
	});
</script>

<p class="pt-12 pl-6 text-white">Space warping</p>
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
