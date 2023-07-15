import { IFSTransform, createTransform } from "./IFSTransform"
import { XY } from "./mathu"

const transformations: IFSTransform[] = [
	createTransform(0, 0, 0, 0.16, 0, 0, 0.01),
	createTransform(.20, -.26, 0.23, 0.22, 0, 1.6, 0.07),
	createTransform(-.15, .28, 0.26, 0.24, 0, .44, 0.07),
	createTransform(.85, .04, -.04, .85, 0, 1.6, 0.85),
]

export type Fern = {
	metadata: {
		transformations: IFSTransform[],
		resolution: XY
		iteration: number
		max: number
	},
	heatmap: number[][]
}

export function createFern(iteration: number, resolution: XY): Fern {
	const heatmap = [...Array(resolution.y)].map((_) => Array(resolution.x).fill(0))

	let x = 0
	let y = 0
	let max = 0

	for (let i = 0; i < iteration; i++) {
		const r = Math.random()
		let t : IFSTransform 

		let acc = 0
		for (let j = 0; j < transformations.length; j++) {
			acc += transformations[j].p
			if (acc >= r)
			{
				t = transformations[j]
				break
			}
		}

		const tmp = {
			x: t!.e + t!.a * x + t!.b * y,
			y: t!.f + t!.c * x + t!.d * y
		}

		x = tmp.x
		y = tmp.y

		if (i > 20) {
			const plotX = Math.floor(resolution.x * (x + 3) / 6)
			const plotY = Math.floor(resolution.y - resolution.y * ((y + 2) / 14))
			try {

				heatmap[plotY][plotX] += 1
				if (heatmap[plotY][plotX]> max) max = heatmap[plotY][plotX]
			} catch (e) {
				console.log(x, plotX, plotY)
			}
		}
	}

	return {
		metadata: {
			transformations,
			resolution,
			iteration,
			max
		},
		heatmap: heatmap
	}
}