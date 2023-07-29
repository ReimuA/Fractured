import { argv, exit } from "process"
import sharp from "sharp"

async function gaussianBlur(path: string, coef: number) {
	await sharp(path)
		.blur(coef)
		.toFile(path.replace(".png", ".blur.png"))

}


if (argv.length != 4) {
	console.error("usage: ./mergeImage.ts 1.png coef")
	exit(1)
}


gaussianBlur(argv[2], parseInt(argv[3]))