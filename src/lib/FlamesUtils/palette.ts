import { type Color, type XYZ, c01 } from './mathu';

// https://iquilezles.org/articles/palettes/
export type ColorPalette = {
	a: XYZ;
	b: XYZ;
	c: XYZ;
	d: XYZ;
};

// Default color palette collection, thse come from https://github.com/thi-ng/cgg
export const rainbow = {
	a: { x: 0.5, y: 0.5, z: 0.5 },
	b: { x: 0.5, y: 0.5, z: 0.5 },
	c: { x: 1.0, y: 1.0, z: 1.0 },
	d: { x: 0.0, y: 0.333, z: 0.667 }
};

export const rainbow4 = {
	a: { x: 0.5, y: 0.5, z: 0.5 },
	b: { x: 1.0, y: 1.0, z: 1.0 },
	c: { x: 1.0, y: 1.0, z: 1.0 },
	d: { x: 0.0, y: 0.333, z: 0.667 }
};

export const blueCyan = {
	a: { x: 0.0, y: 0.5, z: 0.5 },
	b: { x: 0.0, y: 0.5, z: 0.5 },
	c: { x: 0.0, y: 0.5, z: 0.333 },
	d: { x: 0.0, y: 0.5, z: 0.667 }
};

export const greenCyan = {
	a: { x: 0.0, y: 0.5, z: 0.5 },
	b: { x: 0.0, y: 0.5, z: 0.5 },
	c: { x: 0.0, y: 0.333, z: 0.5 },
	d: { x: 0.0, y: 0.667, z: 0.5 }
};

export const greenMagenta = {
	a: { x: 0.667, y: 0.5, z: 0.5 },
	b: { x: 0.5, y: 0.667, z: 0.5 },
	c: { x: 0.667, y: 0.666, z: 0.5 },
	d: { x: 0.2, y: 0.0, z: 0.5 }
};

export const greenRed = {
	a: { x: 0.5, y: 0.5, z: 0.0 },
	b: { x: 0.5, y: 0.5, z: 0.0 },
	c: { x: 0.5, y: 0.5, z: 0.0 },
	d: { x: 0.5, y: 0.0, z: 0.0 }
};

export const orangeBlue = {
	a: { x: 0.5, y: 0.5, z: 0.5 },
	b: { x: 0.5, y: 0.5, z: 0.5 },
	c: { x: 0.8, y: 0.8, z: 0.5 },
	d: { x: 0.0, y: 0.2, z: 0.5 }
};

export const redBlue = {
	a: { x: 0.5, y: 0.0, z: 0.5 },
	b: { x: 0.5, y: 0.0, z: 0.5 },
	c: { x: 0.5, y: 0.0, z: 0.5 },
	d: { x: 0.0, y: 0.0, z: 0.5 }
};

export const yellowMagentaCyan = {
	a: { x: 1.0, y: 0.5, z: 0.5 },
	b: { x: 0.5, y: 0.5, z: 0.5 },
	c: { x: 0.75, y: 1.0, z: 0.667 },
	d: { x: 0.8, y: 1.0, z: 0.333 }
};

export const yellowRed = {
	a: { x: 0.5, y: 0.5, z: 0.0 },
	b: { x: 0.5, y: 0.5, z: 0.0 },
	c: { x: 0.1, y: 0.5, z: 0.0 },
	d: { x: 0.0, y: 0.0, z: 0.0 }
};

export const blueMagenta = {
	a: { x: 0.5, y: 0.0, z: 0.5 },
	b: { x: 0.5, y: 0.0, z: 0.5 },
	c: { x: 0.5, y: 0.0, z: 0.333 },
	d: { x: 0.5, y: 0.0, z: 0.667 }
};

export const fire = {
	a: { x: 0.168, y: -0.002, z: 0.0 },
	b: { x: 0.918, y: 0.968, z: 0.0 },
	c: { x: 0.338, y: 0.5, z: 0.0 },
	d: { x: -0.252, y: 0.468, z: 0.0 }
};

export const green = {
	a: { x: 0.518, y: 0.558, z: 0.108 },
	b: { x: 0.408, y: 0.628, z: 0.048 },
	c: { x: 0.288, y: 0.288, z: -0.562 },
	d: { x: 0.448, y: -0.312, z: -1.342 }
};

export type NamedColorPalette = {
	palette: ColorPalette;
	name: string;
};

export const namedPalettesList: NamedColorPalette[] = [
	{ name: 'Rainbow', palette: rainbow },
	{ name: 'Blue-Cyan', palette: blueCyan },
	{ name: 'Blue-Magenta', palette: blueMagenta },
	{ name: 'Green', palette: green },
	{ name: 'Green-Cyan', palette: greenCyan },
	{ name: 'Green-Magenta', palette: greenMagenta },
	{ name: 'Green-Red', palette: greenRed },
	{ name: 'Orange-Blue', palette: orangeBlue },
	{ name: 'Fire', palette: fire },
	{ name: 'Red-Blue', palette: redBlue },
	{ name: 'Yellow-Magenta-Cyan', palette: yellowMagentaCyan },
	{ name: 'Yellow-Red', palette: yellowRed }
];

export const getRandomColorPalette = () =>
	namedPalettesList[Math.floor(Math.random() * namedPalettesList.length)].palette;

export function colorFromPalette(p: ColorPalette, t: number): Color {
	return {
		r: c01(p.a.x + p.b.x * Math.cos(6.28318 * (p.c.x * t + p.d.x))),
		g: c01(p.a.y + p.b.y * Math.cos(6.28318 * (p.c.y * t + p.d.y))),
		b: c01(p.a.z + p.b.z * Math.cos(6.28318 * (p.c.z * t + p.d.z)))
	};
}

export function defaultPalette(t: number): Color {
	const a: XYZ = { x: 0.158, y: 0.248, z: 0.788 };
	const b: XYZ = { x: 0.898, y: 0.758, z: 0.498 };
	const c: XYZ = { x: 0.468, y: -0.512, z: -0.512 };
	const d: XYZ = { x: -2.512, y: -1.482, z: 0.5 };
	return {
		r: c01(a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x))),
		g: c01(a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y))),
		b: c01(a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z)))
	};
}
