import { writeFileSync } from "fs"
import sharp from "sharp"
import { XY, clamp, mergeColor } from "../mathu"
import { Flames,  applyFlames,  readFlamesMetadataFromFiles } from "./Flames"
import { createRandomFlames, randomWeigthedSelection } from "./random"
import { superSampleResolution, applyAA } from "../antialiasing"

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



export async function createRandomFlamesImages(resolution: XY) {
	await createFlameImage(resolution, createRandomFlames(resolution), `output/random-${Date.now()}.png`, true)
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


// Unsafe typings
export async function createFlamesImageFromFile(filename: string) {
	const flames = readFlamesMetadataFromFiles(filename)
	await createFlameImage(flames.resolution, flames)
}