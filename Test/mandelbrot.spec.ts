import * as assert from "assert"
import {  MSetiteration } from "../Source/mandelbrot"

describe("Mandelbrot", function () {
	describe("Iteration", function () {
		it("simple", () => {
			const z = {i: 2, r: 4.12}
			const c = {i: 132, r: 4.12}
			const res = MSetiteration(z, c)
			assert.equal(res.r, 17.0944)
			assert.equal(res.i, 148.48)
		})

		it("mid", () => {
			const z = {i: 2.23, r: 4.12}
			const c = {i: -1, r: .412}
			const res = MSetiteration(z, c)
			assert.equal(res.r, 12.4135)
			assert.equal(res.i, 17.3752)
		})

		it("complex", () => {
			const z = {i: 25.23, r: 4.23112}
			const c = {i: 231.23, r: 124.12}
			const res = MSetiteration(z, c)
			assert.equal(res.r,  -494.5305235456)
			assert.equal(res.i, 444.7323152)
		})
	})
})
