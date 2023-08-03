import { type XY, xyLength } from "./mathu"
import type { IFSTransform } from "./IFSTransform"

export type Variation = { function: (p: XY, t: IFSTransform) => XY; name: string }

function modn(n: number, m: number) {
	return ((n % m) + m) % m
}

// See https://flam3.com/flame_draves.pdf - Appendix: Catalog of Variations
const _theta = (p: XY) => Math.atan2(p.y, p.x)
const _phi = (p: XY) => Math.atan2(p.x, p.y)
const _r = (p: XY) => xyLength(p)
const _omega = () => Math.random() < .5 ? 0 : Math.PI
const _lambda = () => Math.random() < .5 ? -1 : 1
const _psi = () => Math.random()

export const linearVariation: Variation = {
	name: "Linear",
	function: (p: XY) => {
		return { x: p.x, y: p.y }
	},
}

export const sinusoidalVariation: Variation = {
	name: "Sinusoidal",
	function: (p: XY) => {
		return { x: Math.sin(p.x), y: Math.sin(p.y) }
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

export const horseshoeVariation: Variation = {
	name: "Horseshoe",
	function: (p: XY) => {
		const r = xyLength(p)
		const invR = 1 / r
		return {
			x: invR * (p.x + p.y) * (p.x - p.y),
			y: invR * 2 * p.x * p.y
		}
	}
}

export const polarVariation: Variation = {
	name: "Polar",
	function: (p: XY) => {
		return {
			x: _theta(p) / Math.PI,
			y: _r(p) - 1
		}
	}
}

export const handkerchieVariation: Variation = {
	name: "Handkerchief",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		return {
			x: r * Math.sin(theta + r),
			y: r * Math.cos(theta - r)
		}
	}
}

export const heartVariation: Variation = {
	name: "Heart",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		return {
			x: r * Math.sin(theta * r),
			y: r * -Math.cos(theta * r)
		}
	}
}

export const discVariation: Variation = {
	name: "Disc",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		const f = theta / Math.PI
		return {
			x: f * Math.sin(Math.PI * r),
			y: f * Math.cos(Math.PI * r)
		}
	}
}

export const spiralVariation: Variation = {
	name: "Spiral",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		const invR = 1 / r
		return {
			x: invR * (Math.cos(theta) + Math.sin(r)),
			y: invR * (Math.sin(theta) - Math.cos(r))
		}
	}
}

export const hyperbolicVariation: Variation = {
	name: "Hyperbolic",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		return {
			x: Math.sin(theta) / r,
			y: r * Math.cos(theta)
		}
	}
}

export const diamondVariation: Variation = {
	name: "Diamond",
	function: (p: XY) => {
		const r = _r(p)
		const theta = _theta(p)
		return {
			x: Math.sin(theta) * Math.cos(r),
			y: Math.sin(r) * Math.cos(theta)
		}
	}
}

export const fanVariation: Variation = {
	name: "Fan",
	function: (p: XY, transform: IFSTransform) => {
		const r = xyLength(p)
		const theta = _theta(p)
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


export function getVariationFromName(name: string): Variation | undefined {
	switch (name) {
		case "Linear":
			return linearVariation
		case "Sinusoidal":
			return sinusoidalVariation
		case "Spherical":
			return sphericalVariation
		case "Swirl":
			return swirlVariation
		case "Horseshoe":
			return horseshoeVariation
		case "Polar":
			return polarVariation
		case "Handkerchief":
			return handkerchieVariation
		case "Heart":
			return heartVariation
		case "Disc":
			return discVariation
		case "Spiral":
			return spiralVariation
		case "Hyperbolic":
			return hyperbolicVariation
		case "Diamond":
			return diamondVariation
		case "Fan":
			return fanVariation
		default:
			return undefined
	}
}

export const allVariations: Variation[] = [
	linearVariation,
	sinusoidalVariation,
	sphericalVariation,
	swirlVariation,
	horseshoeVariation,
	polarVariation,
	handkerchieVariation,
	heartVariation,
	discVariation,
	spiralVariation,
	hyperbolicVariation,
	diamondVariation,
	fanVariation,
]

export type WeightedVariation = {
	weight: number
	variation: Variation
}
