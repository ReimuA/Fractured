import { exit } from "process"
import { IFSTransform, contraction, correctTransformation, createTransform } from "./IFSTransform"
import { Color, Vec3, XY, c01, dot, xyLength } from "./mathu"

const ferns: IFSTransform[] = [
	createTransform(0, 0, 0, 0.16, 0, 0, 0.1),
	createTransform(0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.25),
	createTransform(-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.25),
	createTransform(0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.5),
]

const transform: IFSTransform[] = [
	createTransform(0.1, 0.4, 0.1, 0.16, 0.2, 0.52, 0.25),
	createTransform(0.2, -0.26, 0.23, 0.22, 0.12, 1.6, 0.25),
	createTransform(-0.15, 0.28, 0.26, 0.24, 0.12, 0.44, 0.25),
	createTransform(0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.25),
]

const ttt: IFSTransform[] = [
	correctTransformation(
		createTransform(
			Math.cos(1 * 1.71 + 0.18),
			Math.cos(1 * 1.11 + 5.31),
			Math.cos(1 * 1.31 + 3.18),
			Math.cos(1 * 1.44 + 4.21),
			Math.cos(-1 * 2.13 + 0.94),
			Math.cos(-1 * 1.19 + 0.29),
			0.25
		)
	),

	correctTransformation(
		createTransform(
			Math.cos(-1 * 2.57 + 1.66),
			Math.cos(1 * 1.08 + 0.74),
			Math.cos(1 * 1.31 + 4.51),
			Math.cos(1 * 1.23 + 1.29),
			Math.cos(1 * 1.09 + 5.25),
			Math.cos(1 * 1.27 + 1.77),
			0.25
		)
	),

	correctTransformation(
		createTransform(
			Math.cos(1 * 1.75 + 0.33),
			Math.cos(1 * 1.74 + 5.12),
			Math.cos(1 * 2.94 + 1.92),
			Math.cos(1 * 2.58 + 2.36),
			Math.cos(1 * 2.76 + 2.39),
			Math.cos(1 * 2.35 + 2.04),
			0.25
		)
	),

	correctTransformation(
		createTransform(
			Math.cos(1 * 1.42 + 4.89),
			Math.cos(1 * 1.14 + 1.94),
			Math.cos(1 * 2.73 + 6.34),
			Math.cos(-1 * 1.21 + 4.84),
			Math.cos(-1 * 1.42 + 4.71),
			Math.cos(1 * 2.81 + 3.51),
			0.25
		)
	),
]

export type Fern = {
	metadata: {
		transformations: IFSTransform[]
		resolution: XY
		iteration: number
		max: number
	}
	heatmap: number[][]
	colormap: Color[][]
}

function randomTransform(list: IFSTransform[]) {
	const ad: number = list[0].p
	const bd: number = list[1].p
	const cd: number = list[2].p
	const dd: number = list[3].p
	const wa: number = ad / (ad+bd + cd + dd)
	const wb: number = (ad+bd) / (ad+bd + cd + dd)
	const wc: number = (ad+bd + cd) / (ad+bd + cd + dd)
	const wd: number = (ad+bd + cd+dd) / (ad+bd + cd + dd)

	const r = Math.random()
	if (r < wa) return list[0]
	else if (r < wb) return list[1]
	else if (r < wc) return list[2]
	return list[3]
}

function applyAffineTransform(p: XY, t: IFSTransform): XY {
	return {
		x: t.e + t.a * p.x + t.b * p.y,
		y: t.f + t.c * p.x + t.d * p.y,
	}
}

function applynonLinearTransform(p: XY): XY {
	const phi = xyLength(p) *0.25
	const c = Math.cos(phi)
	const s = Math.sin(phi)
	return {
		x: (p.x * c - p.y * s  * 2.) * (p.x / dot(p, p)),
		y: (p.x * s + p.y * c  * 2.) * (p.y / dot(p, p)),
	}
}

