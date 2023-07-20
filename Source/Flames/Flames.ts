import sharp from "sharp"
import { IFSTransform, createRandomTransform } from "./IFSTransform"
import { WeightedVariation, linearVariation, swirlVariation } from "./Variations"
import { Color, XY, clamp, mergeColor } from "../mathu"
import { readFileSync, writeFileSync } from "fs"
import { applyAA, superSampleResolution } from "../antialiasing"

export type Flames = {
	resolution: XY
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
		components: createRandomFlamesComponents(4),
	}
}

export function createRandomFlamesComponents(nb: number): FlamesComponent[] {
	const components = new Array<FlamesComponent>(nb)

	for (let i = 0; i < nb; i++) {
		const weight = 0
		const transform = createRandomTransform()
		const color = { r: Math.random(), g: Math.random(), b: Math.random() }

		const variations = createRandomVariations(5)

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
		const weight = Math.random()

		if (r < 0.5) variations[i] = { weight, variation: linearVariation }
		else variations[i] = { weight, variation: swirlVariation }
	}

	const totalWeight = variations.reduce((total, v ) => total + v.weight, 0)

	for (const v of variations)
		v.weight /= totalWeight

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
	await createFlameImage(resolution, createRandomFlames(resolution), `output/random-${Date.now()}.png`, true)
}

export function readFlamesMetadataFromFiles(filename: string): Flames {
	const buffer = readFileSync(filename)
	const flames = JSON.parse(buffer.toString())

	for (let i = 0; i < flames.components.length; i++) {
		const component = flames.components[i]
		for (let j = 0; j < component.variations.length; j++) {
			const variation = component.variations[j]
			const name = variation.variation.name
			switch (name) {
			case "Linear":
				component.variations[j].variation = linearVariation
				break
			case "Swirl":
				component.variations[j].variation = swirlVariation
				break
			}
		}
	}

	return flames
}

// Unsafe typings
export async function createFlamesFromFile(filename: string) {
	const flames = readFlamesMetadataFromFiles(filename)
	await createFlameImage(flames.resolution, flames)
}

export function createFlamesPixelBuffer(resolution: XY, flames: Flames, supersample: boolean): Uint16Array {
	const sampleResolution = supersample ? superSampleResolution(resolution) : resolution
	let p: XY = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
	let color = {
		r: Math.random(),
		g: Math.random(),
		b: Math.random(),
	}

	let pixels = new Uint16Array(sampleResolution.x * sampleResolution.y * 4).map((e, i) => ((i + 1) % 4 == 0 ? 255 : 0))

	for (let i = 0; i < 2000000; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)
		const t = currentComponent.transform

		const newP = { x: 0, y: 0 }
		const tp = {
			x: t.a * p.x + t.b * p.y + t.c,
			y: t.d * p.x + t.e * p.y + t.f,
		}

		for (const variation of currentComponent.variations) {
			const vp = variation.variation.function(tp)
			newP.x += vp.x * variation.weight
			newP.y += vp.y * variation.weight
		}

		p = newP

		color = mergeColor(color, currentComponent.color)

		if (i > 20) {
			const pixel = {
				x: Math.round((p.x + 2 * (sampleResolution.x / sampleResolution.y)) * (sampleResolution.y / 4)),
				y: Math.round((p.y + 2) * (sampleResolution.y / 4)),
			}
			if (pixel.x > 0 && pixel.x < sampleResolution.x && pixel.y > 0 && pixel.y < sampleResolution.y) {
				const idx = pixel.y * sampleResolution.x * 4 + pixel.x * 4

				pixels[idx + 0] = color.r * 255
				pixels[idx + 1] = color.g * 255
				pixels[idx + 2] = color.b * 255
				pixels[idx + 3] = clamp(0, 255, pixels[idx + 3] - 4)
			}
		}
	}

	if (supersample)
		pixels = applyAA(resolution, pixels)

	return pixels
}

export async function createFlameImage(resolution: XY, flames: Flames, outfile = "output.png", supersample = false) {
	const pixels = createFlamesPixelBuffer(resolution, flames, supersample)
	writeFileSync(outfile.replace(".png", ".metadata.json"), JSON.stringify(flames, null, 4))

	await sharp(pixels, {
		raw: {
			width: resolution.x,
			height: resolution.y,
			channels: 4,
		},
	}).toFile(outfile)
}
