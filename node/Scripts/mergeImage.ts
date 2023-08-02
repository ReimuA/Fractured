import sharp from "sharp"
import { clamp } from "../Source/mathu"
import { argv, exit } from "process"

async function mergeImage(pathA: string, pathB: string, outfile: string) {
	console.log(pathA, pathB)

	const a = await sharp(pathA).raw().toBuffer()
	const b = await sharp(pathB).raw().toBuffer()

	const newBuffer = new Uint8Array(a.length)

	for (let i = 0; i < a.length; i++) {
		if ((i + 1) % 4 != 0)
			newBuffer[i] = clamp(0, 255, (a[i] + b[i] / 4))
		else
			newBuffer[i] =a[i]
	}
	
	await sharp(newBuffer, {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile(outfile)
}

if (argv.length != 5) {
	console.error("usage: ./mergeImage.ts 1.png 2.png out.png")
	exit(1)
}

mergeImage(process.argv[2], process.argv[3], process.argv[4])