import { Color, XYZ, c01 } from "./mathu"

// https://iquilezles.org/articles/palettes/
export type ColorPalette = {
    a: XYZ
    b: XYZ
    c: XYZ
    d: XYZ
}

// Default color palette collection, thse come from https://github.com/thi-ng/cgg
const rainbow1 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

const rainbow2 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.666, y: 0.666, z: 0.666 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

const rainbow3 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.750, y: 0.750, z: 0.750 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

const rainbow4 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 1.000, y: 1.000, z: 1.000 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

const blueCyan =
{
    a: { x: 0.000, y: 0.500, z: 0.500 },
    b: { x: 0.000, y: 0.500, z: 0.500 },
    c: { x: 0.000, y: 0.500, z: 0.333 },
    d: { x: 0.000, y: 0.500, z: 0.667 },
}

const greenCyan =
{
    a: { x: 0.000, y: 0.500, z: 0.500 },
    b: { x: 0.000, y: 0.500, z: 0.500 },
    c: { x: 0.000, y: 0.333, z: 0.500 },
    d: { x: 0.000, y: 0.667, z: 0.500 },
}

const greenMagenta =
{
    a: { x: 0.667, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.667, z: 0.500 },
    c: { x: 0.667, y: 0.666, z: 0.500 },
    d: { x: 0.200, y: 0.000, z: 0.500 },
}

const greenRed =
{
    a: { x: 0.500, y: 0.500, z: 0.000 },
    b: { x: 0.500, y: 0.500, z: 0.000 },
    c: { x: 0.500, y: 0.500, z: 0.000 },
    d: { x: 0.500, y: 0.000, z: 0.000 },
}

const orangeBlue =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 0.800, y: 0.800, z: 0.500 },
    d: { x: 0.000, y: 0.200, z: 0.500 },
}

const redBlue =
{
    a: { x: 0.500, y: 0.000, z: 0.500 },
    b: { x: 0.500, y: 0.000, z: 0.500 },
    c: { x: 0.500, y: 0.000, z: 0.500 },
    d: { x: 0.000, y: 0.000, z: 0.500 },
}

const yellowMagentaCyan =
{
    a: { x: 1.000, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 0.750, y: 1.000, z: 0.667 },
    d: { x: 0.800, y: 1.000, z: 0.333 },
}

const yellowRed =
{
    a: { x: 0.500, y: 0.500, z: 0.000 },
    b: { x: 0.500, y: 0.500, z: 0.000 },
    c: { x: 0.100, y: 0.500, z: 0.000 },
    d: { x: 0.000, y: 0.000, z: 0.000 },
}

const defaultPalettes: ColorPalette[] = [
    rainbow1,
    rainbow2,
    rainbow3,
    rainbow4,
    blueCyan,
    greenCyan,
    greenMagenta,
    greenRed,
    orangeBlue,
    redBlue,
    yellowMagentaCyan,
    yellowRed,
]

export const getRandomColorPalette = () => defaultPalettes[Math.floor(Math.random() * defaultPalettes.length)]

export function colorFromPalette(p: ColorPalette, t: number): Color {
	return {
	  r: c01(p.a.x+p.b.x*Math.cos(6.28318*(p.c.x*t+p.d.x))),
	  g: c01(p.a.y+p.b.y*Math.cos(6.28318*(p.c.y*t+p.d.y))),
	  b: c01(p.a.z+p.b.z*Math.cos(6.28318*(p.c.z*t+p.d.z))),
	}
}

export function defaultPalette(t: number): Color {
	const a: XYZ={x:0.158,y:0.248,z:0.788}
	const b: XYZ={x:0.898,y:0.758,z:0.498}
	const c: XYZ={x:0.468,y:-0.512,z:-0.512}
	const d: XYZ={x:-2.512,y:-1.482,z:0.500}
	return {
	  r: c01(a.x+b.x*Math.cos(6.28318*(c.x*t+d.x))),
	  g: c01(a.y+b.y*Math.cos(6.28318*(c.y*t+d.y))),
	  b: c01(a.z+b.z*Math.cos(6.28318*(c.z*t+d.z))),
	}
}
