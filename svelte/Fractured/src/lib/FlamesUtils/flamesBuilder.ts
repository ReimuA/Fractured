import {
	defaultRenderMode,
	type DensityEstimation,
	type Flames,
	type FlamesComponent,
	type RenderMode,
	type SpaceWarp
} from './Flames';
import { createTransform, type IFSTransform } from './IFSTransform';
import { allVariations, getVariationFromname, type Variation, type WeightedVariation } from './Variations';
import type { XY, iRange } from './mathu';
import { namedPalettesList, type NamedColorPalette } from './palette';
import { splitmix32 } from './random';

export class FlamesBuilder {
	// 1 to 1 field
	public resolution: XY = { x: 1920, y: 1080 };
	public antialiasing = false;
	public densityEstimation: DensityEstimation | null = null;
	public renderMode: RenderMode = defaultRenderMode;
	public colorPalette: NamedColorPalette = namedPalettesList[0];
	public spaceWarp: SpaceWarp = { rotationalSymmetry: 1, mirrorX: false, mirrorY: false, zoom: 1 };

	// Field for random generation
	private seed = 0
	private prng = splitmix32(0)
	public componentsNumberRange: iRange = { min: 4, max: 4 };
	public variationsNumberRange: iRange = { min: 4, max: 14 };
	public variationsPools: string[] = [];

	withResolution(resolution: XY) {
		this.resolution = resolution;
		return this;
	}

	withVariations(variationsPools: string[]) {
		this.variationsPools = variationsPools;
		return this;
	}

	withRendermode(renderMode: RenderMode) {
		this.renderMode = renderMode;
		return this;
	}

	withNamedPalette(palette: NamedColorPalette) {
		this.colorPalette = palette;
		return this;
	}

	withSpaceWarp(sw: SpaceWarp) {
		this.spaceWarp = sw;
		return this;
	}

	withSuperSampleRatio(antialiasing: boolean) {
		this.antialiasing = antialiasing;
		return this;
	}

	withComponentsNumberRange(range: iRange) {
		this.componentsNumberRange = range;
		return this;
	}

	withDensityEstimation(densityEstimation: DensityEstimation | null) {
		this.densityEstimation = densityEstimation;
		return this;
	}

	withVariationsNumberRange(range: iRange) {
		this.variationsNumberRange = range;
		return this;
	}

	private iRandom(range: iRange): number {
		if (range.min === range.max) return range.max;
		return Math.floor(this.prng() * (range.max - range.min + 1) + range.min);
	}

	private createRandomTransform(): IFSTransform {
		const r = () => this.prng() * 3 - 3 / 2;
	
		return createTransform(r(), r(), r(), r(), r(), r());
	}

	private createRandomVariations(
		nb: number,
		variationsPools: Variation[]
	): WeightedVariation[] {
		const variations: WeightedVariation[] = [];
	
		for (let i = 0; i < nb; i++) {
			const weight = this.prng();
			const randomVariation = variationsPools[Math.floor(this.prng() * variationsPools.length)];
	
			if (!variations.some((e) => e.variation.name === randomVariation.name))
				variations.push({ weight, variation: randomVariation });
		}
	
		const totalWeight = variations.reduce((total, v) => total + v.weight, 0);
	
		for (const v of variations) v.weight /= totalWeight;
	
		return variations;
	}

	private createRandomFlamesComponent(variationsPools: Variation[]): FlamesComponent {
		const weight = this.prng();
		const transform = this.createRandomTransform();
		const variationsCount = this.iRandom(this.variationsNumberRange);
		const variations = this.createRandomVariations(variationsCount, variationsPools);

		return {
			color: this.prng(),
			weight,
			transform,
			weightedVariations: variations
		};
	}

	private createRandomFlamesComponents(variationsPools: Variation[]): FlamesComponent[] {
		const componentsCount = this.iRandom(this.componentsNumberRange);
		const components = new Array<FlamesComponent>(componentsCount);

		for (let i = 0; i < componentsCount; i++)
			components[i] = this.createRandomFlamesComponent(variationsPools);

		const totalWeight = components.reduce((total, v) => total + v.weight, 0);

		for (const c of components) c.weight /= totalWeight;

		return components;
	}

	private buildInternal(): Flames {
		let variationsPools = this.variationsPools
			.map((e) => getVariationFromname(e))
			.filter((e): e is Variation => e != null);

		if (variationsPools.length === 0) variationsPools = allVariations;

		return {
			densityEstimation: this.densityEstimation,
			resolution: this.resolution,
			antialiasing: this.antialiasing,
			renderMode: this.renderMode,
			namedPalette: this.colorPalette,
			spaceWarp: this.spaceWarp,
			final: this.createRandomFlamesComponent(variationsPools),
			components: this.createRandomFlamesComponents(variationsPools)
		};
	}

	// Use the same seed as the previous build
	// Succesive call to purebuild always use the same seed
	pureBuild(): Flames {
		console.log("PURE BUILD SEED : " + this.seed)
		this.prng = splitmix32(this.seed)
		return this.buildInternal()
	}

	build(): Flames {
		this.seed = Math.random() * (2 ^ 32)
		console.log("BUILD SEED : " + this.seed)
		this.prng = splitmix32(this.seed)
		return this.buildInternal()
	}
}
