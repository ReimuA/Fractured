import { Flames } from "./Flames"

export function deviate(flames: Flames, delta: number) {
	for (const c of flames.components) {
		c.transform.a += Math.cos(delta * 4.14) * .003
		c.transform.b += Math.cos(delta * 4.14) * .003
		c.transform.c += Math.sin(delta * 4.14) * .003
		c.transform.d += Math.sin(delta * 4.14) * .003
		c.transform.e += Math.cos(delta * 4.14) * .0003
		c.transform.f += Math.sin(delta * 4.14) * .0003
	}
}