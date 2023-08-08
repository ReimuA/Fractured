<script lang="ts">
	import { flamesStore, spaceWarpingStore } from '../stores';

	 let spaceWarp = {
		rotationalSymmetry: 1,
		mirrorX: false,
		mirrorY: false
	}

	function onChange() {
		$spaceWarpingStore = spaceWarp
	}

	flamesStore.subscribe(flames => {
		if (flames === undefined) return

		spaceWarp = {...flames.spaceWarp}
	})

</script>

<p class="pt-12 pl-6 text-white">Space warping</p>
<input
	type="number"
	bind:value={spaceWarp.rotationalSymmetry}
	on:change={onChange}
	min="1"
	class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48"
/>

<label class="block">
	<input
		type="checkbox"
		bind:checked={spaceWarp.mirrorX}
		on:change={onChange}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror X Axis</span>
</label>

<label class="block">
	<input
		type="checkbox"
		bind:checked={spaceWarp.mirrorY}
		on:change={onChange}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror Y Axis</span>
</label>


<style lang="postcss">
	:global(html) {
	}
</style>
