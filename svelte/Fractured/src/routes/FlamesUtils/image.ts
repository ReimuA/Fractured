import { mix, type XY } from "./mathu"
import { type Flames, applyFlames } from "./Flames"
import { createRandomFlames, randomWeigthedSelection } from "./random"
// import { superSampleResolution, applyAA } from "../antialiasing"
import { type ColorPalette, colorFromPalette, defaultPalette, getRandomColorPalette } from "./palette"

export function createDensityArray(resolution: XY, flames: Flames, iteration: number): number[] {
	const heatmap = new Array<number>(resolution.x * resolution.y).fill(0)
	let p: XY = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }

	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		if (i > 20) {
			const pixel = {
				x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
				y: Math.round((p.y + 2) * (resolution.y / 4)),
			}

			if (pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y) {
				const idx = pixel.y * resolution.x + pixel.x
				heatmap[idx] += 1
			}
		}
	}

	return heatmap
}

export function updateDensityArray(resolution: XY, flames: Flames, heatmap: number[], p: XY, iteration: number, totalIteration: number) {

	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		const pixel = {
			x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
			y: Math.round((p.y + 2) * (resolution.y / 4)),
		}

		if (i + totalIteration > 20 && pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y) {
			const idx = pixel.y * resolution.x + pixel.x
			heatmap[idx] += 1
		}
	}

	return { heatmap, p }
}

export function updatePixelsBuffer(pixels: Uint8ClampedArray, heatmap: number[], p: ColorPalette, densityFactor: number) {
	let max = 0;
	for (let i = 0; i < heatmap.length; i++)
		if (heatmap[i] > max)
			max = heatmap[i]

	const maxDensity = Math.log(max * densityFactor)
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = 255
		if (heatmap[i] < 1) continue

		const density = Math.log(heatmap[i] * densityFactor)
		const c = colorFromPalette(p, density / maxDensity)

		
		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], c.r * 255, .1)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], c.g * 255, .1)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], c.b * 255, .1)
	}
	return pixels
}

export function createFlamesPixelBufferFromDensity(resolution: XY, heatmap: number[], p: ColorPalette, densityFactor: number): Uint8ClampedArray {
	const pixels = new Uint8ClampedArray(resolution.x * resolution.y * 4).fill(0)
	return updatePixelsBuffer(pixels, heatmap, p, densityFactor);
}