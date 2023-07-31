import type { XY } from "./mathu"
import type { Flames, FlamesComponent } from "./Flames"
import { type IFSTransform, createTransform } from "./IFSTransform"
import type { WeightedVariation, Variation } from "./Variations"
import { getRandomColorPalette } from "./palette"


export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3 / 2

	return createTransform(r(), r(), r(), r(), r(), r())
}

export function createRandomFlames(resolution: XY, variationsPools: Variation[]): Flames {
	return {
		resolution,
		palette: getRandomColorPalette(),
		final: createRandomFlamesComponent(variationsPools),
		components: createRandomFlamesComponents(4, variationsPools),
	}
}

function createRandomFlamesComponent(variationsPools: Variation[]): FlamesComponent {
	const weight = Math.random()
	const transform = createRandomTransform()

	const variations = createRandomVariations(5, variationsPools)

	return {
		weight,
		transform,
		weightedVariations: variations,
	}
}

export function createRandomFlamesComponents(nb: number, variationsPools: Variation[]): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++) 
		components[i] = createRandomFlamesComponent(variationsPools)

	const totalWeight = components.reduce((total, v ) => total + v.weight, 0)

	for (const c of components)
		c.weight /= totalWeight

	return components
}

export function createRandomVariations(nb: number, variationsPools: Variation[]): WeightedVariation[] {
	const variations = new Array<WeightedVariation>(nb)

	for (let i = 0; i < nb; i++) {
		const r = Math.random()
		const weight = Math.random()

		 variations[i] = { weight, variation: variationsPools[Math.floor(r * variationsPools.length)] }
	}

	const totalWeight = variations.reduce((total, v ) => total + v.weight, 0)

	for (const v of variations)
		v.weight /= totalWeight

	return variations
}

export function randomWeigthedSelection<T>(objs: (T & { weight: number })[]): T {
	const r = Math.random()
	let accumulator = 0

	for (let i = 0; i < objs.length; i++) {
		accumulator += objs[i].weight
		if (accumulator > r) return objs[i]
	}

	return objs[objs.length - 1]
}