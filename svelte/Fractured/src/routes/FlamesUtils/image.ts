import { mix, type Color, type XY } from "./mathu"
import { type Flames, applyFlames } from "./Flames"
import { createRandomFlames, randomWeigthedSelection } from "./random"
// import { superSampleResolution, applyAA } from "../antialiasing"
import { type ColorPalette, colorFromPalette } from "./palette"

export type HeatmapCell = {color: number, accumulator: number}

export function updateDensityArrayForStructuralColoring(resolution: XY, flames: Flames, heatmap: HeatmapCell[], p: XY, iteration: number, totalIteration: number) {

	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		const pixel = {
			x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
			y: Math.round((p.y + 2) * (resolution.y / 4)),
		}

		if (i + totalIteration > 20 && pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y) {
			const idx = pixel.y * resolution.x + pixel.x
			heatmap[idx].color = (heatmap[idx].color + currentComponent.color) / 2
			heatmap[idx].accumulator++
		}
	}

	return { heatmap, p }
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

export function updatePixelsBufferForStructuralColoring(pixels: Uint8ClampedArray, heatmap: HeatmapCell[], p: ColorPalette, densityFactor: number) {
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = 255
		if (heatmap[i].accumulator < 1) continue

		const c = colorFromPalette(p, heatmap[i].color)
		const aChan = Math.log(heatmap[i].accumulator) / heatmap[i].accumulator;
		
		pixels[i * 4 + 0] = 255 * Math.pow(c.r  * aChan, 0.45454)
		pixels[i * 4 + 1] = 255 * Math.pow(c.g  * aChan, 0.45454)
		pixels[i * 4 + 2] = 255 * Math.pow(c.b  * aChan, 0.45454)
	}
	return pixels
}

// Non structural coloring : provide faster visual result by only using the accumulator
export function updatePixelsBuffer(pixels: Uint8ClampedArray, heatmap: HeatmapCell[], p: ColorPalette, densityFactor: number) {
	let max = 0;
	for (let i = 0; i < heatmap.length; i++)
		if (heatmap[i].accumulator > max)
			max = heatmap[i].accumulator

	const maxDensity = Math.log(max * densityFactor)
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = 255
		if (heatmap[i].accumulator < 1) continue

		const density = Math.log(heatmap[i].accumulator * densityFactor)
		const c = colorFromPalette(p, density / maxDensity)

		
		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], c.r * 255, .1)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], c.g * 255, .1)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], c.b * 255, .1)
	}
	return pixels
}