import { IFSTransform } from "./IFSTransform"
import { WeightedVariation, linearVariation, swirlVariation } from "./Variations"
import { Color, XY,  } from "../mathu"
import { readFileSync } from "fs"

export type Flames = {
	resolution: XY
	components: FlamesComponent[]
}

export type FlamesComponent = {
	weight: number
	color: Color
	transform: IFSTransform
	variations: WeightedVariation[]
}


export function readFlamesMetadataFromFiles(filename: string): Flames {
	const buffer = readFileSync(filename)
	const flames = JSON.parse(buffer.toString())

	for (let i = 0; i < flames.components.length; i++) {
		const component = flames.components[i]
		for (let j = 0; j < component.variations.length; j++) {
			const variation = component.variations[j]
			const name = variation.variation.name
			switch (name) {
			case "Linear":
				component.variations[j].variation = linearVariation
				break
			case "Swirl":
				component.variations[j].variation = swirlVariation
				break
			}
		}
	}

	return flames
}