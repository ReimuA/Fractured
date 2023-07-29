import { IFSTransform } from "./IFSTransform"
import { WeightedVariation, getVariationFromName } from "./Variations"
import { Color, XY,  } from "../mathu"
import { readFileSync } from "fs"

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

export function readFlamesMetadataFromFiles(filename: string): Flames {
	const buffer = readFileSync(filename)
	const flames = JSON.parse(buffer.toString())


	for (let i = 0; i < flames.components.length; i++) {
		const component = flames.components[i]
		for (let j = 0; j < component.weightedVariations.length; j++) {
			const variation = component.weightedVariations[j]
			const name = variation.variation.name
			component.weightedVariations[j].variation = getVariationFromName(name)
		}
	}

	for (let i = 0; i < flames.final.weightedVariations.length; i++)
		flames.final.weightedVariations[i].variation = getVariationFromName(flames.final.weightedVariations[i].variation.name)

	return flames
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