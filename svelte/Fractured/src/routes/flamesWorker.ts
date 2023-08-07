import type { Flames } from "../lib/FlamesUtils/Flames";
import { allVariations } from "../lib/FlamesUtils/Variations";
import { applyAA, superSampleResolution } from "../lib/FlamesUtils/antialiasing";
import type { XY } from "../lib/FlamesUtils/mathu";
import { namedPalettesList, type ColorPalette } from "../lib/FlamesUtils/palette";
import { createRandomFlames } from "../lib/FlamesUtils/random";
import { createRenderData, updateRenderData, type RenderData, type RenderMode, updatePixelsBuffer, paletteStructuralColoring, colorStructuralColoring, defaultRenderMode, structuralPaletteRenderMode, resetRenderData } from "../lib/FlamesUtils/render";
import type { FlamesMessage, SoftResetMessage } from "./messageType";

let flames: Flames;
let p: XY = { x: 0, y: 0 };
let resolution: XY = { x: 0, y: 0 };
let baseResolution: XY = { x: 0, y: 0 };
let nbIteration: number = 0;
let rotation = 0
let renderData: RenderData | undefined
let renderMode: RenderMode = defaultRenderMode

let pixels: Uint8ClampedArray | undefined

const mapToVariations = (vNames: string[]) => vNames.map(e => allVariations.find(v => v.name == e)!)

function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
    if (!pixels || !renderData) return

    p = updateRenderData(resolution, flames, renderData, p, rotation,  5000, 5000 * nbIteration++);
    if (flames.spaceWarp.rotationalSymmetry > 1)
        rotation = ( rotation + ( 2 * Math.PI / flames.spaceWarp.rotationalSymmetry ) ) % ( 2 * Math.PI );

    if (renderMode === defaultRenderMode)
        updatePixelsBuffer(pixels, renderData, flames.palette, 10)
    else if (renderMode === structuralPaletteRenderMode)
        paletteStructuralColoring(pixels, renderData, flames.palette);
    else
        colorStructuralColoring(pixels, renderData, flames.palette);
    ctx.putImageData(
        new ImageData(applyAA(baseResolution, pixels), baseResolution.x, baseResolution.y),
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
    renderData ??= createRenderData(resolution.x * resolution.y)

    flames = createRandomFlames(resolution, namedPalettesList[0].palette, allVariations)

    let frame = requestAnimationFrame(flamesIteration);

    function flamesIteration(t: number) {
        updateCanvas(ctx!);
        setTimeout(() => (frame = requestAnimationFrame(flamesIteration)), 1000 / 60);
    }
}

function reset(vNames: string[]) {
    const variationsPools = mapToVariations(vNames)

    p = { x: 0, y: 0 };
    flames = createRandomFlames(flames.resolution, flames.palette, variationsPools)
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

function paletteChange(palette: ColorPalette) {
    flames.palette = palette
    console.log(palette)
}

function RenderModeChange(rm: RenderMode) {
    renderMode = rm
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
            paletteChange(data.palette)
            break
        case "FlamesRenderModeChange":
            RenderModeChange(data.renderMode)
            break
    }

    postMessage({flames: JSON.stringify(flames, null, 4)})
};

export {}