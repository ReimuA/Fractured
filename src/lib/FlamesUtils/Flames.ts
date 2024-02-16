import type { IFSTransform } from './IFSTransform';
import { getVariationFromname, type WeightedVariation } from './Variations';
import type { Color, XY } from './mathu';
import type { NamedColorPalette } from './palette';

export type SpaceWarp = {
	zoom: number;
	rotationalSymmetry: number;
	mirrorX: boolean;
	mirrorY: boolean;
};

export type RenderMode = 'Heatmap' | 'Structural' | 'Structural (Palette)' | 'Structural (Palette index)';
export const heatmapRenderMode: RenderMode = 'Heatmap';
export const structuralRenderMode: RenderMode = 'Structural';
export const structularPaletteRenderMode: RenderMode = 'Structural (Palette)';
export const structuralPaletteIndexRenderMode: RenderMode = 'Structural (Palette index)';
export const renderModeList = [
	heatmapRenderMode,
	structuralRenderMode,
	structularPaletteRenderMode,
	structuralPaletteIndexRenderMode
];

export type DensityEstimation = {
    minSigma: number
    maxSigma: number
}

export type Flames = {
	resolution: XY;
	gammaCorrection: number
	densityEstimation: DensityEstimation | null;
	antialiasing: boolean;
	renderMode: RenderMode;
	spaceWarp: SpaceWarp;
	namedPalette: NamedColorPalette;
	final: FlamesComponent;
	components: FlamesComponent[];
};

export type FlamesComponent = {
	enabled: boolean;
	color: Color;
	colorPaletteIndex: number;
	weight: number;
	transform: IFSTransform;
	weightedVariations: WeightedVariation[];
};

export function renderModeToNumber(x: RenderMode): 0 | 1 | 2 | 3 {
	switch (x) {
		case "Heatmap": return 0
		case "Structural": return 1
		case "Structural (Palette)": return 2
		case "Structural (Palette index)": return 3
	}
}