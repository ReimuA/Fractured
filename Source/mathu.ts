export type XY = {x: number, y: number}
export type Color = {r: number, g: number, b: number}

export type XYZ = XY & {z: number}
export type Vec3 = XYZ 

export function clamp(edgeA: number, edgeB: number, x: number) {
	if (x < edgeA) return edgeA
	if (x > edgeB) return edgeB
	return x
}

export function c01(x: number) {
	return clamp(0, 1, x)
}

export function mixColor(a: Color, b: Color, c: number): Color {
	return {
		r: a.r*(1-c)+b.r*c,
		g: a.g*(1-c)+b.g*c,
		b: a.b*(1-c)+b.b*c,
	}
}

export function mix(a: number, b: number, c: number): number {
	return a*(1-c)+b*c
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
	x = (x - edge0) / (edge1 - edge0)

	x = c01(x)
	return x * x * (3.0 - 2.0 * x)
}

export function dot(a: XY, b: XY)
{
	return a.x * b.x + a.y * b.y
}

export function xyLength(p: XY) {
	return Math.sqrt(p.x * p.x + p.y * p.y)
}

export function mergeColor(a: Color, b: Color): Color {
	return {
		r: (a.r + b.r) / 2,
		g: (a.g + b.g) / 2,
		b: (a.b + b.b) / 2,
	}
}