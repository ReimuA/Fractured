import { writeFileSync } from "fs"
import { createFlameImage, createFlamesFromFile, createFlamesPixelBuffer, createRandomFlamesImages, readFlamesMetadataFromFiles } from "./Source/Flames/Flames"
import { deviate } from "./Source/Flames/deviation"
import { mix } from "./Source/mathu"
import sharp from "sharp"

console.log("OUH")

function ouhouh(i: number) {
	const s = `${i}`
	const pad = "0".repeat(3 - s.length)
	return pad + s
}

async function main() {
	const flames = readFlamesMetadataFromFiles("output/random-1689789473202.metadata.json")
	let pixels: Uint16Array|undefined
	for (let i = 0; i < 360; i++) {
		const newPixels = createFlamesPixelBuffer({x: 1920, y: 1080}, flames, true)

		if (pixels == undefined)
			pixels = newPixels
		else
		{
			for (let j = 0; j < pixels.length; j++)
				pixels[j] = mix(pixels[j], newPixels[j], 0.5)
		}

		const img = sharp(pixels, {
			raw: {
				width: 1920,
				height: 1080,
				channels: 4,
			},
		})


		await img.toFile("video/"+i+".png")
		await img.blur(100).toFile("video/"+i+"blurred.png")

		deviate(flames, 1 / 120)
		console.log(i)
	}
}

main()
