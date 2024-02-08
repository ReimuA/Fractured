import { type XY, rotate2d } from './mathu';
import { type Flames, applyFlames, type FlamesComponent } from './Flames';
import { randomWeigthedSelection } from './random';
import { colorFromPalette } from './palette';

export type RenderData = {
	pixels: Uint8ClampedArray;
	heatmap: Uint32Array;
	heatmapMax: number;
	paletteAccumulator: Float32Array;
	colorPaletteIndexAccumulator: Float32Array;
	colorAccumulator: Float32Array;
};

export function createRenderData(length: number): RenderData {
	return {
		heatmap: new Uint32Array(length),
		heatmapMax: 0,
		pixels: new Uint8ClampedArray(length * 4),
		colorAccumulator: new Float32Array(length * 3),
		colorPaletteIndexAccumulator: new Float32Array(length * 3),
		paletteAccumulator: new Float32Array(length)
	};
}

export function resetRenderData(renderData: RenderData) {
	renderData.heatmapMax = 0;
	renderData.pixels.fill(0);
	renderData.heatmap.fill(0);
	renderData.colorAccumulator.fill(0);
	renderData.colorPaletteIndexAccumulator.fill(0);
	renderData.paletteAccumulator.fill(0);
}

function applyMirrorSettings(flames: Flames, p: XY, i: number) {
	const mX = flames.spaceWarp.mirrorX;
	const mY = flames.spaceWarp.mirrorY;

	if (!mX && !mY) return;

	if (mX && mY) {
		if (i % 4 == 0) p.x *= -1;
		else if (i % 3 == 0) {
			p.y *= -1;
			p.x *= -1;
		} else if (i % 2 == 0) p.y *= -1;
	} else if (mY) p.x *= i % 2 == 0 ? 1 : -1;
	else if (mX) p.y *= i % 2 == 0 ? 1 : -1;
}

function worldCoordinatesToPixels(p: XY, res: XY, flames: Flames, rotation: number): XY {
	let pixel = {
		x: (p.x + 2 * (res.x / res.y)) * (res.y / 4),
		y: (p.y + 2) * (res.y / 4)
	};

	if (flames.spaceWarp.rotationalSymmetry == 1)
		return (pixel = { x: Math.round(pixel.x), y: Math.round(pixel.y) });

	const rPixel = rotate2d(pixel, { x: res.x / 2, y: res.y / 2 }, rotation);
	return { x: Math.round(rPixel.x), y: Math.round(rPixel.y) };
}

function updateRenderdata(
	flames: Flames,
	renderData: RenderData,
	pixel: XY,
	currentComponent: FlamesComponent,
	antialiasing: boolean
) {
	const colorPaletteIdx = currentComponent.colorPaletteIndex
	const heatmap = renderData.heatmap
	const f = antialiasing ? 3 : 1;
	const idx = pixel.y * flames.resolution.x * f + pixel.x;
	renderData.paletteAccumulator[idx] = (renderData.paletteAccumulator[idx] + colorPaletteIdx) / 2;
	heatmap[idx]++;

	let bucketValue = heatmap[idx]

	if (antialiasing) {
		const bucketX = (pixel.x - pixel.x % 3) / 3
		const bucketY = (pixel.y - pixel.y % 3) / 3
		let hidx = 3 * bucketX + 3 * bucketY * flames.resolution.x * 3

		bucketValue = (heatmap[hidx] +
			heatmap[hidx + 1] +
			heatmap[hidx + 2] +
			heatmap[hidx + flames.resolution.x * 3] +
			heatmap[hidx + flames.resolution.x * 3 + 1] +
			heatmap[hidx + flames.resolution.x * 3 + 2] +
			heatmap[hidx + flames.resolution.x * 3 * 2] +
			heatmap[hidx + flames.resolution.x * 3 * 2 + 1] +
			heatmap[hidx + flames.resolution.x * 3 * 2 + 2]) /
		9
	}

	if (renderData.heatmapMax < bucketValue)
		renderData.heatmapMax = bucketValue;

	const colorIdx = idx * 3;
	const color = colorFromPalette(flames.namedPalette.palette, colorPaletteIdx);
	renderData.colorPaletteIndexAccumulator[colorIdx] = (renderData.colorPaletteIndexAccumulator[colorIdx] + color.r) / 2;
	renderData.colorPaletteIndexAccumulator[colorIdx + 1] =
		(renderData.colorPaletteIndexAccumulator[colorIdx + 1] + color.g) / 2;
	renderData.colorPaletteIndexAccumulator[colorIdx + 2] =
		(renderData.colorPaletteIndexAccumulator[colorIdx + 2] + color.b) / 2;

	const c = currentComponent.color
	renderData.colorAccumulator[colorIdx] = (renderData.colorAccumulator[colorIdx] + c.r) / 2;
	renderData.colorAccumulator[colorIdx + 1] =
		(renderData.colorAccumulator[colorIdx + 1] + c.g) / 2;
	renderData.colorAccumulator[colorIdx + 2] =
		(renderData.colorAccumulator[colorIdx + 2] + c.b) / 2;
}

function applyZoom(flames: Flames, p: XY) {
	p.x *= flames.spaceWarp.zoom;
	p.y *= flames.spaceWarp.zoom;
}

export function iterateRenderData(
	flames: Flames,
	renderData: RenderData,
	renderData3x: RenderData,
	p: XY,
	rotation: number,
	iteration: number,
	totalIteration: number
) {
	const resX3x = flames.resolution.x * 3;
	const resY3x = flames.resolution.y * 3;
	for (let i = 0; i < iteration; i++) {
		const currentComponent = randomWeigthedSelection(flames.components);

		p = applyFlames(flames, flames.components.indexOf(currentComponent), p);

		applyZoom(flames, p);
		applyMirrorSettings(flames, p, i + totalIteration);

		const pixel3x = worldCoordinatesToPixels(p, { x: resX3x, y: resY3x }, flames, rotation);
		const pixel = worldCoordinatesToPixels(p, flames.resolution, flames, rotation);

		if (
			i + totalIteration > 20 &&
			pixel3x.x > 0 &&
			pixel3x.x < resX3x &&
			pixel3x.y > 0 &&
			pixel3x.y < resY3x
		)
			updateRenderdata(flames, renderData3x, pixel3x, currentComponent, true);

		if (
			i + totalIteration > 20 &&
			pixel.x > 0 &&
			pixel.x < flames.resolution.x &&
			pixel.y > 0 &&
			pixel.y < flames.resolution.y
		)
			updateRenderdata(flames, renderData, pixel, currentComponent, false);
	}

	return p;
}
