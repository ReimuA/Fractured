import sharp from "sharp"
import { c01, smoothstep } from "./mathu"
import { Mandelbrot } from "./mandelbrot"

export async function exportToPng(mset: Mandelbrot) {
	const pixels = mset.image
	const resolution = mset.metadata.resolution
	const data = Array(resolution.x * resolution.y * 3)
	let dataIdx = 0

	for (let x = 0; x < pixels.length; x++) {
		for (let y = 0; y < pixels[x].length; y++) {
			const p = pixels[x][y]
			
			data[dataIdx++] = 255 * c01(p)
			data[dataIdx++] = 122 * c01(p)
			data[dataIdx++] = 133 * c01(p)
		}
	}
	const input = Uint8Array.from(data) 
	const image = sharp(input, {
		raw: {
			width: resolution.x,
			height: resolution.y,
			channels: 3,
		}
	})
	await image.toFile("mandelbrot.png")
}
