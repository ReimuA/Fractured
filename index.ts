import { readFlamesMetadataFromFiles } from "./Source/Flames/Flames"
import { deviate } from "./Source/Flames/deviation"
import { createFlameImage } from "./Source/Flames/image"

async function main(i: number) {

	const flames = readFlamesMetadataFromFiles("output/random-1689876055693.metadata.json")
	deviate(flames, i / 120)
	await createFlameImage({x: 1920, y: 1080}, flames, "video/"+process.argv[2]+".png")
}

const i = parseInt(process.argv[2])
main(i)
