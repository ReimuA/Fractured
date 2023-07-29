import assert from "assert"
import { rebalanceWeight } from "../Source/Flames/deviation"
import { createRandomFlames } from "../Source/Flames/random"

const simpleDeviationTest = (deviation: number) => {
    const flames = createRandomFlames({x: 1920, y: 1080})
        const cLenght = flames.components.length

        for (const c of flames.components)
            c.weight = 1 / cLenght

        rebalanceWeight(flames, 0, deviation)

        let sum = 0
        for (let i = 0; i < cLenght; i++) {
            const c = flames.components[i]

            sum += c.weight
            if (i == 0) 
                assert.equal(c.weight, 1 / cLenght + (deviation / 100))
            else
                assert.equal(c.weight, 1 / cLenght - (deviation / 100) / (cLenght - 1))
        }

        assert.equal(sum, 1)
}

describe("Flames deviation", function () {

	describe("Rebalancing weight", function() {
		it("simple", () => {
            simpleDeviationTest(1)
        })

        it("simple - negative", () => {
            simpleDeviationTest(-1)
        })
	})
})