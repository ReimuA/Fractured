import { defaultRenderMode, structuralPaletteRenderMode, type Flames } from "./Flames"
import { mix, type Color } from "./mathu"
import { type ColorPalette, colorFromPalette } from "./palette"
import type { RenderData } from "./render"

function mixColor(pixels: Uint8ClampedArray, idx: number, c: Color) {
	pixels[idx + 0] = mix(pixels[idx + 0], 255 * c.r, .25)
	pixels[idx + 1] = mix(pixels[idx + 1], 255 * c.g, .25)
	pixels[idx + 2] = mix(pixels[idx + 2], 255 * c.b, .25)
	pixels[idx + 3] = mix(pixels[idx + 3], 255, .25)
}

function paletteStructuralColoring(renderData: RenderData, p: ColorPalette) {
	const heatmap = renderData.heatmap
	const pixels = renderData.pixels
	const paletteAccumulator = renderData.paletteAccumulator
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = mix(pixels[i * 4 + 3], 255, .25)

		if (heatmap[i] < 1) continue

		const c = colorFromPalette(p, paletteAccumulator[i])
		mixColor(pixels, i * 4, c)
	}
	return pixels
}

function colorStructuralColoring(renderData: RenderData) {
	const heatmap = renderData.heatmap
	const pixels = renderData.pixels
	const colorAccumulator = renderData.colorAccumulator
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = mix(pixels[i * 4 + 3], 255, .25)
		if (heatmap[i] < 1) continue

		const c = {
			r: colorAccumulator[i * 3],
			g: colorAccumulator[i * 3 + 1],
			b: colorAccumulator[i * 3 + 2],
		}

		mixColor(pixels, i * 4, c)
	}
	return pixels
}

function defaultColoring(renderData: RenderData, p: ColorPalette) {
	const max = renderData.heatmapMax
	const pixels = renderData.pixels
	const heatmap = renderData.heatmap
	const maxDensity = Math.log10(max)

	for (let i = 0; i < heatmap.length; i++) {
		if (heatmap[i] < 1) continue

		const density = Math.log10(heatmap[i])
		const c = colorFromPalette(p, density / maxDensity)

		mixColor(pixels, i * 4, c)
	}
	return pixels
}

export function updateFlamesColor(flames: Flames, renderData: RenderData) {
	if (flames.renderMode === defaultRenderMode)
		defaultColoring(renderData, flames.namedPalette.palette)
	else if (flames.renderMode === structuralPaletteRenderMode)
		paletteStructuralColoring(renderData, flames.namedPalette.palette);
	else
		colorStructuralColoring(renderData);
}