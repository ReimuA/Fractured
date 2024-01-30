import { c01, type Color, type XY } from './mathu';
import type { RenderData } from './render';

export function superSampleResolution(resolution: XY): XY {
	return {
		x: resolution.x * 3,
		y: resolution.y * 3
	};
}

function getColor(sample: Uint8ClampedArray, idx: number) {
	return {
		r: sample[idx + 0],
		g: sample[idx + 1],
		b: sample[idx + 2],
		a: sample[idx + 3]
	};
}

function gammaCorrection(canvasContent: Uint8ClampedArray, idx: number, c: Color, fAlpha: number, gammaCorrection: number) {
	canvasContent[idx + 0] = Math.pow((c.r / 255) * fAlpha, gammaCorrection) * 255;
	canvasContent[idx + 1] = Math.pow((c.g / 255) * fAlpha, gammaCorrection) * 255;
	canvasContent[idx + 2] = Math.pow((c.b / 255) * fAlpha, gammaCorrection) * 255;
	canvasContent[idx + 3] = 255;
}

export const downsampleHeatmapCell3x = (idx: number, linesize: number, heatmap: Uint32Array) =>
	(heatmap[idx] +
		heatmap[idx + 1] +
		heatmap[idx + 2] +
		heatmap[idx + linesize] +
		heatmap[idx + linesize + 1] +
		heatmap[idx + linesize + 2] +
		heatmap[idx + linesize * 2] +
		heatmap[idx + linesize * 2 + 1] +
		heatmap[idx + linesize * 2 + 2]) /
	9;

export function applyNoAA(
	resolution: XY,
	pixels: Uint8ClampedArray,
	heatmap: Uint32Array,
	heatmapMax: number,
	canvasContent: Uint8ClampedArray,
	logScale: boolean,
	gammaCorrectionValue: number
) {
	const logMax = Math.log10(heatmapMax);

	for (let i = 0; i < resolution.x * resolution.y; i++) {
		const idx = i * 4;
		const c1 = getColor(pixels, idx);

		let fAlpha = 1;
		if (logScale) {
			const alpha = heatmap[i];
			fAlpha = alpha == 0 ? 0 : Math.log10(alpha * 10) / logMax;
			fAlpha = c01(fAlpha);
		}

		gammaCorrection(canvasContent, idx, c1, fAlpha, gammaCorrectionValue);
	}
}

export function applyAA3x(
	resolution: XY,
	heatmapMax: number,
	supersample: Uint8ClampedArray,
	canvasContent: Uint8ClampedArray,
	heatmap: Uint32Array,
	logScale: boolean,
	gammaCorrectionValue: number
) {
	const ssResolution = { x: resolution.x * 3, y: resolution.y * 3 };

	for (let i = 0; i < resolution.x * resolution.y; i++) {
		// To keep track of the super sampled index we simply add twice the line lenght to the current index
		// nbChannel * supersampleRation * (index + nbOfLine * resolutionX * nbOfLineToSkip)
		const cIdx = 4 * 3 * (i + Math.floor(i / resolution.x) * resolution.x * 2);

		const c1 = getColor(supersample, cIdx + 0);
		const c2 = getColor(supersample, cIdx + 4);
		const c3 = getColor(supersample, cIdx + 8);
		const c4 = getColor(supersample, cIdx + ssResolution.x * 4 + 0);
		const c5 = getColor(supersample, cIdx + ssResolution.x * 4 + 4);
		const c6 = getColor(supersample, cIdx + ssResolution.x * 4 + 8);
		const c7 = getColor(supersample, cIdx + ssResolution.x * 8 + 0);
		const c8 = getColor(supersample, cIdx + ssResolution.x * 8 + 4);
		const c9 = getColor(supersample, cIdx + ssResolution.x * 8 + 8);

		const idx = i * 4;
		const fc = {
			r: (c1.r + c2.r + c3.r + c4.r + c5.r + c6.r + c7.r + c8.r + c9.r) / 9,
			g: (c1.g + c2.g + c3.g + c4.g + c5.g + c6.g + c7.g + c8.g + c9.g) / 9,
			b: (c1.b + c2.b + c3.b + c4.b + c5.b + c6.b + c7.b + c8.b + c9.b) / 9
		};

		let fAlpha = 1;
		if (logScale) {
			let logMax = Math.log10(heatmapMax);
			const hidx = 3 * i + Math.floor(i / resolution.x) * ssResolution.x * 2;
			const alpha = downsampleHeatmapCell3x(hidx, ssResolution.x, heatmap);
		
			fAlpha = alpha == 0 ? 0 : Math.log10(alpha * 10) / logMax;
			fAlpha = c01(fAlpha);
		}

		

		gammaCorrection(canvasContent, idx, fc, 1, gammaCorrectionValue);
	}
}
