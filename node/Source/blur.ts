import type { XY } from "./mathu"

export function createBlurKernel(sigma: number): number[][] {
	if (sigma <= 0) sigma = 1e-6
	const GAUSSKERN = 3.0
	let l = Math.floor(Math.max(3.0, GAUSSKERN * sigma))
	if (l % 2 == 0)
		l += 1
	const half = Math.floor(l / 2)
	let total = 0

	const kernel: number[][] = []

	for (let x = -half; x <= half; x++) {
		const kernelLine = new Array<number>(half + 1)
		for (let y = -half; y <= half; y++) {
			const exponent = Math.pow(Math.E, -(x * x + y * y) / (2 * sigma * sigma))
			const value = exponent / (2 * Math.PI * sigma * sigma)
			kernelLine[y + half] = value
			total += value
		}
		kernel.push(kernelLine)
	}

	for (let y = 0; y < kernel.length; y++)
		for (let x = 0; x < kernel[y].length; x++)
			kernel[y][x] /= total

	return kernel
}

export function localBlur(idx: number, resolution: XY, input: Uint8Array, output: Uint8Array, sigma: number) {
	const rx = resolution.x * 4
	const kernel = createBlurKernel(sigma)
	const ml = Math.floor(kernel.length / 2)

	for (let i = 0; i < 3; i++) {
		let newValue = 0
		const outputIdx = idx + i
		const ix = (outputIdx) % rx
		const iy = Math.floor(outputIdx / rx)


		for (let x = 0; x < kernel.length; x++) {
			for (let y = 0; y < kernel.length; y++) {
				const current = kernel[y][x]
				const xOffset = (x - ml) * 4
				const yOffset = (y - ml)
				const inputIdx = ((ix + xOffset) + (yOffset + iy) * rx)
				if (ix + xOffset >= 0 && iy + yOffset >= 0)
					newValue += (input[inputIdx] ?? 0) * current
			}
		}

		output[outputIdx] = newValue
	}
}

export function gaussianBlur(resolution: XY, input: Uint8Array, output: Uint8Array, sigma: number) {
	const kernel = createBlurKernel(sigma)
	const ml = Math.floor(kernel.length / 2)
	const rx = resolution.x * 4

	for (let i = 0; i < input.length; i++) {
		// skip alpha channel
		if ((i + 1) % 4 == 0) {
			output[i] = input[i]
			continue
		}

		const ix = i % rx
		const iy = Math.floor(i / rx)

		let newValue = 0


		for (let x = 0; x < kernel.length; x++) {
			for (let y = 0; y < kernel.length; y++) {
				const current = kernel[y][x]
				const xOffset = (x - ml) * 4
				const yOffset = (y - ml)
				const idx = ((ix + xOffset) + (yOffset + iy) * rx)
				if (ix + xOffset >= 0 && iy + yOffset >= 0)
					newValue += (input[idx] ?? 0) * current
			}
		}

		output[i] = newValue
	}
}
