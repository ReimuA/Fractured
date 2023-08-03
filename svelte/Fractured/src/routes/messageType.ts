import type { Variation } from "../lib/FlamesUtils/Variations"
import type { ColorPalette } from "../lib/FlamesUtils/palette"
import type { RenderMode } from "../lib/FlamesUtils/render"

type Reset = "FlamesReset"
type Init = "FlamesInit"
type PaletteChange = "FlamesPaletteChange"
type RenderModeChange = "FlamesRenderModeChange"

export type FlamesMessageType = Reset | Init | PaletteChange | RenderModeChange


export type ResetMessage = {
    type: Reset,
    variationsPools: string[]
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

export type FlamesMessage = ResetMessage | InitMessage | PaletteChangeMessage | RenderModeChangeMessage