import { FlamesBuilder } from "$lib/FlamesUtils/flamesBuilder";
import { defaultRenderMode, structuralPaletteRenderMode, type Flames, type RenderMode, createFlamesFromJson } from "../lib/FlamesUtils/Flames";
import { allVariations } from "../lib/FlamesUtils/Variations";
import { applyAA, applyAA3x, superSampleResolution } from "../lib/FlamesUtils/antialiasing";
import type { XY } from "../lib/FlamesUtils/mathu";
import type {  NamedColorPalette } from "../lib/FlamesUtils/palette";
import { createRenderData, updateRenderData, type RenderData, updatePixelsBuffer, paletteStructuralColoring, colorStructuralColoring, resetRenderData } from "../lib/FlamesUtils/render";
import type { FlamesMessage, FlamesWorkerMessage, SoftResetMessage } from "./messageType";

let flames: Flames | undefined;
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
    if (!pixels || !renderData ||!canvasContent || !flames) return

    p = updateRenderData(resolution, flames, renderData, p, rotation,  5000, 5000 * nbIteration++);
    if (flames.spaceWarp.rotationalSymmetry > 1)
        rotation = ( rotation + ( 2 * Math.PI / flames.spaceWarp.rotationalSymmetry ) ) % ( 2 * Math.PI );

    if (flames.renderMode === defaultRenderMode)
        updatePixelsBuffer(pixels, renderData, flames.namedPalette.palette)
    else if (flames.renderMode === structuralPaletteRenderMode)
        paletteStructuralColoring(pixels, renderData, flames.namedPalette.palette);
    else
        colorStructuralColoring(pixels, renderData, flames.namedPalette.palette);

    applyAA3x(baseResolution, pixels, canvasContent, renderData.heatmap, flames.renderMode !== defaultRenderMode)
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

    let frame = requestAnimationFrame(flamesIteration);

    function flamesIteration() {
        if (flames !== undefined) {
            updateCanvas(ctx!);
        }
        setTimeout(() => (frame = requestAnimationFrame(flamesIteration)), 1000 / 60);
    }
}

function reset(newFlames: Flames) {
    p = { x: 0, y: 0 };
    flames = newFlames
    resetRenderData(renderData!)
    pixels?.fill(0)
}

function softreset(newFlames: Flames) {
    pixels?.fill(0)
    p = { x: 0, y: 0 };

    flames ??= newFlames
    flames.spaceWarp.rotationalSymmetry = newFlames.spaceWarp.rotationalSymmetry
    flames.spaceWarp.mirrorX = newFlames.spaceWarp.mirrorX
    flames.spaceWarp.mirrorY = newFlames.spaceWarp.mirrorY

    rotation = 0
    resetRenderData(renderData!)
}

function update(newFlames: Flames) {
    flames ??= newFlames
    flames.namedPalette = newFlames.namedPalette
    flames.renderMode = newFlames.renderMode
}

onmessage = ({data}: MessageEvent<FlamesMessage>) => {
    switch (data.type) {
       
        case "FlamesInit":
            init(data.canvasContext)
            break
    }

    console.log((data as any).resetType)
    switch ((data as any).resetType) {
        case "full":
            reset(createFlamesFromJson((data as any).rawFlames))
            break
        case "soft":
            softreset(createFlamesFromJson((data as any).rawFlames))
            break
        case "none":
            update(createFlamesFromJson((data as any).rawFlames))
            break
    }

    postMessage({flames: JSON.stringify(flames, null, 4)})
};

export {}