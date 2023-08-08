import { writable } from 'svelte/store';
import type { Variation } from '$lib/FlamesUtils/Variations';
import { defaultRenderMode, type Flames, type SpaceWarp, type RenderMode } from '$lib/FlamesUtils/Flames';
import { namedPalettesList, type ColorPalette, type NamedColorPalette } from '$lib/FlamesUtils/palette';

export const variationsPools = writable<Variation[]>([]);

export const spaceWarpingStore = writable<SpaceWarp>({
    rotationalSymmetry: 1,
    mirrorX: false,
    mirrorY: false
})

export const flamesStore = writable<Flames | undefined>()

export const flamesJsonMetadata = writable<string>("{}")

export const colorPaletteStore = writable<NamedColorPalette>(namedPalettesList[0])

export const renderModeStore = writable<RenderMode>(defaultRenderMode)

export const canvasRef = writable<HTMLCanvasElement>()