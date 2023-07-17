import { exit } from "process"
import { IFSTransform, createTransform } from "./IFSTransform"
import { XY, dot, xyLength } from "./mathu"

const fernTransformation: IFSTransform[] = [
	createTransform(0, 0, 0, 0.16, 0, 0, 0.01),
	createTransform(0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07),
	createTransform(-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07),
	createTransform(0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85),
]

const transformations: IFSTransform[] = [
	createTransform(0.522931, 0.172836, -0.542303, 0.761167, 0, 0, 0.256101379350814),
	createTransform(-0.476301, -0.628528, 0.318007, 0.28226, 0, 0, 0.362035031296991),
	createTransform(0.49786, -0.252233, 0.040673, 0.873673, -1.086201, -1.50446, 0.381863589352195),
]

export type HeatMapCell = {
	total: number
	byFunction: number[]
}

export type Fern = {
	metadata: {
		transformations: IFSTransform[]
		resolution: XY
		iteration: number
		max: number
	}
	heatmap: HeatMapCell[][]
}

function applyAffineTransform(p: XY, t: IFSTransform): XY {
	return {
		x: t.c + t.a * p.x + t.b * p.y,
		y: t.f + t.d * p.x + t.e * p.y,
	}
}

function applynonLinearTransform(p: XY): XY {
	return {
		x: Math.sin(p.x),
		y: Math.sin(p.y),
	}
}

function unwrapCoordinates(p: XY, resolution: XY): XY {
	return {
		x: Math.floor((resolution.x * (p.x + 1)) / 2),
		y: Math.floor(resolution.y * ((p.y + 1) / 2)),
	}
}

let maxy: number | undefined
let miny: number | undefined
let minx: number | undefined
let maxx: number | undefined

function updateHeatmapAndMetadata(fern: Fern, p: XY, functionId: number) {


	if (maxx === undefined ||maxx < p.x) maxx = p.x
	if (maxy === undefined ||maxy < p.x) maxy = p.y
	if (minx === undefined ||minx > p.x) minx = p.x
	if (miny === undefined ||miny > p.x) miny = p.y
	const plot = unwrapCoordinates(p, fern.metadata.resolution)


	if (plot.x < 0 || plot.x >= fern.metadata.resolution.x || plot.y < 0 || plot.y >= fern.metadata.resolution.y) return

	try {
		fern.heatmap[plot.y][plot.x].total++
		fern.heatmap[plot.y][plot.x].byFunction[functionId]++
		if (fern.heatmap[plot.y][plot.x].total > fern.metadata.max) fern.metadata.max = fern.heatmap[plot.y][plot.x].total
	} catch (e) {
		console.log(p.x, plot.x, plot.y)
		exit()
	}
}

function createHeatmap(resolution: XY): HeatMapCell[][] {
	return [...Array(resolution.y)].map(() =>
		Array.from({ length: resolution.x }, () => {
			return { total: 0, byFunction: new Array<number>(transformations.length).fill(0) }
		})
	)
}

function randomTransform(list: IFSTransform[]) {
	const ad: number = list[0].p
	const bd: number = list[1].p
	const cd: number = list[2].p
	//const dd: number = list[3].p
	const wa: number = ad / (ad + bd + cd /* + dd */)
	const wb: number = (ad + bd) / (ad + bd + cd /* + dd */)
	const wc: number = (ad + bd + cd) / (ad + bd + cd /* + dd */)

	const r = Math.random()
	if (r < wa) return list[0]
	else if (r < wb) return list[1]
	//else if (r < wc) return list[2]
	return list[2]
}

export function createFern(iteration: number, resolution: XY): Fern {
	const heatmap = createHeatmap(resolution)
	const fern = {
		metadata: {
			transformations,
			resolution,
			iteration,
			max: 0,
		},
		heatmap: heatmap,
	}

	let p: XY = { x: 0, y: 0 }

	for (let i = 0; i < iteration; i++) {
		const t: IFSTransform = randomTransform(transformations)

		p = applyAffineTransform(p, t)
		p = applynonLinearTransform(p)
		if (i > 20) updateHeatmapAndMetadata(fern, p, transformations.indexOf(t))
	}
	console.log(maxx, minx, maxy, miny)


	return fern
}
