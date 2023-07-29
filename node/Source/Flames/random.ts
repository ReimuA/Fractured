import { XY } from "../mathu"
import { Flames, FlamesComponent } from "./Flames"
import { IFSTransform, createTransform } from "./IFSTransform"
import { WeightedVariation, allVariations } from "./Variations"


export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3 / 2

	return createTransform(r(), r(), r(), r(), r(), r())
}

export function createRandomFlames(resolution: XY): Flames {
	return {
		resolution,
		final: createRandomFlamesComponent(),
		components: createRandomFlamesComponents(4),
	}
}

function createRandomFlamesComponent(): FlamesComponent {
	const weight = Math.random()
	const transform = createRandomTransform()
	const color = { r: Math.random(), g: Math.random(), b: Math.random() }

	const variations = createRandomVariations(5)

	return {
		weight,
		color,
		transform,
		weightedVariations: variations,
	}
}

export function createRandomFlamesComponents(nb: number): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++) 
		components[i] = createRandomFlamesComponent()

	const totalWeight = components.reduce((total, v ) => total + v.weight, 0)

	for (const c of components)
		c.weight /= totalWeight

	return components
}

export function createRandomVariations(nb: number): WeightedVariation[] {
	const variations = new Array<WeightedVariation>(nb)

	for (let i = 0; i < nb; i++) {
		const r = Math.random()
		const weight = Math.random()

		 variations[i] = { weight, variation: allVariations[Math.floor(r * allVariations.length)] }
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