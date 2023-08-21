import { type XY, rotate2d } from "./mathu"
import { type Flames, applyFlames } from "./Flames"
import { randomWeigthedSelection } from "./random"
import {  colorFromPalette } from "./palette"

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

function worldCoordinatesToPixels(p: XY, res: XY, flames: Flames, rotation: number): XY {
	let pixel = {
		x: ((p.x + 2 * (res.x / res.y)) * (res.y / 4)),
		y: ((p.y + 2) * (res.y / 4)),
	}

	if (flames.spaceWarp.rotationalSymmetry == 1)
		return pixel = { x: Math.round(pixel.x), y: Math.round(pixel.y) }

	const rPixel = rotate2d(pixel, { x: res.x / 2, y: res.y / 2 }, rotation)
	return { x: Math.round(rPixel.x), y: Math.round(rPixel.y) }
}

function updateRenderdata(flames: Flames, renderData: RenderData, pixel: XY, colorPaletteIdx: number, antialiasing: boolean) {
	const f = antialiasing ? 3 : 1
	const idx = pixel.y * flames.resolution.x * f + pixel.x
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

function applyZoom(flames: Flames, p: XY) {
	p.x *= flames.spaceWarp.zoom
	p.y *= flames.spaceWarp.zoom
}

export function iterateRenderData(flames: Flames, renderData: RenderData, renderData3x: RenderData, p: XY, rotation: number, iteration: number, totalIteration: number) {
	const resX3x = flames.resolution.x * 3
	const resY3x = flames.resolution.y * 3
	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components)

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p)

		applyZoom(flames, p)
		applyMirrorSettings(flames, p, i + totalIteration)

		const pixel3x = worldCoordinatesToPixels(p, { x: resX3x, y: resY3x }, flames, rotation)
		const pixel = worldCoordinatesToPixels(p, flames.resolution, flames, rotation)

		if (i + totalIteration > 20 && pixel3x.x > 0 && pixel3x.x < resX3x && pixel3x.y > 0 && pixel3x.y < resY3x)
			updateRenderdata(flames, renderData3x, pixel3x, currentComponent.color, true)

		if (i + totalIteration > 20 && pixel.x > 0 && pixel.x < flames.resolution.x && pixel.y > 0 && pixel.y < flames.resolution.y)
			updateRenderdata(flames, renderData, pixel, currentComponent.color, false)
	}

	return p
}
