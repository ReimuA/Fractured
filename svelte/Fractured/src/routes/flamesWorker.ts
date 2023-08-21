import { updateFlamesColor } from "$lib/FlamesUtils/colorRendering";
import { defaultRenderMode, structuralPaletteRenderMode, type Flames, createFlamesFromJson } from "../lib/FlamesUtils/Flames";
import { applyAA3x, applyNoAA } from "../lib/FlamesUtils/antialiasing";
import type { XY } from "../lib/FlamesUtils/mathu";
import { createRenderData, iterateRenderData, type RenderData, resetRenderData } from "../lib/FlamesUtils/render";
import type { FlamesWorkerMessage } from "./messageType";

let flames: Flames | undefined;
let p: XY = { x: 0, y: 0 };
let canvasResolution: XY = { x: 0, y: 0 };
let nbIteration = 0;
let rotation = 0

// In order to switch in and out of anti aliasing, we compute both the normal sample and the super sample at the same time.
// The performance cost of this is mostly trivial since the heavy calculation happen when trying to render, rather than plotting the data. 
// The memory cost is also trivial as we had a mere 11.11% memory usage because we will plot the super sample data anyway, which is 9 times larger (3 * 3)
// than the default one.
//
// Finally : The advantage of this is to remove the heavy weight of rendering the supersample every time, because we can just render the default sample and thus increase the performance. 
let renderData: RenderData | undefined
let renderData3x: RenderData | undefined

let canvasContent: Uint8ClampedArray | undefined

function updateCanvas(ctx: OffscreenCanvasRenderingContext2D) {
    if (!renderData3x || ! renderData ||!canvasContent || !flames) return

    p = iterateRenderData(flames, renderData, renderData3x, p, rotation,  5000, 5000 * nbIteration++);
    if (flames.spaceWarp.rotationalSymmetry > 1)
        rotation = ( rotation + ( 2 * Math.PI / flames.spaceWarp.rotationalSymmetry ) ) % ( 2 * Math.PI );

    updateFlamesColor(flames, flames.antialiasing ? renderData3x : renderData)

    if (flames.antialiasing)
        applyAA3x(canvasResolution, renderData3x.pixels, canvasContent, renderData3x.heatmap, flames.renderMode !== defaultRenderMode)
    else
        applyNoAA(canvasResolution, renderData, canvasContent, flames.renderMode !== defaultRenderMode)

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
    renderData ??= createRenderData(flames.resolution.x * flames.resolution.y)
    renderData3x ??= createRenderData(flames.resolution.x * flames.resolution.y * 3 * 3)

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
    if (renderData3x)
        resetRenderData(renderData3x)
    if (renderData)
        resetRenderData(renderData)
}

function softreset(newFlames: Flames) {
    p = { x: 0, y: 0 };

    flames ??= newFlames
    flames.spaceWarp.rotationalSymmetry = newFlames.spaceWarp.rotationalSymmetry
    flames.spaceWarp.mirrorX = newFlames.spaceWarp.mirrorX
    flames.spaceWarp.mirrorY = newFlames.spaceWarp.mirrorY
    flames.densityEstimation = newFlames.densityEstimation

    rotation = 0
    if (renderData3x)
        resetRenderData(renderData3x)
    if (renderData)
        resetRenderData(renderData)
}

function update(newFlames: Flames) {
    flames ??= newFlames
    flames.antialiasing = newFlames.antialiasing
    flames.namedPalette = newFlames.namedPalette
    flames.renderMode = newFlames.renderMode
}

onmessage = ({data}: MessageEvent<FlamesWorkerMessage>) => {
    
    const flames = createFlamesFromJson(data.rawFlames)
    console.log(flames.antialiasing)
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