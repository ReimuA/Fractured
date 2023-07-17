import sharp from "sharp"
import { IFSTransform, createRandomTransform } from "./IFSTransform"
import { WeightedVariation, linearVariation, swirlVariation } from "./Variations"
import { Color, XY, mergeColor } from "./mathu"
import { readFileSync, writeFileSync } from "fs"

export type Flames = {
	resolution: XY,
	components: FlamesComponent[]
}

export type FlamesComponent = {
	weight: number
	color: Color
	transform: IFSTransform
	variations: WeightedVariation[]
}

export function createRandomFlames(resolution: XY): Flames {
	return {
		resolution,
		components: createRandomFlamesComponents(2),
	}
}

export function createRandomFlamesComponents(nb: number): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++) {
		const weight = 0
		const transform = createRandomTransform()
		const color = { r: Math.random(), g: Math.random(), b: Math.random() }

		const variations = createRandomVariations(2)

		components[i] = {
			weight,
			color,
			transform,
			variations,
		}
	}

	const step = 0.05

	for (let i = 0; i < 20; i++) {
		const idx = Math.floor(Math.random() * nb)
		components[idx].weight += step
	}

	return components
}

export function createRandomVariations(nb: number): WeightedVariation[] {
	const variations = new Array<WeightedVariation>(nb)

	for (let i = 0; i < nb; i++) {
		const r = Math.random()

		if (r < 0.5) variations[i] = { weight: 0, variation: linearVariation }
		else variations[i] = { weight: 0, variation: swirlVariation }
	}

	const step = 0.01

	for (let i = 0; i < 100; i++) {
		const idx = Math.floor(Math.random() * nb)
		variations[idx].weight += step
	}

	return variations
}

export function randomWeigthedSelection<T>(objs: (T & { weight: number })[]): T {
	const r = Math.random()
	let accumulator = 0

	for (let i = 0; i < objs.length; i++) {
		accumulator += objs[i].weight
		if (accumulator > r) return objs[i]
	}

	return objs[objs.length - 1]
}

export async function createRandomFlamesImages(resolution: XY) {
	await createFlameImage(resolution, createRandomFlames(resolution))
}

// Unsafe typings
export async function createRandomFlamesFromFile(filename: string) {
	const buffer = readFileSync(filename)
	const flames = JSON.parse(buffer.toString())

	for (let i = 0; i < flames.components.length; i++) {
		const component = flames.components[i] 
		for (let j = 0; j < component.variations.length; j++) {
			const variation = component.variations[j] 
			const name = variation.variation.name 
			switch (name) {
			case "Linear": component.variations[j].variation = linearVariation; break 
			case "Swirl": component.variations[j].variation = swirlVariation; break 
			}
		}
	}

	await createFlameImage(flames.resolution, flames)
}

export async function createFlameImage(resolution: XY, flames: Flames) {
	let p: XY = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
	let color = {
		r: Math.random(),
		g: Math.random(),
		b: Math.random(),
	}

	const pixels = new Uint16Array(resolution.x * resolution.y * 3)

	for (let i = 0; i < 2000000; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)
		const t = currentComponent.transform

		const newP = { x: 0, y: 0 }
		const tp = {
			x: (t.a * p.x + t.b * p.y + t.c),
			y: (t.d * p.x + t.e * p.y + t.f)
		}

		for (const variation of currentComponent.variations) {
			const vp =variation.variation.function(tp)
			newP.x += vp.x * variation.weight
			newP.y += vp.y * variation.weight
		}

		p = newP

		
		color = mergeColor(color, currentComponent.color)

		if (i > 20) {
			const pixel = {
				x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * ((resolution.y) / 4)),
				y: Math.round((p.y + 2) * ((resolution.y) / 4)),
			}
			if (pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y)
			{
				const idx = pixel.y * resolution.x * 3 + pixel.x * 3
			
				pixels[idx+0] = color.r * 255
				pixels[idx+1] = color.g * 255
				pixels[idx+2] = color.b * 255
			}
		}
	}
 
	writeFileSync("flames.metadata.json", JSON.stringify(flames, null, 4))

	await sharp(pixels, {
		raw: {
			width: resolution.x,
			height: resolution.y,
			channels: 3,
		}
	}).toFile("output.png")
}
