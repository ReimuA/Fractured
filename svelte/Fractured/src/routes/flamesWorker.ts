import { defaultRenderMode, structuralPaletteRenderMode, type Flames, type RenderMode } from "../lib/FlamesUtils/Flames";
import { allVariations } from "../lib/FlamesUtils/Variations";
import { applyAA, applyAA3x, superSampleResolution } from "../lib/FlamesUtils/antialiasing";
import type { XY } from "../lib/FlamesUtils/mathu";
import { namedPalettesList, type ColorPalette, type NamedColorPalette } from "../lib/FlamesUtils/palette";
import { createRandomFlames } from "../lib/FlamesUtils/random";
import { createRenderData, updateRenderData, type RenderData, updatePixelsBuffer, paletteStructuralColoring, colorStructuralColoring, resetRenderData } from "../lib/FlamesUtils/render";
import type { FlamesMessage, SoftResetMessage } from "./messageType";

let flames: Flames;
let p: XY = { x: 0, y: 0 };
let resolution: XY = { x: 0, y: 0 };
let baseResolution: XY = { x: 0, y: 0 };
let nbIteration: number = 0;
let rotation = 0
let renderData: RenderData | undefined

let pixels: Uint8ClampedArray | undefined
let canvasContent: Uint8ClampedArray | undefined

const mapToVariations = (vNames: string[]) => vNames.map(e => allVariations.find(v => v.name == e)!)

function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
    if (!pixels || !renderData ||!canvasContent) return

    p = updateRenderData(resolution, flames, renderData, p, rotation,  5000, 5000 * nbIteration++);
    if (flames.spaceWarp.rotationalSymmetry > 1)
        rotation = ( rotation + ( 2 * Math.PI / flames.spaceWarp.rotationalSymmetry ) ) % ( 2 * Math.PI );

    if (flames.renderMode === defaultRenderMode)
        updatePixelsBuffer(pixels, renderData, flames.namedPalette.palette)
    else if (flames.renderMode === structuralPaletteRenderMode)
        paletteStructuralColoring(pixels, renderData, flames.namedPalette.palette);
    else
        colorStructuralColoring(pixels, renderData, flames.namedPalette.palette);

    applyAA3x(baseResolution, pixels, canvasContent, renderData.heatmap)
    ctx.putImageData(
        new ImageData(canvasContent, baseResolution.x, baseResolution.y),
        0,
        0
    );
}

function init(canvas: OffscreenCanvas) {
    const ctx = canvas.getContext("2d")

    if (ctx === null) {
        console.error("Failure to initialize the flames worker due to invaldie canvas context")
        return
    }

    baseResolution = {x: canvas.width, y: canvas.height}
    resolution = superSampleResolution(baseResolution)
    
    pixels ??= new Uint8ClampedArray(resolution.x * resolution.y * 4);
    canvasContent ??= new Uint8ClampedArray(baseResolution.x * baseResolution.y * 4);
    renderData ??= createRenderData(resolution.x * resolution.y)

    flames = createRandomFlames(resolution, namedPalettesList[0], allVariations)

    let frame = requestAnimationFrame(flamesIteration);

    function flamesIteration() {
        updateCanvas(ctx!);
        setTimeout(() => (frame = requestAnimationFrame(flamesIteration)), 1000 / 60);
    }
}

function reset(vNames: string[]) {
    const variationsPools = mapToVariations(vNames)

    p = { x: 0, y: 0 };
    flames = createRandomFlames(flames.resolution, flames.namedPalette, variationsPools)
    resetRenderData(renderData!)
    pixels?.fill(0)
}

function softreset(msg: SoftResetMessage) {
    pixels?.fill(0)
    p = { x: 0, y: 0 };
    flames.spaceWarp.rotationalSymmetry = msg.spaceWarping.rotationalSymmetry
    flames.spaceWarp.mirrorX = msg.spaceWarping.mirrorX
    flames.spaceWarp.mirrorY = msg.spaceWarping.mirrorY
    rotation = 0
    resetRenderData(renderData!)
}

function paletteChange(namedPalette: NamedColorPalette) {
    flames.namedPalette = namedPalette
}

function RenderModeChange(rm: RenderMode) {
    flames.renderMode = rm
}

onmessage = ({data}: MessageEvent<FlamesMessage>) => {
    switch (data.type) {
        case "FlamesReset":
            reset(data.variationsPools)
            break
        case "FlamesSoftReset":
            softreset(data)
            break
        case "FlamesInit":
            init(data.canvasContext)
            break
        case "FlamesPaletteChange":
            paletteChange(data.namedColorPalette)
            break
        case "FlamesRenderModeChange":
            RenderModeChange(data.renderMode)
            break
    }

    postMessage({flames: JSON.stringify(flames, null, 4)})
};

export {}