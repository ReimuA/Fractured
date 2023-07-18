export type IFSTransform = {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
}

export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3 / 2

	return createTransform(r(), r(), r(), r(), r(), r())
}

export function createTransform(a: number, b: number, c: number, d: number, e: number, f: number): IFSTransform {
	return { a, b, c, d, e, f }
}

export function contraction(t: IFSTransform): number {
	return t.a * t.d - t.b * t.c
}
