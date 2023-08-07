import * as assert from "assert"
import { applyAA, applyAA3x, superSampleResolution } from "../Source/antialiasing"

describe("Anti aliasing", function () {

	describe("Super sampled resolution", function() {
		it("expect a 2x higher resolution, as a", () => {
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

		it("AA 3x single pixel", () => {
			const supersample = Uint16Array.from(Array.from(Array(3 * 3 * 4).keys()))

			const downsample = applyAA3x({x: 1, y: 1}, supersample)

			assert.equal(downsample.length, 4)

			const p1 = {r: downsample[0], g: downsample[1], b: downsample[2], a: downsample[3]}

			assert.equal(p1.r, (0 + 4 + 8 + 12 + 16 + 20 + 24 + 28 + 32) / 9)
			assert.equal(p1.g, (1 + 5 + 9 + 13 + 17 + 21 + 25 + 29 + 33) / 9)
			assert.equal(p1.b, (2 + 6 + 10 + 14 + 18 + 22 + 26 + 30 + 34) / 9)
			assert.equal(p1.a, (3 + 7 + 11 + 15 + 19 + 23 + 27 + 31 + 35) / 9)
		})

		it("AA3x 2x2", () => {
			const supersample = Uint16Array.from(Array.from(Array(3 * 3 * 4 * 4).keys()))

			const downsample = applyAA3x({x: 2, y: 2}, supersample)

			assert.equal(downsample.length, 16)

			const p1 = {r: downsample[0], g: downsample[1], b: downsample[2], a: downsample[3]}
			const p2 = {r: downsample[4], g: downsample[5], b: downsample[6], a: downsample[7]}
			const p3 = {r: downsample[8], g: downsample[9], b: downsample[10], a: downsample[11]}
			const p4 = {r: downsample[12], g: downsample[13], b: downsample[14], a: downsample[15]}

			assert.equal(p1.r, (0 + 4 + 8 + 24 + 28 + 32 + 48 + 52 + 56) / 9)
			assert.equal(p1.g, (1 + 5 + 9 + 25 + 29 + 33 + 49 + 53 + 57) / 9)
			assert.equal(p1.b, (2 + 6 + 10 + 26 + 30 + 34 + 50 + 54 + 58) / 9)
			assert.equal(p1.a, (3 + 7 + 11 + 27 + 31 + 35 + 51 + 55 + 59) / 9)

			assert.equal(p2.r, (12 + 16 + 20 + 36 + 40 + 44 + 60 + 64 + 68) / 9)
			assert.equal(p2.g, (13 + 17 + 21 + 37 + 41 + 45 + 61 + 65 + 69) / 9)
			assert.equal(p2.b, (14 + 18 + 22 + 38 + 42 + 46 + 62 + 66 + 70) / 9)
			assert.equal(p2.a, (15 + 19 + 23 + 39 + 43 + 47 + 63 + 67 + 71) / 9)

			assert.equal(p3.r, (72 + 76 + 80 + 96 + 100 + 104 + 120 + 124 + 128) / 9)
			assert.equal(p3.g, (73 + 77 + 81 + 97 + 101 + 105 + 121 + 125 + 129) / 9)
			assert.equal(p3.b, (74 + 78 + 82 + 98 + 102 + 106 + 122 + 126 + 130) / 9)
			assert.equal(p3.a, (75 + 79 + 83 + 99 + 103 + 107 + 123 + 127 + 131) / 9)

			assert.equal(p4.r, (84 + 88 + 92 + 108 + 112 + 116 + 132 + 136 + 140) / 9)
			assert.equal(p4.g, (85 + 89 + 93 + 109 + 113 + 117 + 133 + 137 + 141) / 9)
			assert.equal(p4.b, (86 + 90 + 94 + 110 + 114 + 118 + 134 + 138 + 142) / 9)
			assert.equal(p4.a, (87 + 91 + 95 + 111 + 115 + 119 + 135 + 139 + 143) / 9)
		})
	})
})
