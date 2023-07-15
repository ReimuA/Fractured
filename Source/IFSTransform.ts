export type IFSTransform = {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
	p: number
}

export function createTransform(a: number, b: number, c: number, d: number, e: number, f: number, p: number): IFSTransform {
	return { a, b, c, d, e, f, p }
}
