import sharp from "sharp"
import type { XY } from "../Source/mathu"
import { createBlurKernel, gaussianBlur } from "../Source/blur"

async function blur(path: string) {
	const buffer = await sharp(path).raw().toBuffer()
	const output = new Uint8Array(buffer.length)

	console.log(createBlurKernel(3).map(e => e.map(e => e.toFixed(4)).join(", ")))
	gaussianBlur({x: 1920, y: 1080}, buffer, output, 3)

	await sharp(output, {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile("ouh.png")
}

blur(process.argv[2])
