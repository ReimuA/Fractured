import { writable } from 'svelte/store';
import type { Variation } from './FlamesUtils/Variations';
import type { Flames } from './FlamesUtils/Flames';
import {  namedPalettesList, type ColorPalette } from './FlamesUtils/palette';
import { defaultRenderMode, type RenderMode } from './FlamesUtils/render';

export const variationsPools = writable<Variation[]>([]);

export const flamesJsonMetadata = writable<string>("{}")

export const colorPaletteStore = writable<ColorPalette>(namedPalettesList[0].palette)

export const renderModeStore = writable<RenderMode>(defaultRenderMode)

export const canvasRef = writable<HTMLCanvasElement>()