<script lang="ts">
	import { canvasRef, flamesStore } from '../stores';
	import VariationSelector from './VariationSelector.svelte';
	import ColorationOptions from './ColorationOptions.svelte';
	import SpaceWarping from './SpaceWarping.svelte';
	import QualityEnhancement from './QualityEnhancement.svelte';
	import Downloadlink from './Downloadlink.svelte';

	export let open = false;
</script>

<aside
	class="absolute top-0 w-72 h-full bg-slate-700/25 shadow-lg scroll-smooth overflow-y-auto"
	class:open
>
	<div class="flex flex-col gap-4 pl-6 pt-12">
		<Downloadlink />
		<QualityEnhancement />
		<SpaceWarping />
		<ColorationOptions />
		<VariationSelector />
	</div>
</aside>

<style lang="postcss">
	:global(html) {
	}

	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		left: 0;
	}
</style>
