import type { Color, XY } from "./mathu"
import { defaultRenderMode, type Flames, type FlamesComponent } from "./Flames"
import { type IFSTransform, createTransform } from "./IFSTransform"
import type { WeightedVariation, Variation } from "./Variations"
import type { ColorPalette, NamedColorPalette } from "./palette"


export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3 / 2

	return createTransform(r(), r(), r(), r(), r(), r())
}

export function createRandomFlames(resolution: XY, palette: NamedColorPalette, variationsPools: Variation[]): Flames {
	return {
		resolution,
		renderMode: defaultRenderMode,
		spaceWarp: {
			rotationalSymmetry: 1,
			mirrorX: false,
			mirrorY: false
		},
		namedPalette: palette,
		final: createRandomFlamesComponent(palette.palette, variationsPools),
		components: createRandomFlamesComponents(Math.round(Math.random() * 10) + 3, palette.palette, variationsPools),
	}
}

function createRandomFlamesComponent(palette: ColorPalette, variationsPools: Variation[]): FlamesComponent {
	const weight = Math.random()
	const transform = createRandomTransform()
	const variations = createRandomVariations(5, variationsPools)

	return {
		color: Math.random(),
		weight,
		transform,
		weightedVariations: variations,
	}
}

export function createRandomFlamesComponents(nb: number, palette: ColorPalette, variationsPools: Variation[]): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++)
		components[i] = createRandomFlamesComponent(palette, variationsPools)

	const totalWeight = components.reduce((total, v) => total + v.weight, 0)

	for (const c of components)
		c.weight /= totalWeight

	return components
}

export function createRandomVariations(nb: number, variationsPools: Variation[]): WeightedVariation[] {
	const variations: WeightedVariation[] = []

	for (let i = 0; i < nb; i++) {
		const weight = Math.random()
		const randomVariation = variationsPools[Math.floor(Math.random() * variationsPools.length)]

		if (!variations.some(e => e.variation.name === randomVariation.name))
			variations.push({ weight, variation: randomVariation })
	}

	const totalWeight = variations.reduce((total, v) => total + v.weight, 0)

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