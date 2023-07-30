export type IFSTransform = {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
}

export function createTransform(a: number, b: number, c: number, d: number, e: number, f: number): IFSTransform {
	return { a, b, c, d, e, f }
}

export function contraction(t: IFSTransform): number {
	return t.a * t.d - t.b * t.c
}
