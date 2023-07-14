export type Complex = {
    r: number
    i: number
}

export function cLength(z: Complex) {
	return Math.sqrt(z.i * z.i + z.r * z.r)
}

export const cPow = (z: Complex): Complex => { 
	return {
		r:z.r*z.r-z.i*z.i,
		i:2.*z.i*z.r,
	}
}