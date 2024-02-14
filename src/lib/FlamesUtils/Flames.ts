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

export type RenderMode = 'Default' | 'Structural' | 'Structural (Palette)' | 'Structural (Palette index)';
export const defaultRenderMode: RenderMode = 'Default';
export const structuralRenderMode: RenderMode = 'Structural';
export const structularPaletteRenderMode: RenderMode = 'Structural (Palette)';
export const structuralPaletteIndexRenderMode: RenderMode = 'Structural (Palette index)';
export const renderModeList = [
	defaultRenderMode,
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

function applyTransformAndVariation(p: XY, component: FlamesComponent): XY {
	const newP = { x: 0, y: 0 };
	const t = component.transform;
	const tp = {
		x: t.a * p.x + t.b * p.y + t.c,
		y: t.d * p.x + t.e * p.y + t.f
	};

	for (const variation of component.weightedVariations) {
		const vp = variation.variation.function(tp, component.transform);
		newP.x += vp.x * variation.weight;
		newP.y += vp.y * variation.weight;
	}

	return newP;
}

export function applyFlames(flames: Flames, componentIdx: number, p: XY): XY {
	const component = flames.components[componentIdx];

	const newP = applyTransformAndVariation(p, component);

	return applyTransformAndVariation(newP, flames.final);
}

export function createFlamesFromJson(raw: string) {
	const flames: Flames = JSON.parse(raw);
	// The rest of the code base assume that each variation object has a reference to the function it need to calls, so we insert the manually

	for (const component of flames.components)
		for (const weightedVariations of component.weightedVariations)
			weightedVariations.variation = getVariationFromname(weightedVariations.variation.name)!;

	for (const weightedVariations of flames.final.weightedVariations)
		weightedVariations.variation = getVariationFromname(weightedVariations.variation.name)!;

	return flames;
}

export function renderModeToNumber(x: RenderMode): 0 | 1 | 2 | 3 {
	switch (x) {
		case "Default": return 0
		case "Structural": return 1
		case "Structural (Palette)": return 2
		case "Structural (Palette index)": return 3
	}
}