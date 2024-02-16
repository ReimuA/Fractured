export type XY = { x: number; y: number };
export type Color = { r: number; g: number; b: number };
export type ColorAlpha = Color & { a: number };

export type XYZ = XY & { z: number };
export type Vec3 = XYZ;

export type iRange = { min: number; max: number };

export function iRandom(range: iRange) {
	if (range.min === range.max) return range.max;
	return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
}

export function clamp(edgeA: number, edgeB: number, x: number) {
	if (x < edgeA) return edgeA;
	if (x > edgeB) return edgeB;
	return x;
}

export function c01(x: number) {
	return clamp(0, 1, x);
}
