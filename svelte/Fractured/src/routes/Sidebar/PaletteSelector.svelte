<script lang="ts">
	import { namedPalettesList, type ColorPalette } from "../FlamesUtils/palette";
	import { flamesMetadata } from "../stores";

    let selectedPalette: ColorPalette = namedPalettesList[0].palette

    function updateFlame() {
        if (selectedPalette)
            flamesMetadata.update((fm) =>{
                fm.palette = selectedPalette
                return fm
            })
    }
</script>

<div>
    <p class="pt-8 pl-6 text-white">Color</p>
    <select class="round-r-4 bg-slate-900 ml-12 p-1 mt-2 text-white" bind:value={selectedPalette} on:change={() => updateFlame()}>
        {#each namedPalettesList as namedPalette}
            <option class="text-white bg-slate-900" value={namedPalette.palette}>{namedPalette.name}</option>
        {/each}
    </select>
</div>

<style lang="postcss">
	:global(html) {}
</style>