import { defaultRenderMode, structuralPaletteRenderMode, type Flames, createFlamesFromJson } from "../lib/FlamesUtils/Flames";
import { applyAA3x, superSampleResolution } from "../lib/FlamesUtils/antialiasing";
import type { XY } from "../lib/FlamesUtils/mathu";
import { createRenderData, iterateRenderData, type RenderData, updatePixelsBuffer, paletteStructuralColoring, colorStructuralColoring, resetRenderData } from "../lib/FlamesUtils/render";
import type { FlamesWorkerMessage } from "./messageType";

let flames: Flames | undefined;
let p: XY = { x: 0, y: 0 };
let canvasResolution: XY = { x: 0, y: 0 };
let nbIteration = 0;
let rotation = 0
let renderData: RenderData | undefined

let canvasContent: Uint8ClampedArray | undefined

function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
    if (!renderData ||!canvasContent || !flames) return

    p = iterateRenderData(flames, renderData, p, rotation,  5000, 5000 * nbIteration++);
    if (flames.spaceWarp.rotationalSymmetry > 1)
        rotation = ( rotation + ( 2 * Math.PI / flames.spaceWarp.rotationalSymmetry ) ) % ( 2 * Math.PI );

    if (flames.renderMode === defaultRenderMode)
        updatePixelsBuffer(renderData, flames.namedPalette.palette)
    else if (flames.renderMode === structuralPaletteRenderMode)
        paletteStructuralColoring(renderData, flames.namedPalette.palette);
    else
        colorStructuralColoring(renderData);

    applyAA3x(canvasResolution, renderData.pixels, canvasContent, renderData.heatmap, flames.renderMode !== defaultRenderMode)
    ctx.putImageData(
        new ImageData(canvasContent, canvasResolution.x, canvasResolution.y),
        0,
        0
    );
}

function init(newFlames: Flames, canvas: OffscreenCanvas) {
    const ctx = canvas.getContext("2d")

    if (ctx === null) {
        console.error("Failure to initialize the flames worker due to invaldie canvas context")
        return
    }

    canvasResolution = {x: canvas.width, y: canvas.height}
    
    flames = newFlames
    canvasContent ??= new Uint8ClampedArray(canvasResolution.x * canvasResolution.y * 4);
    renderData ??= createRenderData(flames.resolution.x * flames.resolution.y * flames.superSampleRatio * flames.superSampleRatio)

    requestAnimationFrame(flamesIteration);

    function flamesIteration() {
        if (flames !== undefined && ctx) {
            updateCanvas(ctx);
        }
        setTimeout(() => (requestAnimationFrame(flamesIteration)), 1000 / 60);
    }
}

function reset(newFlames: Flames) {
    p = { x: 0, y: 0 };
    flames = newFlames
    if (renderData)
        resetRenderData(renderData)
}

function softreset(newFlames: Flames) {
    p = { x: 0, y: 0 };

    flames ??= newFlames
    flames.spaceWarp.rotationalSymmetry = newFlames.spaceWarp.rotationalSymmetry
    flames.spaceWarp.mirrorX = newFlames.spaceWarp.mirrorX
    flames.spaceWarp.mirrorY = newFlames.spaceWarp.mirrorY

    rotation = 0
    if (renderData)
        resetRenderData(renderData)
}

function update(newFlames: Flames) {
    flames ??= newFlames
    flames.namedPalette = newFlames.namedPalette
    flames.renderMode = newFlames.renderMode
}

onmessage = ({data}: MessageEvent<FlamesWorkerMessage>) => {
    
    const flames = createFlamesFromJson(data.rawFlames)
    console.log(data.resetType)
    switch (data.resetType) {
        case "init":
            if (data.canvasContext)
                init(flames, data.canvasContext)
            break
        case "full":
            reset(flames)
            break
        case "soft":
            softreset(flames)
            break
        case "none":
            update(flames)
            break
    }

    postMessage({flames: JSON.stringify(flames, null, 4)})
};

export {}