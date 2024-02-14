<script lang="ts">
	import type { DensityEstimation } from "$lib/FlamesUtils/Flames";
	import { flamesStore } from "../stores";

	let gammaCorrection: number = 0.454545
	let densityEstimation = false;
	let antialiased = false;
	let minSigma = 0
	let maxSigma = .7
    

	function updateDensityEstimation() {
		let dEstimation: DensityEstimation | null = null

		if (densityEstimation) {
			dEstimation = {minSigma, maxSigma}
		}

		flamesStore.update((value) => {
			value.flames.densityEstimation = dEstimation,
			value.resetType = 'none'

			return value
		})
	}

</script>

<p class="pt-12 pl-6 text-white">Quality enhancement</p>
<label class="block">
    <span class="ml-12 p-1 text-white">Gamma correction</span>
    <input
        bind:value={gammaCorrection}
        on:change={() => flamesStore.update(value => {
            value.flames.gammaCorrection = gammaCorrection
            value.resetType = 'none'
            return value
        })}
        type="number"
        min={0.1}
        class="round-r-4 text-white bg-slate-900  w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
    />
</label>
<label class="block">
    <input
        bind:checked={antialiased}
        on:change={() =>
            flamesStore.update((value) => {
                value.flames.antialiasing = antialiased
                value.resetType = 'none'
                return value
            })}
        type="checkbox"
        class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
    />
    <span class="text-white">Anti aliasing</span>
</label>
<label class="block">
    <input
        bind:checked={densityEstimation}
        on:change={updateDensityEstimation}
        type="checkbox"
        class="round-r-4 bg-slate-900 ml-12 p-1 mt-4 border-slate-300 border-2 rounded"
    />
    <span class="text-white">Density estimation</span>
</label>

<label class="block">
    <span class="ml-12 p-1 text-white">Min sigma</span>
    <input
        bind:value={minSigma}
        on:change={updateDensityEstimation}
        type="number"
        min="0"
        max={maxSigma - 1}
        class="round-r-4 text-white bg-slate-900 w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
    />
</label>
<label class="block">
    <span class="ml-12 p-1 text-white">Max sigma</span>
    <input
        bind:value={maxSigma}
        on:change={updateDensityEstimation}
        type="number"
        min={minSigma + 1}
        class="round-r-4 text-white bg-slate-900  w-16 pl-1 mt-4 border-slate-300 border-2 rounded"
    />
</label>