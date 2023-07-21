import sharp from "sharp"

async function gaussianBlur(path: string) {
	await sharp(path)
		.blur(1)
		.toFile(path.replace(".png", ".blur.png"))

}

gaussianBlur(process.argv[2])