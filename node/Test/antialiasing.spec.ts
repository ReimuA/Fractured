import * as assert from "assert"
import { applyAA, superSampleResolution } from "../Source/antialiasing"

describe("Anti aliasing", function () {

	describe("Super sampled resolution", function() {
		it("expect a 9 higher resolution, as a", () => {
			const res = {x: 10, y: 10}
			const aaRes = superSampleResolution(res)
			assert.notEqual(res.x, aaRes.x)
			assert.notEqual(res.y, aaRes.y)
			assert.equal(20, aaRes.y)
			assert.equal(20, aaRes.x)
		})
	})

	describe("Downsampling", function() {
		it("expect new sample to be scaled down", () => {
			const supersample =  Uint16Array.from(Array.from(Array(2 * 4 * 4).keys()))

			const downsample = applyAA({x: 2, y: 2}, supersample)
			assert.equal(downsample.length, 4 * 4)
		})

		it("expect new sample to aggregate pixel 1x1", () => {
			const supersample = Uint16Array.from(Array.from(Array(1 * 1 * 4 * 2 * 2).keys()))

			const downsample = applyAA({x: 1, y: 1}, supersample)

			assert.equal(downsample.length, 4)

			const r = downsample[0]
			const g = downsample[1]
			const b = downsample[2]
			const a = downsample[3]

			assert.equal(r, (0 + 4 + 8 + 12) / 4)
			assert.equal(g, (1 + 5 + 9 + 13) / 4)
			assert.equal(b, (2 + 6 + 10 + 14) / 4)
			assert.equal(a, (3 + 7 + 11 + 15) / 4)
		})

		it("expect new sample to aggregate pixel 2x2", () => {
			const supersample = Uint16Array.from(Array.from(Array(2 * 2 * 4 * 2 * 2).keys()))

			const downsample = applyAA({x: 2, y: 2}, supersample)

			assert.equal(downsample.length, 16)

			const p1 = {r: downsample[0], g: downsample[1], b: downsample[2], a: downsample[3]}
			const p2 = {r: downsample[4], g: downsample[5], b: downsample[6], a: downsample[7]}
			const p3 = {r: downsample[8], g: downsample[9], b: downsample[10], a: downsample[11]}
			const p4 = {r: downsample[12], g: downsample[13], b: downsample[14], a: downsample[15]}

			assert.equal(p1.r, (0 + 4 + 16 + 20) / 4)
			assert.equal(p1.g, (1 + 5 + 17 + 21) / 4)
			assert.equal(p1.b, (2 + 6 + 18 + 22) / 4)
			assert.equal(p1.a, (3 + 7 + 19 + 23) / 4)

			assert.equal(p2.r, (8 + 12 + 24 + 28) / 4)
			assert.equal(p2.g, (9 + 13 + 25 + 29) / 4)
			assert.equal(p2.b, (10 + 14 + 26 + 30) / 4)
			assert.equal(p2.a, (11 + 15 + 27 + 31) / 4)

			assert.equal(p3.r, (32 + 36 + 48 + 52) / 4)
			assert.equal(p3.g, (33 + 37 + 49 + 53) / 4)
			assert.equal(p3.b, (34 + 38 + 50 + 54) / 4)
			assert.equal(p3.a, (35 + 39 + 51 + 55) / 4)

			assert.equal(p4.r, (40 + 44 + 56 + 60) / 4)
			assert.equal(p4.g, (41 + 45 + 57 + 61) / 4)
			assert.equal(p4.b, (42 + 46 + 58 + 62) / 4)
			assert.equal(p4.a, (43 + 47 + 59 + 63) / 4)
		})
	})
})
