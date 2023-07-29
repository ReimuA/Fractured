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

export function rebalanceWeight(flames: Flames, componentsIdx: number, percent: number) {
	percent /= 100
	const l = flames.components.length

	for (let i = 0; i < l; i++) {
		if (i == componentsIdx)
			flames.components[i].weight += percent
		else
			flames.components[i].weight -= percent / (l - 1)

	}
}

export function alterAllVariation(flames: Flames, variation: string, factor: number) {
	for (const c of flames.components)
		for (const v of c.weightedVariations)
			if (v.variation.name === variation)
				v.weight *= factor
	return flames
}