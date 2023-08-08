import type { Color, XY } from "./mathu"

export function superSampleResolution(resolution: XY): XY {
	return {
		x: resolution.x * 3,
		y: resolution.y * 3,
	}
}

function getColor(sample: Uint8ClampedArray, idx: number) {
	return {
		r: sample[idx + 0],
		g: sample[idx + 1],
		b: sample[idx + 2],
		a: sample[idx + 3]
	}
}

export function applyAA(resolution: XY, supersample: Uint8ClampedArray, canvasContent: Uint8ClampedArray) {
	const ssResolution = superSampleResolution(resolution)

	for (let i = 0; i < resolution.x * resolution.y; i++) {
		const idx = i * 4

		const cIdx = 2 * idx + Math.floor(i / resolution.x) * ssResolution.x * 4

		const c1 = getColor(supersample, cIdx + 0)
		const c2 = getColor(supersample, cIdx + 4)
		const c3 = getColor(supersample, cIdx + ssResolution.x * 4 + 0)
		const c4 = getColor(supersample, cIdx + ssResolution.x * 4 + 4)

		canvasContent[idx + 0] = (c1.r + c2.r + c3.r + c4.r) / 4
		canvasContent[idx + 1] = (c1.g + c2.g + c3.g + c4.g) / 4
		canvasContent[idx + 2] = (c1.b + c2.b + c3.b + c4.b) / 4
		canvasContent[idx + 3] = (c1.a + c2.a + c3.a + c4.a) / 4

		// Gamma correction
		canvasContent[idx + 0] = Math.pow(canvasContent[idx + 0] / 255, 0.454545) * 255
		canvasContent[idx + 1] = Math.pow(canvasContent[idx + 1] / 255, 0.454545) * 255
		canvasContent[idx + 2] = Math.pow(canvasContent[idx + 2] / 255, 0.454545) * 255
		canvasContent[idx + 3] = Math.pow(canvasContent[idx + 3] / 255, 0.454545) * 255
	}
}

const downsampleHeatmapCell3x = (idx: number, linesize: number, heatmap: Uint32Array) => (
	heatmap[idx] +
	heatmap[idx + 1] +
	heatmap[idx + 2] +
	heatmap[idx + linesize] +
	heatmap[idx + linesize + 1] +
	heatmap[idx + linesize + 2] +
	heatmap[idx + linesize * 2] +
	heatmap[idx + linesize * 2 + 1] +
	heatmap[idx + linesize * 2 + 2]
) / 9

export function applyAA3x(resolution: XY, supersample: Uint8ClampedArray, canvasContent: Uint8ClampedArray, heatmap: Uint32Array) {
	const ssResolution = { x: resolution.x * 3, y: resolution.y * 3 }

	for (let i = 0; i < resolution.x * resolution.y; i++) {
		let cIdx = 3 * 4 * i + Math.floor(i / resolution.x) * ssResolution.x * (4 * 2)

		const c1 = getColor(supersample, cIdx + 0)
		const c2 = getColor(supersample, cIdx + 4)
		const c3 = getColor(supersample, cIdx + 8)
		const c4 = getColor(supersample, cIdx + ssResolution.x * 4 + 0)
		const c5 = getColor(supersample, cIdx + ssResolution.x * 4 + 4)
		const c6 = getColor(supersample, cIdx + ssResolution.x * 4 + 8)
		const c7 = getColor(supersample, cIdx + ssResolution.x * 8 + 0)
		const c8 = getColor(supersample, cIdx + ssResolution.x * 8 + 4)
		const c9 = getColor(supersample, cIdx + ssResolution.x * 8 + 8)

		const idx = i * 4
		canvasContent[idx + 0] = (c1.r + c2.r + c3.r + c4.r + c5.r + c6.r + c7.r + c8.r + c9.r) / 9
		canvasContent[idx + 1] = (c1.g + c2.g + c3.g + c4.g + c5.g + c6.g + c7.g + c8.g + c9.g) / 9
		canvasContent[idx + 2] = (c1.b + c2.b + c3.b + c4.b + c5.b + c6.b + c7.b + c8.b + c9.b) / 9
		canvasContent[idx + 3] = (c1.a + c2.a + c3.a + c4.a + c5.a + c6.a + c7.a + c8.a + c9.a) / 9

/* 		let hidx = 3 * i + Math.floor(i / resolution.x) * ssResolution.x * 2
		let alpha = downsampleHeatmapCell3x(hidx, ssResolution.x, heatmap)
		let fAlpha = alpha == 0 ? 1 : Math.log10(alpha * 10) / alpha
 */
		let fAlpha = 1
		// Gamma correction
		canvasContent[idx + 0] =  Math.pow((canvasContent[idx + 0] / 255) * fAlpha, 0.454545) * 255
		canvasContent[idx + 1] =  Math.pow((canvasContent[idx + 1] / 255) * fAlpha, 0.454545) * 255
		canvasContent[idx + 2] =  Math.pow((canvasContent[idx + 2] / 255) * fAlpha, 0.454545) * 255
		canvasContent[idx + 3] = 255
	}
}