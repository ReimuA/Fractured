import { writeFileSync } from "fs"
import sharp from "sharp"
import { XY, clamp, mergeColor, palette } from "../mathu"
import { Flames,  applyFlames,  readFlamesMetadataFromFiles } from "./Flames"
import { createRandomFlames, randomWeigthedSelection } from "./random"
import { superSampleResolution, applyAA } from "../antialiasing"

// Legacy coloring method, better for low iteration
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
	
		p = applyFlames(flames, flames.components.indexOf(currentComponent), p )

		color = mergeColor(color, mergeColor(currentComponent.color, flames.final.color))

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

function createDensityArray(resolution: XY, flames: Flames, densityFactor: number): number[] {
	const heatMap = new Array<number>(resolution.x * resolution.y).fill(0)
	let p: XY = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }

	let maxDensity = 0

	for (let i = 0; i < 2e7; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)
	
		p = applyFlames(flames, flames.components.indexOf(currentComponent), p )

		if (i > 20) {
			const pixel = {
				x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
				y: Math.round((p.y + 2) * (resolution.y / 4)),
			}

			if (pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y) {
				const idx = pixel.y * resolution.x + pixel.x
				heatMap[idx] += 1
				if (maxDensity < Math.log(heatMap[idx] * densityFactor))
					maxDensity = Math.log(heatMap[idx] * densityFactor)
			}
		}
	}

	return heatMap
}

export function createFlamesPixelBufferFromDensity(resolution: XY, heatmap: number[], densityFactor: number): Uint16Array {
	const pixels = new Uint16Array(resolution.x * resolution.y * 4).fill(0)

	for (let i = 0; i < heatmap.length; i++)
	{
		pixels[i * 4 + 3] = 255
		if (heatmap[i] < 5) continue

		const density = Math.log(100 + heatmap[i] * densityFactor)
		const c = palette(density / 10)

		pixels[i * 4 + 0] = c.r * 255
		pixels[i * 4 + 1] = c.g * 255
		pixels[i * 4 + 2] = c.b * 255
	}
	
	return pixels
}



export async function createRandomFlamesImages(resolution: XY) {
	await createFlameImage(resolution, createRandomFlames(resolution), `output/random-${Date.now()}.png`, true)
}

export async function createFlameImage(resolution: XY, flames: Flames, outfile = "output.png", supersample = false, log = false) {
	const sampleResolution = supersample ? superSampleResolution(resolution) : resolution
	
	const densityFactor = 10000
	const heatMap = createDensityArray(sampleResolution, flames, densityFactor)

	let pixels = createFlamesPixelBufferFromDensity(sampleResolution, heatMap, densityFactor)
	
	if (supersample)
		pixels = applyAA(resolution, pixels)
	
	if (log) {
		writeFileSync(outfile.replace(".png", ".heapmap.json"), JSON.stringify(heatMap, null, 4))
		writeFileSync(outfile.replace(".png", ".metadata.json"), JSON.stringify(flames, null, 4))
	}

	await sharp(pixels, {
		raw: {
			width: resolution.x,
			height: resolution.y,
			channels: 4,
		},
	}).toFile(outfile)
}


// Unsafe typings
export async function createFlamesImageFromFile(filename: string) {
	const flames = readFlamesMetadataFromFiles(filename)
	await createFlameImage(flames.resolution, flames)
}