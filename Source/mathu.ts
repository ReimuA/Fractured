export type XY = {x: number, y: number}


export function c01(x: number) {
	if (x < 0) return 0
	if (x > 1) return 1
	return x
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
	x = (x - edge0) / (edge1 - edge0)

	x = c01(x)
	return x * x * (3.0 - 2.0 * x)
}