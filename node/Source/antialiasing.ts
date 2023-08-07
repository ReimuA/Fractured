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

	console.log(supersample.length)
    
	for (let i = 0; i < resolution.x * resolution.y; i++) {
		const idx = i * 4

		const cIdx = 2 * idx + Math.floor(i / resolution.x) * ssResolution.x * 4

		console.log("ouh: " + cIdx)
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


export function applyAA3x(resolution: XY, supersample: Uint16Array) {
	const ssResolution = { x: resolution.x * 3, y: resolution.y * 3 }
	const buffer = new Uint16Array(resolution.x * resolution.y * 4)

	for (let i = 0; i < resolution.x * resolution.y; i++) {
		const x = i % resolution.x
		const y = Math.floor(i / resolution.x)
		let cIdx = 3 * 4 * x + y * ssResolution.x * 4
		 cIdx = 3 * 4 * i + Math.floor(i / resolution.x) * ssResolution.x * (4 * 2)

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
		buffer[idx + 0] = (c1.r + c2.r + c3.r + c4.r + c5.r + c6.r + c7.r + c8.r + c9.r) / 9
		buffer[idx + 1] = (c1.g + c2.g + c3.g + c4.g + c5.g + c6.g + c7.g + c8.g + c9.g) / 9
		buffer[idx + 2] = (c1.b + c2.b + c3.b + c4.b + c5.b + c6.b + c7.b + c8.b + c9.b) / 9
		buffer[idx + 3] = (c1.a + c2.a + c3.a + c4.a + c5.a + c6.a + c7.a + c8.a + c9.a) / 9
	}
	return buffer
}

