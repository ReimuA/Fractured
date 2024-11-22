<script lang="ts">
	import type { DensityEstimation } from '$lib/FlamesUtils/flames';
	import { flamesStore } from '../stores';

	let gammaCorrection: number = 0.454545;
	let densityEstimation = false;
	let antialiased = false;
	let minSigma = 0;
	let maxSigma = 0.7;

	function updateDensityEstimation() {
		let dEstimation: DensityEstimation | null = null;

		if (densityEstimation) {
			dEstimation = { minSigma, maxSigma };
		}

		flamesStore.update((value) => {
			(value.flames.densityEstimation = dEstimation), (value.resetType = 'none');

			return value;
		});
	}
</script>

<div class="flex flex-col gap-2">
	<h2>Quality enhancement</h2>
	<div class="flex flex-col gap-2 pl-6">
		<label class="block">
			<span>Gamma correction</span>
			<input
				bind:value={gammaCorrection}
				on:change={() =>
					flamesStore.update((value) => {
						value.flames.gammaCorrection = gammaCorrection;
						value.resetType = 'none';
						return value;
					})}
				type="number"
				min={0.1}
				step={0.1}
				class="w-16"
			/>
		</label>
		<label class="block">
			<input
				bind:checked={antialiased}
				on:change={() =>
					flamesStore.update((value) => {
						value.flames.antialiasing = antialiased;
						value.resetType = 'none';
						return value;
					})}
				type="checkbox"
			/>
			<span>Anti aliasing</span>
		</label>
		<label class="block">
			<input bind:checked={densityEstimation} on:change={updateDensityEstimation} type="checkbox" />
			<span>Density estimation</span>
		</label>
		<div class="flex flex-col gap-2 pl-6">
			<div class="flex">
				<span class="text-white w-24">Min sigma</span>
				<input
					bind:value={minSigma}
					on:change={updateDensityEstimation}
					type="number"
					min="0"
					max={maxSigma - 1}
					class="w-16"
				/>
			</div>
			<div class="flex">
				<span class="text-white w-24">Max sigma</span>
				<input
					bind:value={maxSigma}
					on:change={updateDensityEstimation}
					type="number"
					min={minSigma + 1}
					class="w-16"
				/>
			</div>
		</div>
	</div>
</div>
