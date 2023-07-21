import { Flames } from "./Flames"

export function deviate(flames: Flames, delta: number) {
	for (const c of flames.components) {
		c.transform.a += Math.cos(delta * 1) * .83
		c.transform.b += Math.cos(delta * -1) * .63
		c.transform.c += Math.cos(delta * 1) * .93
		c.transform.d += Math.cos(delta * -1) * 1.23
		c.transform.e += Math.cos(delta * 1) * .863
		c.transform.f += Math.cos(delta * -1) * .873
	}
}