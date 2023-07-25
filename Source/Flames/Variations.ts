import { XY, xyLength } from "../mathu"
import { IFSTransform } from "./IFSTransform"

export type Variation = { function: (p: XY, t: IFSTransform) => XY; name: string }

function modn(n: number, m: number) {
	return ((n % m) + m) % m
}

export const linearVariation: Variation = {
	name: "Linear",
	function: (p: XY) => {
		return { x: p.x, y: p.y }
	},
}

export const swirlVariation: Variation = {
	name: "Swirl",
	function: (p: XY) => {
		const r = xyLength(p)
		const r2 = r * r
		const cos = Math.cos(r2)
		const sin = Math.sin(r2)
		return { x: p.x * sin - p.y * cos, y: p.x * cos + p.y * sin }
	},
}

export const fanVariation: Variation = {
	name: "Fan",
	function: (p: XY, transform: IFSTransform) => {
		const r = xyLength(p)
		const theta = Math.atan2(p.y, p.x)
		const t = Math.PI * transform.c * transform.c
		const f = transform.f

		if (modn(theta + f, t) > t / 2)
			return {
				x: r * Math.cos(theta - t / 2),
				y: r * Math.sin(theta - t / 2),
			}

		return {
			x: r * Math.cos(theta + t / 2),
			y: r * Math.sin(theta + t / 2),
		}
	},
}

export const quinVariation: Variation = {
	name: "Quin",
	function: (p: XY) => {
		const r = xyLength(p)
		return { x: p.x / r, y: p.x / r }
	},
}

export function getVariationFromName(name: string): Variation | undefined {
	switch (name) {
	case "Linear":
		return linearVariation
	case "Swirl":
		return swirlVariation
	case "Quin":
		return quinVariation
	case "Fan":
		return fanVariation
	default:
		console.log("wtf")
		return undefined
	}
}

export type WeightedVariation = {
	weight: number
	variation: Variation
}
