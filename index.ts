import { readFlamesMetadataFromFiles } from "./Source/Flames/Flames"
import { deviate } from "./Source/Flames/deviation"
import { createFlameImage, createRandomFlamesImages } from "./Source/Flames/image"

async function main(i: number) {

	// const flames = readFlamesMetadataFromFiles("./output/random-1689975708749.metadata.json")
	// deviate(flames, i / 120)
	// await createFlameImage({x: 1920, y: 1080}, flames, "yoplo3.png", true, true) 
	await createRandomFlamesImages({x: 1920, y: 1080})
}

const i = parseInt(process.argv[2])
main(i)
