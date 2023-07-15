import { Complex, cLength, cPow } from "./complex"
import { XY } from "./mathu"

export function MSetiteration(z: Complex, c: Complex): Complex {
	const n = cPow({i: z.i, r: z.r})
	n.i += c.i
	n.r += c.r
	return n
}


export type Mandelbrot = {
	metadata: {
		zoom: number
		iteration: number
		location: XY
		resolution: XY
	}
	image: number[][]
}


export function createMSet(iteration: number, resolution: XY, location: XY, zoom: number): Mandelbrot {
	const metadata = {iteration, resolution, location, zoom}
	const image = [...Array(resolution.y)].map((_) => Array(resolution.x).fill(0))
	image.forEach(x => x.fill(0))

	for (let x = 0; x <resolution.x; x ++)
	{
		for (let y = 0; y <resolution.y; y ++) {
			const st: XY = {
				x: (2* x - resolution.x) / resolution.y,
				y: (2* y - resolution.y) / resolution.y
			}

			st.x *= 1 / zoom
			st.y *= 1 / zoom
			
			st.x += location.x
			st.y += location.y
			
			const uv=st

			let z = {r: 0, i: 0}
			const c = {r: uv.x, i: uv.y}

			for (let k = 0; k < iteration; k++) {
				z = MSetiteration(z, c)
				if (cLength(z) > 2)
				{
					try {
						
						image[y][x] = k 
						image[y][x] = k 
					} catch (e)  {
						console.log(e)
					}
					break
				}
			}
		}
	}

	return {
		metadata,
		image
	}
}

