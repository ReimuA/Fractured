import sharp from "sharp"

async function mergeImage(pathA: string, pathB: string) {
	console.log(pathA, pathB)

	const a = await sharp(pathA).raw().toBuffer()
	const b = await sharp(pathB).raw().toBuffer()

	const newBuffer = new Uint8Array(a.length)

	for (let i = 0; i < a.length; i++) {
		if ((i + 1) % 4 != 0)
			newBuffer[i] = (a[i] + b[i] / 2)
		else
			newBuffer[i] =a[i]
	}
	await sharp(newBuffer, {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile("res.png")

}

mergeImage(process.argv[2], process.argv[3])