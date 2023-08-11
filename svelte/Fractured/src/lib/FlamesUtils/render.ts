import { mix, type Color, type XY, rotate2d } from "./mathu"
import { type Flames, applyFlames } from "./Flames"
import { randomWeigthedSelection } from "./random"
// import { superSampleResolution, applyAA } from "../antialiasing"
import { type ColorPalette, colorFromPalette } from "./palette"



export type RenderData = {
	pixels: Uint8ClampedArray
	heatmap: Uint32Array
	heatmapMax: number
	paletteAccumulator: Float64Array
	colorAccumulator: Float64Array
}

export function createRenderData(length: number): RenderData {
	return {
		heatmap: new Uint32Array(length),
		heatmapMax: 0,
		pixels: new Uint8ClampedArray(length * 4),
		colorAccumulator: new Float64Array(length * 3),
		paletteAccumulator: new Float64Array(length)
	}
}

export function resetRenderData(renderData: RenderData) {
	renderData.heatmapMax = 0
	renderData.pixels.fill(0)
	renderData.heatmap.fill(0)
	renderData.colorAccumulator.fill(0)
	renderData.paletteAccumulator.fill(0)
}

function applyMirrorSettings(flames: Flames, p: XY, i: number) {
	const mX = flames.spaceWarp.mirrorX
	const mY = flames.spaceWarp.mirrorY

	if (!mX && !mY) return

	if (mX && mY) {
		if (i % 4 == 0) p.x *= -1
		else if (i % 3 == 0) {
			p.y *= -1
			p.x *= -1
		}
		else if (i % 2 == 0) p.y *= -1
	}
	else if (mY) p.x *= (i % 2) == 0 ? 1 : -1
	else if (mX) p.y *= (i % 2) == 0 ? 1 : -1
}
/* 
function worldCoordinatesToPixels(resolution: XY, flames: Flames, rotation: number) {
	let pixel = {
		x: ((p.x + 2 * (resolution.x / resolution.y)) * (resolution.y / 4)),
		y: ((p.y + 2) * (resolution.y / 4)),
	}

	if (flames.spaceWarp.rotationalSymmetry > 1) {
		const rPixel = rotate2d(pixel, { x: flames.resolution.x / 2, y: flames.resolution.y / 2 }, rotation)
		pixel = { x: Math.round(rPixel.x), y: Math.round(rPixel.y) }
	} else {
		pixel = { x: Math.round(pixel.x), y: Math.round(pixel.y) }
	}

} */

function updateRenderdata(flames: Flames, renderData: RenderData, pixel: XY, colorPaletteIdx: number) {
	const idx = pixel.y * flames.resolution.x * flames.superSampleRatio + pixel.x
	renderData.paletteAccumulator[idx] = (renderData.paletteAccumulator[idx] + colorPaletteIdx) / 2
	renderData.heatmap[idx]++

	if (renderData.heatmapMax < renderData.heatmap[idx])
		renderData.heatmapMax = renderData.heatmap[idx]

	const colorIdx = idx * 3
	const color = colorFromPalette(flames.namedPalette.palette, colorPaletteIdx)
	renderData.colorAccumulator[colorIdx] = (renderData.colorAccumulator[colorIdx] + color.r) / 2
	renderData.colorAccumulator[colorIdx + 1] = (renderData.colorAccumulator[colorIdx + 1] + color.g) / 2
	renderData.colorAccumulator[colorIdx + 2] = (renderData.colorAccumulator[colorIdx + 2] + color.b) / 2
}

export function iterateRenderData(flames: Flames, renderData: RenderData, p: XY, rotation: number, iteration: number, totalIteration: number) {
	const resX = flames.resolution.x * flames.superSampleRatio
	const resY = flames.resolution.y * flames.superSampleRatio
	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		applyMirrorSettings(flames, p, i + totalIteration)

		let pixel = {
			x: ((p.x + 2 * (resX / resY)) * (resY / 4)),
			y: ((p.y + 2) * (resY / 4)),
		}

		if (flames.spaceWarp.rotationalSymmetry > 1) {
			const rPixel = rotate2d(pixel, { x: resX / 2, y: resY / 2 }, rotation)
			pixel = { x: Math.round(rPixel.x), y: Math.round(rPixel.y) }
		} else {
			pixel = { x: Math.round(pixel.x), y: Math.round(pixel.y) }
		}

		if (i + totalIteration > 20 && pixel.x > 0 && pixel.x < resX && pixel.y > 0 && pixel.y < resY) {
			updateRenderdata(flames, renderData, pixel, currentComponent.color)
		}
	}

	return p
}

export function paletteStructuralColoring(renderData: RenderData, p: ColorPalette) {
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

export function colorStructuralColoring(renderData: RenderData) {
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

export function updatePixelsBuffer(renderData: RenderData, p: ColorPalette) {
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