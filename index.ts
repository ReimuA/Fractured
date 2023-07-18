import { createFlameImage, createFlamesFromFile, createRandomFlamesImages, readFlamesMetadataFromFiles } from "./Source/Flames/Flames"
import { deviate } from "./Source/Flames/deviation"

console.log("OUH")

function ouhouh(i: number) {
	const s = `${i}`
	const pad = "0".repeat(3 - s.length)
	return pad + s
}

async function main() {
	const flames = readFlamesMetadataFromFiles("output/nice.metadata.json")
	for (let i = 0; i < 1; i++) {
		await createFlameImage({x: 1920, y: 1080}, flames, "output/aaa.png")
		deviate(flames)
	}
}

main()
