import * as assert from "assert"
import {  MSetiteration } from "../Source/mandelbrot"
import { createRandomFlames, createRandomFlamesComponents, createRandomVariations } from "../Source/Flames/Flames"

describe("Flames", function () {
	describe("Create random weighted variations", function () {
		it("check length", () => {
			const variations = createRandomVariations(3)
			assert.equal(variations.length === 3, true)
		})

		it("check weight", () => {
			const variations = createRandomVariations(3)

			const totalWeight = variations.reduce((acc, x) => x.weight + acc, 0,)
			assert.equal(totalWeight.toFixed(5), (1).toFixed(5))
		})
	})

	describe("Create random flames components", function () {
		it("check length", () => {
			const flamesParts = createRandomFlamesComponents(3)
			assert.equal(flamesParts.length === 3, true)
		})

		it("check variations length", () => {
			const flamesParts = createRandomFlamesComponents(1)
			assert.equal(flamesParts[0].variations.length === 2, true)
		})

		it("check weight", () => {
			const variations = createRandomFlamesComponents(5)

			const totalWeight = variations.reduce((acc, x) => x.weight + acc, 0,)
			assert.equal(totalWeight.toFixed(5), (1).toFixed(5))
		})
	})

	describe("Create random flames", function() {
		it("Expected amount of component", () => {
			const flames = createRandomFlames({x: 0, y: 0})
			assert.equal(flames.components.length === 2, true)
		})
	})
})
