import { readFileSync } from "fs"
import sharp from "sharp"
import { applyAA } from "../Source/antialiasing"
import { createFlamesPixelBufferFromDensity } from "../Source/Flames/image"
import { argv, exit } from "process"
import { parseArgs } from "util"
import { getRandomColorPalette } from "../Source/palette"

async function createImageFromHeatmap(heatmapPath: string, outfile: string) {
	const rawHeatmap = readFileSync(heatmapPath)
	const heatmap = JSON.parse(rawHeatmap.toString())
	const palette = getRandomColorPalette()


	const buffer = createFlamesPixelBufferFromDensity({x: 1920 * 2, y: 1080 * 2}, heatmap, palette, .5)

	await sharp(applyAA({x: 1920, y: 1080}, buffer), {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile(outfile)
}

async function createImageFromHeatmapBatch(batchsize: number, heatmapPath: string, outfile: string) {
	for (let i = 0; i < batchsize; i++){
        let currentInput = input.replace("%d", `${i}`)
        let currentOutput = output.replace("%d", `${i}`)
		await createImageFromHeatmap(currentInput, currentOutput)
		console.log(`${i} / ${batchsize} done.`)
    } 
}

const options: {[longOption: string]: any} = {
    "batch": { type: 'string', short: "b" },
    "input": { type: 'string', short: "i" },
    "output": { type: 'string', short: "o" },
}

const args = parseArgs({options: options})

if (args.values.input === undefined || args.values.output === undefined) {
        console.log("usage : " + JSON.stringify(options, null, 4))
        exit(1)
}

const input = args.values.input as string
const output = args.values.output as string

if (args.values.batch === undefined)
	createImageFromHeatmap(input, output)
else {
	const batch = parseInt(args.values.batch as string)
	createImageFromHeatmapBatch(batch, input, output)
}