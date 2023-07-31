import { type Color, type XYZ, c01 } from "./mathu"

// https://iquilezles.org/articles/palettes/
export type ColorPalette = {
    a: XYZ
    b: XYZ
    c: XYZ
    d: XYZ
}

// Default color palette collection, thse come from https://github.com/thi-ng/cgg
export const rainbow1 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

export const rainbow2 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.666, y: 0.666, z: 0.666 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

export const rainbow3 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.750, y: 0.750, z: 0.750 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

export const rainbow4 =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 1.000, y: 1.000, z: 1.000 },
    c: { x: 1.000, y: 1.000, z: 1.000 },
    d: { x: 0.000, y: 0.333, z: 0.667 },
}

export const blueCyan =
{
    a: { x: 0.000, y: 0.500, z: 0.500 },
    b: { x: 0.000, y: 0.500, z: 0.500 },
    c: { x: 0.000, y: 0.500, z: 0.333 },
    d: { x: 0.000, y: 0.500, z: 0.667 },
}

export const greenCyan =
{
    a: { x: 0.000, y: 0.500, z: 0.500 },
    b: { x: 0.000, y: 0.500, z: 0.500 },
    c: { x: 0.000, y: 0.333, z: 0.500 },
    d: { x: 0.000, y: 0.667, z: 0.500 },
}

export const greenMagenta =
{
    a: { x: 0.667, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.667, z: 0.500 },
    c: { x: 0.667, y: 0.666, z: 0.500 },
    d: { x: 0.200, y: 0.000, z: 0.500 },
}

export const greenRed =
{
    a: { x: 0.500, y: 0.500, z: 0.000 },
    b: { x: 0.500, y: 0.500, z: 0.000 },
    c: { x: 0.500, y: 0.500, z: 0.000 },
    d: { x: 0.500, y: 0.000, z: 0.000 },
}

export const orangeBlue =
{
    a: { x: 0.500, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 0.800, y: 0.800, z: 0.500 },
    d: { x: 0.000, y: 0.200, z: 0.500 },
}

export const redBlue =
{
    a: { x: 0.500, y: 0.000, z: 0.500 },
    b: { x: 0.500, y: 0.000, z: 0.500 },
    c: { x: 0.500, y: 0.000, z: 0.500 },
    d: { x: 0.000, y: 0.000, z: 0.500 },
}

export const yellowMagentaCyan =
{
    a: { x: 1.000, y: 0.500, z: 0.500 },
    b: { x: 0.500, y: 0.500, z: 0.500 },
    c: { x: 0.750, y: 1.000, z: 0.667 },
    d: { x: 0.800, y: 1.000, z: 0.333 },
}

export const yellowRed =
{
    a: { x: 0.500, y: 0.500, z: 0.000 },
    b: { x: 0.500, y: 0.500, z: 0.000 },
    c: { x: 0.100, y: 0.500, z: 0.000 },
    d: { x: 0.000, y: 0.000, z: 0.000 },
}

export type NamedColorPalette = {
    palette: ColorPalette
    name: string
}

export const namedPalettesList: NamedColorPalette[] = [
    { name: "Rainbow 1", palette: rainbow1 },
    { name: "Rainbow 2", palette: rainbow2 },
    { name: "Rainbow 3", palette: rainbow3 },
    { name: "Rainbow 4", palette: rainbow4 },
    { name: "Blue-Cyan", palette: blueCyan },
    { name: "Green-Cyan", palette: greenCyan },
    { name: "Green-Magenta", palette: greenMagenta },
    { name: "Green-Red", palette: greenRed },
    { name: "Orange-Blue", palette: orangeBlue },
    { name: "Red-Blue", palette: redBlue },
    { name: "Yellow-Magenta-Cyan", palette: yellowMagentaCyan },
    { name: "Yellow-Red", palette: yellowRed },
]

export const getRandomColorPalette = () => namedPalettesList[Math.floor(Math.random() * namedPalettesList.length)].palette

export function colorFromPalette(p: ColorPalette, t: number): Color {
    return {
        r: c01(p.a.x + p.b.x * Math.cos(6.28318 * (p.c.x * t + p.d.x))),
        g: c01(p.a.y + p.b.y * Math.cos(6.28318 * (p.c.y * t + p.d.y))),
        b: c01(p.a.z + p.b.z * Math.cos(6.28318 * (p.c.z * t + p.d.z))),
    }
}

export function defaultPalette(t: number): Color {
    const a: XYZ = { x: 0.158, y: 0.248, z: 0.788 }
    const b: XYZ = { x: 0.898, y: 0.758, z: 0.498 }
    const c: XYZ = { x: 0.468, y: -0.512, z: -0.512 }
    const d: XYZ = { x: -2.512, y: -1.482, z: 0.500 }
    return {
        r: c01(a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x))),
        g: c01(a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y))),
        b: c01(a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z))),
    }
}
