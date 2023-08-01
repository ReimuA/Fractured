import { writable } from 'svelte/store';
import type { Variation } from './FlamesUtils/Variations';
import type { Flames } from './FlamesUtils/Flames';
import { namedPalettesList, type ColorPalette } from './FlamesUtils/palette';

export const variationsPools = writable<Variation[]>([]);

export const flamesMetadata = writable<Flames>()

export const canvasRef = writable<HTMLCanvasElement>()