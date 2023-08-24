import * as assert from "assert"
import { createBlurKernel, gaussianBlur, localBlur } from "../Source/blur"

describe("Blur", function () {

	describe("Gaussian blur kernel", function () {
		it("simple kernel size", () => {
			const a = createBlurKernel(1)
			const b = createBlurKernel(2)
			const c = createBlurKernel(3)

			for (const kernel of [a, b, c]) {
				assert.equal(kernel.length, kernel[0].length)
				assert.default(kernel.length % 2 + 1)
			}
		})
	})

	describe("Local blur", function () {
		it("Simple blur filter - buffer size identical to kernel", () => {
			const kernel = createBlurKernel(1)
			const l = kernel.length * kernel.length * 4
			const input = new Uint8Array(l)
			const output = new Uint8Array(l)
			
			input[16] = 255
			input[17] = 255
			input[18] = 255

			const resolution = { x: kernel.length, y: kernel.length }
			
			for (let i = 0; i < l; i+=4)
				localBlur(i, resolution, input, output, 1)

			for (let i = 0; i < kernel.length; i++) {
				for (let j = 0; j < kernel[i].length; j++) {
					const idx = ((i * kernel.length) + j) * 4
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx])
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx + 1])
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx + 2])
				}
			}

		})
	})

	describe("Gaussian blur", function () {
		it("Simple gaussian filter - buffer size identical to kernel", () => {
			const kernel = createBlurKernel(1)
			const l = kernel.length * kernel.length * 4
			const input = new Uint8Array(l)
			const output = new Uint8Array(l)
			
			input[16] = 255
			input[17] = 255
			input[18] = 255

			const resolution = { x: kernel.length, y: kernel.length }
			gaussianBlur(resolution, input, output, 1)

			for (let i = 0; i < kernel.length; i++) {
				for (let j = 0; j < kernel[i].length; j++) {
					const idx = ((i * kernel.length) + j) * 4
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx])
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx + 1])
					assert.equal(Math.floor(kernel[i][j] * 255), output[idx + 2])
				}
			}

		})
	})
})
