import type { SpaceWarp } from "$lib/FlamesUtils/Flames"
import type { Variation } from "../lib/FlamesUtils/Variations"
import type { ColorPalette } from "../lib/FlamesUtils/palette"
import type { RenderMode } from "../lib/FlamesUtils/render"

type Reset = "FlamesReset"
type SoftReset = "FlamesSoftReset"
type Init = "FlamesInit"
type PaletteChange = "FlamesPaletteChange"
type RenderModeChange = "FlamesRenderModeChange"

export type FlamesMessageType = SoftReset | Reset | Init | PaletteChange | RenderModeChange


export type ResetMessage = {
    type: Reset,
    variationsPools: string[]
}

export type SoftResetMessage = {
    type: SoftReset,
    spaceWarping: SpaceWarp
}


export type InitMessage = {
    type: Init
    canvasContext: OffscreenCanvas
}

export type PaletteChangeMessage = {
    type: PaletteChange,
    palette: ColorPalette
}

export type RenderModeChangeMessage = {
    type: RenderModeChange,
    renderMode: RenderMode
}

export type FlamesMessage = SoftResetMessage | ResetMessage | InitMessage | PaletteChangeMessage | RenderModeChangeMessage