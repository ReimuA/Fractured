import { XY } from "../mathu"
import { Flames, FlamesComponent } from "./Flames"
import { IFSTransform, createTransform } from "./IFSTransform"
import { WeightedVariation, linearVariation, swirlVariation } from "./Variations"


export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3 / 2

	return createTransform(r(), r(), r(), r(), r(), r())
}

export function createRandomFlames(resolution: XY): Flames {
	return {
		resolution,
		components: createRandomFlamesComponents(4),
	}
}

export function createRandomFlamesComponents(nb: number): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++) {
		const weight = 0
		const transform = createRandomTransform()
		const color = { r: Math.random(), g: Math.random(), b: Math.random() }

		const variations = createRandomVariations(5)

		components[i] = {
			weight,
			color,
			transform,
			variations,
		}
	}

	const step = 0.05

	for (let i = 0; i < 20; i++) {
		const idx = Math.floor(Math.random() * nb)
		components[idx].weight += step
	}

	return components
}

export function createRandomVariations(nb: number): WeightedVariation[] {
	const variations = new Array<WeightedVariation>(nb)

	for (let i = 0; i < nb; i++) {
		const r = Math.random()
		const weight = Math.random()

		if (r < 0.5) variations[i] = { weight, variation: linearVariation }
		else variations[i] = { weight, variation: swirlVariation }
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