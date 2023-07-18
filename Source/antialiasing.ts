import { Color, XY } from "./mathu"

export function superSampleResolution(resolution: XY): XY {
	return {
		x: resolution.x * 2,
		y: resolution.y * 2,
	}
}

function getColor(sample: Uint16Array, idx: number) {
	return {
		r: sample[idx+0],
		g: sample[idx+1],
		b: sample[idx+2],
		a: sample[idx+3]
	}
}

export function applyAA(resolution: XY, supersample: Uint16Array) {
	const ssResolution = superSampleResolution(resolution)
	const l = resolution.x * resolution.y * 4
	const buffer = new Uint16Array(l)
    
	for (let i = 0; i < resolution.x * resolution.y; i++) {
		const idx = i * 4

		const cIdx = 2 * idx + Math.floor(i / resolution.x) * ssResolution.x * 4

		const c1 = getColor(supersample, cIdx + 0)
		const c2 = getColor(supersample, cIdx + 4)
		const c3 = getColor(supersample, cIdx + ssResolution.x * 4 + 0)
		const c4 = getColor(supersample, cIdx + ssResolution.x * 4 + 4)

		buffer[idx + 0] = (c1.r + c2.r + c3.r + c4.r) / 4
		buffer[idx + 1] = (c1.g + c2.g + c3.g + c4.g) / 4
		buffer[idx + 2] = (c1.b + c2.b + c3.b + c4.b) / 4
		buffer[idx + 3] = (c1.a + c2.a + c3.a + c4.a) / 4
	}

	return buffer
}