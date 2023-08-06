import { writable } from 'svelte/store';
import type { Variation } from '$lib/FlamesUtils/Variations';
import type { Flames } from '$lib/FlamesUtils/Flames';
import {  namedPalettesList, type ColorPalette } from '$lib/FlamesUtils/palette';
import { defaultRenderMode, type RenderMode } from '$lib/FlamesUtils/render';

export const variationsPools = writable<Variation[]>([]);

export const rotationalSymmetryStore = writable<number>(1)

export const flamesJsonMetadata = writable<string>("{}")

export const colorPaletteStore = writable<ColorPalette>(namedPalettesList[0].palette)

export const renderModeStore = writable<RenderMode>(defaultRenderMode)

export const canvasRef = writable<HTMLCanvasElement>()