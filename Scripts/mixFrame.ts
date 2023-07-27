import sharp from "sharp"

async function mixFrame(idx: number) {
	const a = await sharp("video/" + idx + ".png").raw().toBuffer()
	const b = await sharp("video/" + (idx + 1) + ".png").raw().toBuffer()

	const newBuffer = new Uint8Array(a.length)

	for (let i = 0; i < a.length; i++)
		newBuffer[i] =(a[i] + b[i]) / 2


	await sharp(newBuffer, {
		raw: {
			width: 1920,
			height: 1080,
			channels: 4,
		},
	}).toFile((idx+1)+".png")
}


const idx = parseInt(process.argv[2]) 
mixFrame(idx)