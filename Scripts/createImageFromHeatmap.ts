import { readFileSync } from "fs"
import sharp from "sharp"
import { applyAA } from "../Source/antialiasing"
import { createFlamesPixelBufferFromDensity } from "../Source/Flames/image"

async function createImageFromHeatmap(heatmapPath: string) {
	const rawHeatmap = readFileSync(heatmapPath)
	const heatmap = JSON.parse(rawHeatmap.toString())

	const buffer = createFlamesPixelBufferFromDensity({x: 1920 * 2, y: 1080 * 2}, heatmap, 10)

	await sharp(applyAA({x: 1920, y: 1080}, buffer), {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile("res.png")
}

createImageFromHeatmap(process.argv[2])