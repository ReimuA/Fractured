import { XY, xyLength } from "./mathu"


export type Variation = { function: (p: XY) => XY, name: string}

export const linearVariation: Variation = {
	name: "Linear",
	function: (p: XY) => {
		return {x: p.x, y: p.y}
	} 
}

export const swirlVariation: Variation = {
	name: "Swirl",
	function: (p: XY) => {
		const r = xyLength(p)
		const r2 = r*r
		const cos = Math.cos(r2)
		const sin = Math.sin(r2)
		return {x: p.x * sin - p.y * cos, y: p.x * cos + p.y * sin}
	} 
}

export type WeightedVariation = {
    weight: number
    variation: Variation
}