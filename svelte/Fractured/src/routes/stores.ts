import { writable } from 'svelte/store';
import type { Variation } from './FlamesUtils/Variations';
import type { Flames } from './FlamesUtils/Flames';
import { namedPalettesList, type ColorPalette } from './FlamesUtils/palette';
import { defaultRenderMode, type renderMode } from './FlamesUtils/render';

export const variationsPools = writable<Variation[]>([]);

export const flamesMetadata = writable<Flames>()

export const renderModeStore = writable<renderMode>(defaultRenderMode)

export const canvasRef = writable<HTMLCanvasElement>()