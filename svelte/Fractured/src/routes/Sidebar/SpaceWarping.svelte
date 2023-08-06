<script lang="ts">
	import { spaceWarpingStore } from '../stores';
</script>

<p class="pt-12 pl-6 text-white">Space warping</p>
<input
	type="number"
	bind:value={$spaceWarpingStore.rotationalSymmetry}
	min="1"
	class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white border-slate-300 border-2 rounded w-48"
/>

<label class="block">
	<input
		type="checkbox"
		bind:value={$spaceWarpingStore.mirrorX}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror X Axis</span>
</label>

<label class="block">
	<input
		type="checkbox"
		bind:value={$spaceWarpingStore.mirrorY}
		class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
	/>
	<span class="text-white">Mirror Y Axis</span>
</label>


<style lang="postcss">
	:global(html) {
	}
</style>
