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

export const sphericalVariation: Variation = {
	name: "Spherical",
	function: (p: XY) => {
		const r = xyLength(p)
		const r2 = r * r
		return { x: p.x / r2, y: p.y / r2 }
	},
}

export const sinusoidalVariation: Variation = {
	name: "Sinusoidal",
	function: (p: XY) => {
		return { x: Math.sin(p.x), y: Math.sin(p.y) }
	},
}

export function getVariationFromName(name: string): Variation | undefined {
	switch (name) {
	case "Linear":
		return linearVariation
	case "Swirl":
		return swirlVariation
	case "Spherical":
		return sphericalVariation
	case "Sinusoidal":
		return sinusoidalVariation
	case "Fan":
		return fanVariation
	default:
		console.log("wtf")
		return undefined
	}
}

export const allVariations: Variation[] = [
	linearVariation,
	swirlVariation,
	sphericalVariation,
	sinusoidalVariation,
	fanVariation,
]

export type WeightedVariation = {
	weight: number
	variation: Variation
}
