import type { IFSTransform } from "./IFSTransform"
import type {  WeightedVariation} from "./Variations"
import type { Color, XY,  } from "./mathu"

export type Flames = {
	resolution: XY
	final: FlamesComponent
	components: FlamesComponent[]
}

export type FlamesComponent = {
	weight: number
	color: Color
	transform: IFSTransform
	weightedVariations: WeightedVariation[]
}

function applyTransformAndVariation(p: XY, component: FlamesComponent): XY {
	const newP = { x: 0, y: 0 }
	const t = component.transform
	const tp = {
		x: t.a * p.x + t.b * p.y + t.c,
		y: t.d * p.x + t.e * p.y + t.f,
	}

	for (const variation of component.weightedVariations) {
		const vp = variation.variation.function(tp, component.transform)
		newP.x += vp.x * variation.weight
		newP.y += vp.y * variation.weight
	}

	return newP
}

export function applyFlames(flames: Flames, componentIdx: number, p: XY): XY {
	const component = flames.components[componentIdx]

	const newP = applyTransformAndVariation(p, component)

	return applyTransformAndVariation(newP, flames.final)
}