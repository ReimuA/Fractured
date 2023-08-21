import { defaultRenderMode, structuralPaletteRenderMode, type Flames } from "./Flames"
import { mix } from "./mathu"
import { type ColorPalette, colorFromPalette } from "./palette"
import type { RenderData } from "./render"

function paletteStructuralColoring(renderData: RenderData, p: ColorPalette) {
	const heatmap = renderData.heatmap
	const pixels = renderData.pixels
	const paletteAccumulator = renderData.paletteAccumulator
	for (let i = 0; i < heatmap.length; i++) {
		pixels[i * 4 + 3] = mix(pixels[i * 4 + 3], 255, .25)

		if (heatmap[i] < 1) continue

		const c = colorFromPalette(p, paletteAccumulator[i])

		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], 255 * c.r, .25)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], 255 * c.g, .25)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], 255 * c.b, .25)
		pixels[i * 4 + 3] = mix(pixels[i * 4 + 3], 255, .25)
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

		const r = colorAccumulator[i * 3]
		const g = colorAccumulator[i * 3 + 1]
		const b = colorAccumulator[i * 3 + 2]

		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], 255 * r, .25)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], 255 * g, .25)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], 255 * b, .25)
		pixels[i * 4 + 3] = mix(pixels[i * 4 + 3], 255, .25)
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

		pixels[i * 4 + 0] = mix(pixels[i * 4 + 0], 255 * c.r, .25)
		pixels[i * 4 + 1] = mix(pixels[i * 4 + 1], 255 * c.g, .25)
		pixels[i * 4 + 2] = mix(pixels[i * 4 + 2], 255 * c.b, .25)
		pixels[i * 4 + 3] = 255
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