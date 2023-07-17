export type IFSTransform = {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
	p: number
}

export function createRandomTransform(): IFSTransform {
	const r = () => Math.random() * 3 - 3/2

	return createTransform(
		r(),
		r(),
		r(),
		r(),
		r(),
		r(),
		r(),
	)
}

export function createTransform(a: number, b: number, c: number, d: number, e: number, f: number, p: number): IFSTransform {
	return { a, b, c, d, e, f, p }
}

export function contraction(t: IFSTransform): number {
	return t.a * t.d - t.b * t.c
}

export function correctTransformation(t: IFSTransform): IFSTransform {
	const d = contraction(t)
	t.p = d
	if (d > .4) {
		const a = (.4 / d)
		return {
			a: t.a * a,
			b: t.b * a,
			c: t.c * a,
			d: t.d * a,
			e: t.e,
			f: t.f,
			p: t.p * a
		}
	}

	return t
}