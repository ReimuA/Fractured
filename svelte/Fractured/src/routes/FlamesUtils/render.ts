import { mix, type Color, type XY } from "./mathu"
import { type Flames, applyFlames } from "./Flames"
import { createRandomFlames, randomWeigthedSelection } from "./random"
// import { superSampleResolution, applyAA } from "../antialiasing"
import { type ColorPalette, colorFromPalette } from "./palette"

export type HeatmapCell = {color: number, accumulator: number}

export type renderMode = "Default" | "Structural (Palette)" | "Structural (Color)"
export const defaultRenderMode: renderMode = "Default"
export const structularColorRenderMode: renderMode = "Structural (Color)"
export const structuralPaletteRenderMode: renderMode = "Structural (Palette)"
export const renderModeList = [defaultRenderMode, structularColorRenderMode, structuralPaletteRenderMode]

export type RenderData = {
	heatmap: Uint32Array
	paletteAccumulator: Float64Array
	colorAccumulator: Float64Array
}

export function createRenderData(length: number): RenderData {
	return {
		heatmap: new Uint32Array(length),
		colorAccumulator: new Float64Array(length * 3),
		paletteAccumulator: new Float64Array(length)
	}
}

export function resetRenderData(renderData: RenderData) {
	renderData.heatmap.fill(0)
	renderData.colorAccumulator.fill(0)
	renderData.paletteAccumulator.fill(0)
}

export function updateRenderData(resolution: XY, flames: Flames, renderData: RenderData, p: XY, iteration: number, totalIteration: number) {

	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		const pixel = {
			x: Math.round((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
			y: Math.round((p.y + 2) * (resolution.y / 4)),
		}

		if (i + totalIteration > 20 && pixel.x > 0 && pixel.x < resolution.x && pixel.y > 0 && pixel.y < resolution.y) {
			const idx = pixel.y * resolution.x + pixel.x
			renderData.paletteAccumulator[idx] = (renderData.paletteAccumulator[idx] + currentComponent.color) / 2
			renderData.heatmap[idx]++

			const colorIdx = idx * 3
			const color = colorFromPalette(flames.palette, currentComponent.color)
			renderData.colorAccumulator[colorIdx] = (renderData.colorAccumulator[colorIdx] + color.r) / 2
			renderData.colorAccumulator[colorIdx + 1] = (renderData.colorAccumulator[colorIdx + 1] + color.g) / 2
			renderData.colorAccumulator[colorIdx + 2] = (renderData.colorAccumulator[colorIdx + 2] + color.b) / 2
		}
	}

	return p
}

// Density factor can be used to provide faster visible result
export function paletteStructuralColoring(pixels: Uint8ClampedArray, heatmap: Uint32Array, paletteAccumulator: Float64Array, p: ColorPalette, densityFactor: number) {
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = 255
		if (heatmap[i] < 1) continue

		const c = colorFromPalette(p, paletteAccumulator[i])
		const aChan = Math.log(heatmap[i] * densityFactor) / heatmap[i];
		
		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], 255 * Math.pow(c.r  * aChan, 0.45454), .1)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], 255 * Math.pow(c.g  * aChan, 0.45454), .1)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], 255 * Math.pow(c.b  * aChan, 0.45454), .1)
	}
	return pixels
}

// Density factor can be used to provide faster visible result
export function colorStructuralColoring(pixels: Uint8ClampedArray, heatmap: Uint32Array, colorAccumulator: Float64Array, p: ColorPalette, densityFactor: number) {
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = 255
		if (heatmap[i] < 1) continue

		const r = colorAccumulator[i * 3]
		const g = colorAccumulator[i * 3 + 1]
		const b = colorAccumulator[i * 3 + 2]
		const aChan = Math.log(heatmap[i] * densityFactor) / heatmap[i];
		
		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], 255 * Math.pow(r  * aChan, 0.45454), .1)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], 255 * Math.pow(g  * aChan, 0.45454), .1)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], 255 * Math.pow(b  * aChan, 0.45454), .1)
	}
	return pixels
}

// Density factor can be used to provide faster visible result
export function updatePixelsBuffer(pixels: Uint8ClampedArray, heatmap: Uint32Array, p: ColorPalette, densityFactor: number) {
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