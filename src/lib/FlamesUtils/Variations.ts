export type Variation = { id: number; name: string };

// See https://flam3.com/flame_draves.pdf - Appendix: Catalog of Variations

export const linearVariation: Variation = { id: 0, name: 'Linear' };

export const sinusoidalVariation: Variation = { id: 1, name: 'Sinusoidal' };

export const sphericalVariation: Variation = { id: 2, name: 'Spherical' };

export const swirlVariation: Variation = { id: 3, name: 'Swirl' };

export const horseshoeVariation: Variation = { id: 4, name: 'Horseshoe' };

export const polarVariation: Variation = { id: 5, name: 'Polar' };

export const handkerchieVariation: Variation = { id: 6, name: 'Handkerchief' };

export const heartVariation: Variation = { id: 7, name: 'Heart' };

export const discVariation: Variation = { id: 8, name: 'Disc' };

export const spiralVariation: Variation = { id: 9, name: 'Spiral' };

export const hyperbolicVariation: Variation = { id: 10, name: 'Hyperbolic' };

export const diamondVariation: Variation = { id: 11, name: 'Diamond' };

export const ExVariation: Variation = { id: 12, name: 'Ex' };

export const JuliaVariation: Variation = { id: 13, name: 'Julia' };

export const BentVariation: Variation = { id: 14, name: 'Bent' };

export const WavesVariation: Variation = { id: 15, name: 'Waves' };

export const FisheyeVariation: Variation = { id: 16, name: 'Fishe eye' };

// TODO: V17 Popconr

export const exponentialVariation: Variation = { id: 17, name: 'Exponential' };

export const powerVariation: Variation = { id: 18, name: 'Power' };

// TODO: Variation 20 Cosine

export const fanVariation: Variation = { id: 19, name: 'Fan' };

export const squareVariation: Variation = { id: 20, name: 'Square' }

export const allVariations: Variation[] = [
	linearVariation,
	sinusoidalVariation,
	sphericalVariation,
	swirlVariation,
	horseshoeVariation,
	polarVariation,
	handkerchieVariation,
	heartVariation,
	discVariation,
	spiralVariation,
	hyperbolicVariation,
	diamondVariation,
	ExVariation,
	JuliaVariation,
	BentVariation,
	WavesVariation,
	FisheyeVariation,
	// TODO: V17 Popconr
	exponentialVariation,
	powerVariation,
	// TODO: Variation 20 Cosine
	fanVariation,
	squareVariation
];

export const getVariationFromname = (name: string) => allVariations.find((e) => e.name == name);

export type WeightedVariation = {
	weight: number;
	variation: Variation;
};