function createIFS(t: number | null): IFSTransform[] {
	t ??= 1
	return [
		correctTransformation(
			createTransform(
				Math.cos(t + 0.8682082221967002),
				Math.cos(t + 3.1170088067597757),
				Math.cos(t + -0.3390820624223352),
				Math.cos(t + 2.3109472064373193),
				Math.cos(t + -1.22147013282684),
				Math.cos(t + -2.9704284345348424),
				0.25
			)
		),

		correctTransformation(
			createTransform(
				Math.cos(t + -0.42381063819496534),
				Math.cos(t + 1.7528411856136747),
				Math.cos(t + -0.15681125955518427),
				Math.cos(t + -1.9259129610286294),
				Math.cos(t + 1.132579087671262),
				Math.cos(t + -0.353919650584706),
				0.25
			)
		),
		correctTransformation(
			createTransform(
				Math.cos(t + -0.3037296363035389),
				Math.cos(t + -0.46923158137125975),
				Math.cos(t + 0.32856805805707534),
				Math.cos(t + -2.538448726406509),
				Math.cos(t + -2.0971938511530173),
				Math.cos(t + -1.188918753092107),
				0.25
			)
		),

		correctTransformation(
			createTransform(
				Math.cos(t + 0.2951706722135672),
				Math.cos(t + 2.4283600333080457),
				Math.cos(t + -2.1773246848991614),
				Math.cos(t + -2.8854529789890098),
				Math.cos(t + -0.4201702060112109),
				Math.cos(t + -2.719100261792061),
				0.25
			)
		),
	]
}

function setPoint(colormap: (Color & { c: number })[][], colorAccumulator: number, p: XY, resolution: XY) {
	const plotX = Math.floor((resolution.x * (p.x + 3)) / 6)
	const plotY = Math.floor(resolution.y - resolution.y * ((p.y + 2) / 14)) - 1800

	if (plotX < 0 || plotX >= resolution.x || plotY < 0 || plotY >= resolution.y) return

	try {
		//heatmap[plotY][plotX] += 1
		//if (heatmap[plotY][plotX] > max) max = heatmap[plotY][plotX]

		const color: Color = {
			r: 0.5 + 0.5 * Math.sin(1.5 * colorAccumulator + 5.5),
			g: 0.1 + 0.5 * Math.sin(0.5 * colorAccumulator + 4.0),
			b: 0.5 + 0.5 * Math.sin(2.5 * colorAccumulator + 6.0),
		}

		color.r = c01(color.r)
		color.g = c01(color.g)
		color.b = c01(color.b)

		colormap[plotY][plotX].r += color.r
		colormap[plotY][plotX].g += color.g
		colormap[plotY][plotX].b += color.b
		colormap[plotY][plotX].c++
	} catch (e) {
		console.log(p.x, plotX, plotY)
		exit()
	}
}

function colorNormalization(colormap: (Color & { c: number })[][]) {
	console.log("Color normalization")
	for (let j = 0; j < colormap.length; j++) {
		for (let i = 0; i < colormap[j].length; i++) {
			const c = colormap[j][i]

			if (c.c != 1) {
				c.r = c.r / 1
				c.g = c.g / 1
				c.b = c.b / 1
			}
		}
	}
}

export function processIfs(iteration: number, resolution: XY, delta: number | null = null): Fern {
	const heatmap = [...Array(resolution.y)].map((_) => Array(resolution.x).fill(0))
	const colormap = [...Array(resolution.y)].map((_) =>
		Array.from({ length: resolution.x }, (_) => {
			return { r: 0, g: 0, b: 0, c: 1 }
		})
	)

	let p: XY = { x: 0, y: 0 }
	const max = 0
	let colorAccumulator = 0

	const transforms = ttt

	for (let i = 0; i < iteration; i++) {
		const t: IFSTransform = randomTransform(transforms)
		const contract = contraction(t)

		p = {x: p.x * contract, y: contract}

		colorAccumulator *= 0.25
		colorAccumulator += transforms.indexOf(t) * 0.25

		p = applyAffineTransform(p, t)
		// p = applynonLinearTransform(p)

		if (isNaN(p.x)) console.log("what?")
		if (i > 20) setPoint(colormap, colorAccumulator, p, resolution)

		if (((i / iteration) * 100) % 2 == 0) console.log((i / iteration) * 100 + " %")
	}

	// Normalization of color
	//colorNormalization(colormap)
	return {
		metadata: {
			transformations: transforms,
			resolution,
			iteration,
			max,
		},
		heatmap: heatmap,
		colormap,
	}
}
