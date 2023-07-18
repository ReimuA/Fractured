import { Flames } from "./Flames"

// Randomly select a component a tweak it
export function deviate(flames: Flames) {
	const componentIdx = Math.floor(Math.random() * flames.components.length)
	const component = flames.components[componentIdx]

	const r = Math.floor(Math.random() * 6)

	component.transform.c += 0.005
/* 	switch (r) {
	case 0: component.transform.a += 0.1; break
	case 1: component.transform.b += 0.1; break
	case 2: component.transform.c += 0.1; break
	case 3: component.transform.d += 0.1; break
	case 4: component.transform.e += 0.1; break
	case 5: component.transform.f += 0.1; break
	} */
}