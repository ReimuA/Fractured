(function(){"use strict";function R(r){return Math.sqrt(r.x*r.x+r.y*r.y)}function Xe(r,e){return(r%e+e)%e}const v=r=>Math.atan2(r.y,r.x),k=r=>R(r),Ke=()=>Math.random()<.5?0:Math.PI,he=()=>Math.random(),fe=[{name:"Linear",function:r=>({x:r.x,y:r.y})},{name:"Sinusoidal",function:r=>({x:Math.sin(r.x),y:Math.sin(r.y)})},{name:"Spherical",function:r=>{const e=R(r),t=e*e;return{x:r.x/t,y:r.y/t}}},{name:"Swirl",function:r=>{const e=R(r),t=e*e,n=Math.cos(t),s=Math.sin(t);return{x:r.x*s-r.y*n,y:r.x*n+r.y*s}}},{name:"Horseshoe",function:r=>{const t=1/R(r);return{x:t*(r.x+r.y)*(r.x-r.y),y:t*2*r.x*r.y}}},{name:"Polar",function:r=>({x:v(r)/Math.PI,y:k(r)-1})},{name:"Handkerchief",function:r=>{const e=k(r),t=v(r);return{x:e*Math.sin(t+e),y:e*Math.cos(t-e)}}},{name:"Heart",function:r=>{const e=k(r),t=v(r);return{x:e*Math.sin(t*e),y:e*-Math.cos(t*e)}}},{name:"Disc",function:r=>{const e=k(r),n=v(r)/Math.PI;return{x:n*Math.sin(Math.PI*e),y:n*Math.cos(Math.PI*e)}}},{name:"Spiral",function:r=>{const e=k(r),t=v(r),n=1/e;return{x:n*(Math.cos(t)+Math.sin(e)),y:n*(Math.sin(t)-Math.cos(e))}}},{name:"Hyperbolic",function:r=>{const e=k(r),t=v(r);return{x:Math.sin(t)/e,y:e*Math.cos(t)}}},{name:"Diamond",function:r=>{const e=k(r),t=v(r);return{x:Math.sin(t)*Math.cos(e),y:Math.sin(e)*Math.cos(t)}}},{name:"Ex",function:r=>{const e=k(r),t=v(r),n=Math.sin(t+e),s=Math.cos(t-e),i=n*n*n,c=s*s*s;return{x:e*(i+c),y:e*(i-c)}}},{name:"Julia",function:r=>{const e=k(r),t=v(r),n=Ke(),s=Math.sqrt(e);return{x:s*Math.cos(t/2+n),y:s*Math.sin(t/2+n)}}},{name:"Bent",function:r=>r.x>=0&&r.y>=0?r:r.x<0&&r.y>=0?{x:2*r.x,y:r.y}:r.x>=0&&r.y<0?{x:r.x,y:r.y/2}:{x:2*r.x,y:r.y/2}},{name:"Waves",function:(r,e)=>({x:r.x*e.b*Math.sin(r.y/(e.c*e.c)),y:r.y+e.e*Math.sin(r.x/(e.f*e.f))})},{name:"Fishe eye",function:r=>{const t=2/(k(r)+1);return{x:t*r.x,y:t*r.y}}},{name:"Exponential",function:r=>{const e=Math.exp(r.x-1);return{x:e*Math.cos(Math.PI*r.y),y:e*Math.sin(Math.PI*r.y)}}},{name:"Power",function:r=>{const e=k(r),t=v(r),n=Math.pow(e,Math.sin(t));return{x:n*Math.cos(t),y:n*Math.sin(t)}}},{name:"Fan",function:(r,e)=>{const t=R(r),n=v(r),s=Math.PI*e.c*e.c,i=e.f;return Xe(n+i,s)>s/2?{x:t*Math.cos(n-s/2),y:t*Math.sin(n-s/2)}:{x:t*Math.cos(n+s/2),y:t*Math.sin(n+s/2)}}},{name:"Square",function:(r,e)=>({x:he()-.5,y:he()-.5})}],pe=r=>fe.find(e=>e.name==r);function $e(r){return fe.findIndex(e=>e.name===r.name)}const Je="Heatmap";function Ze(r){const e=JSON.parse(r);for(const t of e.components)for(const n of t.weightedVariations)n.variation=pe(n.variation.name);for(const t of e.final.weightedVariations)t.variation=pe(t.variation.name);return e}function Qe(r){switch(r){case"Heatmap":return 0;case"Structural":return 1;case"Structural (Palette)":return 2;case"Structural (Palette index)":return 3}}var et=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
\r
@group(1) @binding(0) var<uniform> gamma: f32;\r
@group(1) @binding(1) var<uniform> logDensity: u32;\r
\r
fn downsamplePixels(x: u32, y: u32, rowsize: u32) -> vec4<u32> {\r
    const hOffset = 1920u * 1080u;\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    let c1 = pixels[cIdx];\r
    let c2 = pixels[cIdx + 1];\r
    let c3 = pixels[cIdx + 2];\r
    let c4 = pixels[cIdx + rowsize + 0];\r
    let c5 = pixels[cIdx + rowsize + 1];\r
    let c6 = pixels[cIdx + rowsize + 2];\r
    let c7 = pixels[cIdx + 2 * rowsize + 0];\r
    let c8 = pixels[cIdx + 2 * rowsize + 1];\r
    let c9 = pixels[cIdx + 2 * rowsize + 2];\r
\r
    let arr = array<u32, 9>(c1, c2, c3, c4, c5, c6, c7, c8, c9);\r
    var res = vec4<u32>(0);\r
\r
    for (var i = 0; i < 9; i++) {\r
        res.x += (arr[i] >> 24) & 0xFF;\r
        res.y += (arr[i] >> 16) & 0xFF;\r
        res.z += (arr[i] >> 8) & 0xFF;\r
        res.w += (arr[i]) & 0xFF;\r
    }\r
\r
    res /= 9;\r
\r
    return res;\r
}\r
\r
fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {\r
    const hOffset = 1920u * 1080u;\r
\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + heatmap[cIdx + 2 * rowsize + 2]) / 9;\r
}\r
\r
// return a rgba color, 8 bit per channel.\r
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {\r
    var fres = vec4<f32>(col);\r
    var fAlpha = 1.;\r
    var logmax = log2(f32(heatmapMax)) / log2(10.);\r
\r
    if (logDensity != 0 && hvalue != 0.) {\r
        fAlpha = clamp((log2(10. * hvalue) / log2(10.)) / logmax, 0, 1);\r
    }\r
\r
    fres /= 255.;\r
\r
    fres.w = clamp(pow(fAlpha * fres.w, gamma), 0, 1);\r
    fres.z = clamp(pow(fAlpha * fres.z, gamma), 0, 1);\r
    fres.y = clamp(pow(fAlpha * fres.y, gamma), 0, 1);\r
    fres.x = clamp(pow(fAlpha * fres.x, gamma), 0, 1);\r
\r
    fres *= 255.;\r
\r
    let res = vec4<u32>(fres);\r
    return (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let rowsize = 3u * 1920u;\r
\r
    let res = downsamplePixels(x, y, rowsize);\r
    let hvalue = downsampleHeatmap(x, y, rowsize);\r
\r
    output[x + y * (rowsize / 3)] = gammaCorrection(res, f32(hvalue));\r
}`,me=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: f32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	  enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
\r
var<private> gaussKern = array<f32, 729>();\r
\r
const e = 2.718;\r
const pi = 3.14;\r
\r
fn createKernel(sigma: f32) -> i32 {\r
    const gausskern = 3.0;\r
    let correctedSigma = max(sigma, 1e-6);\r
    var len = i32(floor(max(3.0, gausskern * correctedSigma)));\r
    if len % 2 == 0 {\r
        len += 1;\r
    }\r
\r
    let half = i32(floor(f32(len) / 2.));\r
    var total = 0.;\r
\r
    let gaussKernTotalLength = len * len;\r
\r
    for (var i = 0; i < gaussKernTotalLength; i++) {\r
        let x = i % len - half;\r
        let y = i / len - half;\r
        let exponent = pow(e, -f32(x * x + y * y) / (2. * correctedSigma * correctedSigma));\r
        let value = exponent / (2 * pi * correctedSigma * correctedSigma);\r
        gaussKern[i] = value;\r
        total += value;\r
    }\r
\r
    for (var i = 0; i < gaussKernTotalLength; i++) {\r
        gaussKern[i] /= total;\r
    }\r
\r
    return len;\r
}\r
\r
fn blur(x: i32, y: i32, len: i32) {\r
    var r = 0.;\r
    var g = 0.;\r
    var b = 0.;\r
    var ml = len / 2;\r
\r
    for (var i = 0; i < len; i++) {\r
        for (var j = 0; j < len; j++) {\r
            let current: f32 = gaussKern[i + j * len];\r
            let xOffset = (i - ml);\r
            let yOffset = j - ml;\r
\r
            if x + xOffset >= 0 && y + yOffset >= 0 {\r
                let idx = x + xOffset + (yOffset + y) * 1920;\r
                r += current * f32((image[idx] >> 0) & 0xFF);\r
                g += current * f32((image[idx] >> 8) & 0xFF);\r
                b += current * f32((image[idx] >> 16) & 0xFF);\r
            };\r
        }\r
    }\r
\r
    blurredImage[x + y * 1920] = (0xFF << 24) | (u32(b) << 16) | (u32(g) << 8) | u32(r);\r
}\r
\r
fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {\r
    const hOffset = 1920u * 1080u;\r
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;\r
\r
    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + heatmap[cIdx + 2 * rowsize + 2]) / 9;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    var hvalue = heatmap[x + y * 1920u];\r
    if flames.antialiasing != 0 {\r
        hvalue = downsampleHeatmap(x, y, 1920u * 3u);\r
    }\r
\r
    let logmax = log2(heatmapMax) / log2(10.);\r
    let logcurrent = log2(f32(hvalue + 1)) / log2(10.);\r
    let t = 1 - smoothstep(0., 1., f32(hvalue) / heatmapMax); \r
    let sigma = mix(flames.densityEstimation.minsigma, flames.densityEstimation.maxsigma, t);\r
\r
    // Short circuit sigma value leading to the default gaussian kernel.\r
    if sigma < 1e-2 {\r
        blurredImage[x + y * 1920] = image[x + y * 1920u];\r
        return;\r
    }\r
\r
    let len = createKernel(flames.densityEstimation.maxsigma);\r
\r
    blur(i32(x), i32(y), len);\r
}  `,tt=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
\r
const HEATMAP = 0u;\r
const STRUCTURAL = 1u;\r
const STRUCTURAL_PALETTE = 2u;\r
const STRUCTURAL_PALETTE_INDEX = 3u;\r
\r
fn c01(x: f32) -> f32 {\r
    return clamp(x, 0, 1);\r
}\r
\r
fn log10(n: f32) -> f32 {\r
    const log2_10: f32 = 3.321928094887362;\r
    return log2(n) / log2_10;\r
}\r
\r
fn palette(t: f32) -> vec3<f32> {\r
    let p = flames.palette;\r
    return vec3<f32>(\r
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),\r
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),\r
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),\r
    );\r
}\r
\r
fn heatmapColoring(idx: u32) -> vec3<f32> {\r
    let hValue = heatmap[idx];\r
    if hValue == 0 {\r
        return vec3(0);\r
    }\r
\r
    let maxDensity = log2(f32(heatmapMax));\r
    let density = log2(f32(hValue));\r
    let colorIdx = density / maxDensity;\r
    return palette(colorIdx);\r
}\r
\r
fn structural(color: u32) -> vec3<f32> {\r
    let r = (color >> 16) & 0xFF;\r
    let g = (color >> 8) & 0xFF;\r
    let b = (color) & 0xFF;\r
    \r
    return vec3<f32>(\r
        f32(r),\r
        f32(g),\r
        f32(b)\r
    );\r
}\r
\r
fn coloring(pIdx: u32, hIdx: u32) -> u32 {\r
    if (heatmap[hIdx] < 1) {\r
        return 0;\r
    }\r
\r
    let renderMode = flames.renderMode;\r
    var c: vec3<f32>;\r
    if renderMode == HEATMAP {\r
        c = heatmapColoring(hIdx) * 255.;\r
    }\r
    if renderMode == STRUCTURAL_PALETTE_INDEX {\r
        c = palette(f32(paletteIndexAccumulator[hIdx]) / 1e4)  * 255.;\r
    }\r
    if renderMode == STRUCTURAL {\r
        c = structural(colorAccumulator[hIdx]);\r
    }\r
    if renderMode == STRUCTURAL_PALETTE {\r
        c = structural(paletteAccumulator[hIdx]);\r
    }\r
\r
    let previousColor = pixels[pIdx];\r
    let c2 = vec3<f32>(\r
        f32((previousColor) & 0xFF),\r
        f32((previousColor >> 8) & 0xFF),\r
        f32((previousColor >> 16) & 0xFF)\r
    );\r
\r
    // Pixels Interpolation isn't working correctly when switching from/to antialising. Could be due to a single buffer being used now.\r
    c = mix(c2 , c, 0.15);\r
    var c255 = vec3<u32>(c);\r
\r
    return (0xFF << 24) | (u32(c255.z & 0xFF) << 16) | (u32(c255.y & 0xFF) << 8) | (u32(c255.x & 0xFF));\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
\r
    if flames.antialiasing == 0 {\r
        let idx = x + y * flames.resolution.x;\r
        pixels[idx] = coloring(idx, idx);\r
        return;\r
    }\r
\r
    const hOffset = 1920u * 1080u;\r
    let rowsize = flames.resolution.x * 3u;\r
\r
    let pIdx = (x + y * rowsize) * 3u + hOffset;\r
    let hIdx = (x + y * rowsize) * 3u + hOffset;\r
\r
\r
    pixels[pIdx] = coloring(pIdx, hIdx);\r
    pixels[pIdx + 1] = coloring(pIdx + 1, hIdx + 1);\r
    pixels[pIdx + 2] = coloring(pIdx + 2, hIdx + 2);\r
    pixels[pIdx + rowsize + 0] = coloring(pIdx + rowsize + 0, hIdx + rowsize + 0);\r
    pixels[pIdx + rowsize + 1] = coloring(pIdx + rowsize + 1, hIdx + rowsize + 1);\r
    pixels[pIdx + rowsize + 2] = coloring(pIdx + rowsize + 2, hIdx + rowsize + 2);\r
    pixels[pIdx + 2 * rowsize + 0] = coloring(pIdx + 2 * rowsize + 0, hIdx + 2 * rowsize + 0);\r
    pixels[pIdx + 2 * rowsize + 1] = coloring(pIdx + 2 * rowsize + 1, hIdx + 2 * rowsize + 1);\r
    pixels[pIdx + 2 * rowsize + 2] = coloring(pIdx + 2 * rowsize + 2, hIdx + 2 * rowsize + 2);\r
}  `,rt=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> output: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
\r
@group(1) @binding(0) var<uniform> gamma: f32;\r
@group(1) @binding(1) var<uniform> logDensity: u32;\r
\r
// return a rgba color, 8 bit per channel.\r
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {\r
    var fres = vec4<f32>(col);\r
    var fAlpha = 1.;\r
    var logmax = log2(f32(heatmapMax)) / log2(10.);\r
\r
    if (logDensity != 0 && hvalue != 0.) {\r
        fAlpha = clamp((log2(10. * hvalue) / log2(10.)) / logmax, 0, 1);\r
    }\r
\r
    fres /= 255.;\r
\r
    fres.w = clamp(pow(fAlpha * fres.w, gamma), 0, 1);\r
    fres.z = clamp(pow(fAlpha * fres.z, gamma), 0, 1);\r
    fres.y = clamp(pow(fAlpha * fres.y, gamma), 0, 1);\r
    fres.x = clamp(pow(fAlpha * fres.x, gamma), 0, 1);\r
\r
    fres *= 255.;\r
\r
    let res = vec4<u32>(fres);\r
    return (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;\r
}\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let rowsize = 1920u;\r
\r
    var res = vec4<u32>(0);\r
    let pixel = pixels[x + y * rowsize];\r
    let hvalue = heatmap[x + y * rowsize];\r
\r
    res.x += (pixel >> 24) & 0xFF;\r
    res.y += (pixel >> 16) & 0xFF;\r
    res.z += (pixel >> 8) & 0xFF;\r
    res.w += (pixel) & 0xFF;\r
    \r
    output[x + y * rowsize] = gammaCorrection(res, f32(hvalue));\r
}`,nt=`@group(0) @binding(0) var<storage, read_write> heatmap: array<atomic<u32>>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: atomic<u32>;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<atomic<u32>>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<atomic<u32>>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<atomic<u32>>;\r
\r
struct DensityEstimation {\r
    enabled: f32,\r
    minsigma: f32,\r
    maxsigma: f32,\r
}\r
\r
struct Rgb {\r
    r: f32,\r
    g: f32,\r
    b: f32,\r
}\r
\r
// Cosine gradient procedural palette\r
struct ColorPalette {\r
    a: vec3<f32>,\r
    b: vec3<f32>,\r
    c: vec3<f32>,\r
    d: vec3<f32>,\r
}\r
\r
// Rotation and translation matrices\r
struct IFSTransform {\r
    a: f32,\r
    b: f32,\r
    c: f32,\r
	d: f32,\r
    e: f32,\r
    f: f32,\r
}\r
\r
struct WeightedVariation {\r
    variation: u32,\r
    @size(12) weight: f32,\r
}\r
\r
struct FlamesComponent {\r
	enabled: u32,\r
    colorPaletteIdx: f32,\r
    @size(8) weight: f32,\r
    color: Rgb,\r
    @align(16) transform: IFSTransform,\r
    @align(16) variations: array<WeightedVariation, 16>,\r
}\r
\r
struct SpaceWarp {\r
    zoom: f32,\r
    rotationalSymmetry: u32,\r
    mirrorX: u32,\r
    mirrorY: u32,\r
}\r
\r
struct Flames {\r
    resolution: vec2<u32>,\r
    gammaCorrection: f32,\r
    antialiasing: u32,\r
    renderMode: u32,\r
    @align(16) palette: ColorPalette,\r
    @align(16) spaceWarp: SpaceWarp,\r
    @align(16) densityEstimation: DensityEstimation,\r
    @align(16) finalComponent: FlamesComponent,\r
    components: array<FlamesComponent, 16>,\r
};\r
\r
@group(1) @binding(4) var<uniform> flames: Flames;\r
@group(1) @binding(5) var<uniform> timeElapsed: u32;\r
\r
const maxVariationPerComponent = 16;\r
const maxComponentPerFlames = 16;\r
const iterationPerInvocation = 1000;\r
\r
const pi = 3.1415926;\r
\r
// Local heatmap cached value, to avoid using atomic operation until the end.\r
var<private> localHeatmapMax = 0u;\r
\r
// State of the random number generator\r
var<private> seed: u32 = 0;\r
\r
// Initialize the random number generator with a seed\r
fn initRandom(newSeed: u32) {\r
    seed = newSeed;\r
}\r
\r
fn smu32() -> u32 {\r
    seed = seed + 0x9e3779b9u;\r
    var z: u32 = seed;\r
    z = (z ^ (z >> 15)) * 0x85ebca6bu;\r
    z = (z ^ (z >> 13)) * 0xc2b2ae35u;\r
    return z ^ (z >> 16);\r
}\r
\r
fn smf32() -> f32 {\r
    return abs(f32(smu32())) / abs(f32(4294967296.0));\r
}\r
\r
fn c01(x: f32) -> f32 {\r
    return clamp(x, 0, 1);\r
}\r
\r
fn rotate2d(p: vec2<f32>, offset: vec2<f32>, angle: f32) -> vec2<f32> {\r
	let x = p.x - offset.x;\r
	let y = p.y - offset.y;\r
\r
	let s = sin(angle);\r
	let c = cos(angle);\r
\r
	return vec2<f32>(\r
		x * c - s * y + offset.x,\r
		x * s + c * y + offset.y\r
    );\r
}\r
\r
fn updatePaletteAccumulator(index: u32, colorPaletteIdx: f32) {\r
    var paletteColor = palette(colorPaletteIdx);\r
    var c255 = vec3<u32>(paletteColor * 255);\r
    var colorU32 = atomicLoad(&paletteAccumulator[index]);\r
\r
    var color = vec3<u32>(\r
        colorU32 & 0xFF,\r
        (colorU32 >> 8) & 0xFF,\r
        (colorU32 >> 16) & 0xFF\r
    );\r
\r
    color += c255;\r
    color /= 2;\r
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));\r
    atomicStore(&paletteAccumulator[index], colorU32);\r
}\r
\r
fn updateColorAccumulator(index: u32, newColor: vec3<f32>) {\r
    var colorU32 = atomicLoad(&colorAccumulator[index]);\r
\r
    var color = vec3<u32>(\r
        colorU32 & 0xFF,\r
        (colorU32 >> 8) & 0xFF,\r
        (colorU32 >> 16) & 0xFF\r
    );\r
\r
    color += vec3<u32>(newColor * 255);\r
    color /= 2;\r
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));\r
    atomicStore(&colorAccumulator[index], colorU32);\r
}\r
\r
// Since atomic<f32> isn't allowed, we increase the range of the accumulator from 0-1 to 0-1e4 to keep some precision as a u32.\r
fn updatePaletteIndexAccumulator(index: u32, paletteIndex: f32) {\r
    var palletteIndexU32 = u32(paletteIndex * 1e4);\r
\r
    var newValue = (atomicLoad(&paletteIndexAccumulator[index]) + palletteIndexU32) / 2;\r
    atomicStore(&paletteIndexAccumulator[index], newValue);\r
}\r
\r
// See https://flam3.com/flame_draves.pdf - Appendix: Catalog of Variations\r
fn theta(p: vec2<f32>) -> f32 {\r
    return atan2(p.y, p.x);\r
}\r
\r
fn phi(p: vec2<f32>) -> f32 {\r
    return atan2(p.x, p.y);\r
}\r
\r
fn r(p: vec2<f32>) -> f32 {\r
    return length(p);\r
}\r
\r
fn omega() -> f32 {\r
     if (smf32() < 0.5) {\r
        return 0.;\r
    }\r
\r
    return pi;\r
}\r
\r
fn lambda() -> f32 {\r
    if (smf32() < 0.5) {\r
        return -1.;\r
    }\r
\r
    return 1.;\r
}\r
\r
fn psi() -> f32 {\r
    return smf32();\r
}\r
\r
fn modn(n: f32, m: f32) -> f32 {\r
	return ((n % m) + m) % m;\r
}\r
\r
fn sinusoidalVariation(p: vec2<f32>) -> vec2<f32> {\r
    return sin(p);\r
}\r
\r
fn sphericalVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = length(tp);\r
    let r2 = r * r;\r
    return vec2<f32>(tp.x / r2, tp.y / r2);\r
}\r
\r
fn swirlVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = length(tp);\r
    let r2 = r * r;\r
    let cos = cos(r2);\r
    let sin = sin(r2);\r
    return vec2<f32>(tp.x * sin - tp.y * cos, tp.x * cos + tp.y * sin);\r
}\r
\r
fn horseshoeVariation(p: vec2<f32>) -> vec2<f32> {\r
		let r = length(p);\r
		let invR = 1. / r;\r
		return vec2<f32>(\r
			invR * (p.x + p.y) * (p.x - p.y),\r
			invR * 2. * p.x * p.y\r
    );\r
}\r
\r
fn polarVariation(p: vec2<f32>) -> vec2<f32> {\r
    return vec2<f32>(\r
        theta(p) / pi,\r
        length(p) - 1.\r
    );\r
}\r
\r
fn handkerchieVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        r * sin(theta + r),\r
        r * cos(theta - r)\r
    );\r
}\r
\r
fn heartVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        r * sin(theta * r),\r
        r * -cos(theta * r)\r
    );\r
}\r
\r
fn discVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let f = theta / pi;\r
    return vec2<f32>(\r
        f * sin(pi * r),\r
        f * cos(pi * r)\r
    );\r
}\r
\r
fn spiralVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let invR = 1. / r;\r
    return vec2<f32>(\r
            invR * (cos(theta) + sin(r)),\r
            invR * (sin(theta) - cos(r))\r
    );\r
}\r
\r
\r
fn hyperbolicVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        sin(theta) / r,\r
        r * cos(theta)\r
    );\r
}\r
\r
fn diamondVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    return vec2<f32>(\r
        sin(theta) * cos(r),\r
        sin(r) * cos(theta)\r
    );\r
}\r
\r
fn exVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let p0 = sin(theta + r);\r
    let p1 = cos(theta - r);\r
    let p03 = p0 * p0 * p0;\r
    let p13 = p1 * p1 * p1;\r
\r
    return vec2<f32>(\r
        r * (p03 + p13),\r
        r * (p03 - p13)\r
    );\r
}\r
\r
fn juliaVariation(tp: vec2<f32>) -> vec2<f32> {\r
    let r = r(tp);\r
    let theta = theta(tp);\r
    let omega = omega();\r
    let rSqrt = sqrt(r);\r
\r
    return vec2(\r
        rSqrt * cos(theta / 2. + omega),\r
        rSqrt * sin(theta / 2. + omega)\r
    );\r
}\r
\r
fn bentVariation(p: vec2<f32>) -> vec2<f32> {\r
    if (p.x >= 0 && p.y >= 0) {\r
        return p;\r
    }\r
    if (p.x < 0 && p.y >= 0) {\r
        return vec2<f32>(2 * p.x, p.y);\r
    }\r
    if (p.x >= 0 && p.y < 0)  {\r
        return vec2<f32>(p.x, p.y / 2);\r
    }\r
    return vec2<f32>(2 * p.x, p.y / 2);\r
}\r
\r
fn wavesVariation(p: vec2<f32>, transform: IFSTransform) -> vec2<f32> {\r
    return vec2<f32>(\r
        p.x * transform.b * sin(p.y / (transform.c * transform.c)),\r
        p.y + transform.e * sin(p.x / (transform.f * transform.f))\r
    );\r
}\r
\r
fn fisheyeVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let f = 2. / (r + 1.);\r
    return vec2<f32>(\r
        f * p.x,\r
        f * p.y\r
    );\r
}\r
\r
fn exponentialVariation(p: vec2<f32>) -> vec2<f32> {\r
    let f = exp(p.x - 1);\r
    return vec2<f32>(\r
        f * cos(pi * p.y),\r
        f * sin(pi * p.y)\r
    );\r
}\r
\r
fn powerVariation(p: vec2<f32>) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let f = pow(r, sin(theta));\r
\r
    return vec2<f32>(\r
        f * cos(theta),\r
        f * sin(theta)\r
    );\r
}\r
\r
\r
fn fanVariation(p: vec2<f32>, transform: IFSTransform) -> vec2<f32> {\r
    let r = length(p);\r
    let theta = theta(p);\r
    let t = pi * transform.c * transform.c;\r
    let f = transform.f;\r
\r
    if (modn(theta + f, t) > t / 2) {\r
        return vec2<f32>(\r
            cos(theta - t / 2),\r
            sin(theta - t / 2)\r
        );\r
    }\r
\r
    return vec2<f32>(\r
        r * cos(theta + t / 2),\r
        r * sin(theta + t / 2)\r
    );\r
}\r
\r
fn squareVariation() -> vec2<f32> {\r
    return vec2<f32>(psi() - 0.5, psi() - 0.5);\r
}\r
\r
fn applyVariation(tp: vec2<f32>, variation: WeightedVariation, transform: IFSTransform) -> vec2<f32> {\r
    var result = vec2(0.);\r
\r
    switch (variation.variation) {\r
        case 0: {\r
            result = tp;\r
        }\r
        case 1: {\r
            result = sinusoidalVariation(tp);\r
        }\r
        case 2: {\r
            result = sphericalVariation(tp);\r
        }\r
        case 3: {\r
            result = swirlVariation(tp);\r
        }\r
        case 4: {\r
            result = horseshoeVariation(tp);\r
        }\r
        case 5: {\r
            result = polarVariation(tp);\r
        }\r
        case 6: {\r
            result = handkerchieVariation(tp);\r
        }\r
        case 7: {\r
            result = heartVariation(tp);\r
        }\r
        case 8: {\r
            result = discVariation(tp);\r
        }\r
        case 9: {\r
            result = spiralVariation(tp);\r
        }\r
        case 10: {\r
            result = hyperbolicVariation(tp);\r
        }\r
        case 11: {\r
            result = diamondVariation(tp);\r
        }\r
        case 12: {\r
            result = exVariation(tp);\r
        }\r
        case 13: {\r
            result = juliaVariation(tp);\r
        }\r
        case 14: {\r
            result = bentVariation(tp);\r
        }\r
        case 15: {\r
            result = wavesVariation(tp, transform);\r
        }\r
        case 16: {\r
            result = fisheyeVariation(tp);\r
        }\r
        case 17: {\r
            result = exponentialVariation(tp);\r
        }\r
        case 18: {\r
            result = powerVariation(tp);\r
        }\r
        case 19: {\r
            result = fanVariation(tp, transform);\r
        }\r
        case 20: {\r
            result = squareVariation();\r
        }\r
        default: {\r
            result = tp; \r
        }\r
    }\r
    return result;\r
}\r
\r
fn palette(t: f32) -> vec3<f32> {\r
    let p = flames.palette;\r
    return vec3<f32>(\r
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),\r
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),\r
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),\r
    );\r
}\r
\r
fn randomComponentIdx() -> u32 {\r
    let r = smf32();\r
    var accumulator = 0.;\r
    var i = 0u;\r
\r
    for (; i < maxComponentPerFlames; i++) {\r
        if flames.components[i].enabled == 0 {\r
            break;\r
        }\r
\r
        accumulator += flames.components[i].weight;\r
        if accumulator >= r {\r
            return i;\r
        }\r
    }\r
\r
    return i - 1;\r
}\r
\r
fn applyComponent(p: vec2<f32>, component: FlamesComponent) -> vec2<f32> {\r
    var newP = vec2(0.);\r
    let transform = component.transform;\r
    let tp = vec2<f32>(\r
        transform.a * p.x + transform.b * p.y + transform.c,\r
        transform.d * p.x + transform.e * p.y + transform.f\r
    );\r
\r
    for (var i = 0; i < maxVariationPerComponent; i++) {\r
        let vp = applyVariation(tp, component.variations[i], transform);\r
\r
        newP += vp * component.variations[i].weight;\r
    }\r
\r
    return newP;\r
}\r
\r
fn applyFlames(p: vec2<f32>, componentIdx: u32) -> vec2<f32> {\r
    let newP = applyComponent(p, flames.components[componentIdx]);\r
    return newP;\r
    return applyComponent(p, flames.finalComponent);\r
}\r
\r
fn applyMirror(p: vec2<f32>, localIteration: u32) -> vec2<f32> {\r
    let mX = flames.spaceWarp.mirrorX;\r
	let mY = flames.spaceWarp.mirrorY;\r
\r
	if (mX == 0 && mY == 0) {\r
        return p;\r
    }\r
\r
    if (mY == 0 && mX == 1) {\r
        if (localIteration % 2 == 0) {\r
            return vec2<f32>(p.x, p.y);\r
        }\r
        return vec2<f32>(p.x, -p.y);\r
    }\r
\r
    if (mY == 1 && mX == 0) {\r
         if (localIteration % 2 == 0) {\r
            return vec2<f32>(p.x, p.y);\r
        }\r
        return vec2<f32>(-p.x, p.y);\r
    }\r
\r
    if (localIteration % 4 == 0) {\r
        return vec2<f32>(-p.x, p.y);\r
    }\r
\r
    if (localIteration % 3 == 0) {\r
        return vec2<f32>(-p.x, -p.y);\r
    }\r
\r
    if (localIteration % 2 == 0) {\r
        return vec2<f32>(p.x, -p.y);\r
    }\r
\r
    return p;\r
}\r
\r
fn worldCoordinatesToPixels(p: vec2<f32>, resolution: vec2<u32>, rotation: f32) -> vec2<u32> {\r
    let pixel = vec2<f32>(\r
        (p.x + 2. * (f32(resolution.x) / f32(resolution.y))) * (f32(resolution.y) / 4.),\r
        (p.y + 2.) * (f32(resolution.y) / 4.)\r
    );\r
\r
    if (flames.spaceWarp.rotationalSymmetry == 1) {\r
		return vec2<u32>(round(pixel));\r
    }\r
\r
	let rPixel = rotate2d(pixel, vec2<f32>(resolution) / 2., rotation);\r
\r
    return vec2<u32>(round(rPixel));\r
}\r
\r
fn updateRenderData(pixel: vec2<u32>, componentIdx: u32) {\r
    let component = flames.components[componentIdx];\r
    let colorPaletteIdx = component.colorPaletteIdx;\r
    let idx = pixel.y * flames.resolution.x + pixel.x;\r
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;\r
    \r
    updatePaletteAccumulator(idx, colorPaletteIdx);\r
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));\r
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);\r
\r
    if flames.antialiasing == 0 && localHeatmapMax < bucketValue {\r
        localHeatmapMax = bucketValue;\r
    }\r
}\r
\r
fn updateRenderData3x(pixel: vec2<u32>, componentIdx: u32) {\r
    let component = flames.components[componentIdx];\r
    let colorPaletteIdx = component.colorPaletteIdx;\r
    const hOffset = 1920u * 1080u;\r
\r
    let idx = pixel.y * flames.resolution.x * 3u + pixel.x + hOffset;\r
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;\r
\r
    updatePaletteAccumulator(idx, colorPaletteIdx);\r
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));\r
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);\r
   \r
    if flames.antialiasing != 0 {\r
        let bucketX = (pixel.x - pixel.x % 3) / 3;\r
        let bucketY = (pixel.y - pixel.y % 3) / 3;\r
        let hidx = 3 * bucketX + 3 * bucketY * flames.resolution.x * 3 + hOffset;\r
\r
        bucketValue = (atomicLoad(&heatmap[hidx]) + atomicLoad(&heatmap[hidx + 1]) + atomicLoad(&heatmap[hidx + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 2])) / 9;\r
    \r
        if localHeatmapMax < bucketValue {\r
            localHeatmapMax = bucketValue;\r
        }\r
    }\r
}\r
\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    initRandom(timeElapsed * ((global_invocation_id.x << 16) | global_invocation_id.y));\r
\r
    var rotation = 1.;\r
\r
    // With current implementation, only up to 64 rotation can be enabled\r
    if (flames.spaceWarp.rotationalSymmetry != 1) {\r
        let localId = f32(8 * local_invocation_id.x + local_invocation_id.y + 1);\r
        rotation = localId * (2. * pi) / f32(flames.spaceWarp.rotationalSymmetry);\r
        rotation = rotation % (2. * pi);\r
    }\r
\r
    let res3x = 3 * flames.resolution;\r
    var p = vec2(0.);\r
\r
    for (var i = 0u; i < iterationPerInvocation; i++) {\r
        var componentIdx = randomComponentIdx();\r
\r
        p = applyFlames(p, componentIdx);\r
\r
        p *= flames.spaceWarp.zoom;\r
        p = applyMirror(p, i);\r
\r
        let pixel3x = worldCoordinatesToPixels(p, res3x, rotation);\r
        let pixel = worldCoordinatesToPixels(p, flames.resolution, rotation);\r
\r
        if i > 20 && pixel3x.x > 0 && pixel3x.x < res3x.x && pixel3x.y > 0 && pixel3x.y < res3x.y {\r
           updateRenderData3x(pixel3x, componentIdx);\r
        }\r
\r
        if i > 20 && pixel.x > 0 && pixel.x < flames.resolution.x && pixel.y > 0 && pixel.y < flames.resolution.y {\r
            updateRenderData(pixel, componentIdx);\r
        }\r
    }\r
\r
    atomicMax(&heatmapMax, localHeatmapMax);\r
}  `,st=`@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;\r
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;\r
@group(0) @binding(2) var<storage, read_write> image: array<u32>;\r
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;\r
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;\r
\r
@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;\r
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;\r
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;\r
\r
@compute @workgroup_size(8, 8)\r
fn main(\r
    @builtin(workgroup_id) workgroup_id: vec3<u32>,\r
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,\r
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,\r
    @builtin(local_invocation_index) local_invocation_index: u32,\r
    @builtin(num_workgroups) num_workgroups: vec3<u32>\r
) {\r
    heatmapMax = 0;\r
    let x = global_invocation_id.x;\r
    let y = global_invocation_id.y;\r
    let idx = (x + y * 1920u) * 10;\r
\r
    for (var i = 0u; i < 10; i++) {\r
        pixels[idx + i] = 0;\r
        heatmap[idx + i] = 0;\r
        colorAccumulator[idx + i] = 0;\r
        paletteAccumulator[idx + i] = 0;\r
        paletteIndexAccumulator[idx + i] = 0;\r
    }\r
}  `;function de(r){return{heatmap:new Uint32Array(r),heatmapMax:0,pixels:new Uint8ClampedArray(r*4),colorAccumulator:new Uint32Array(r),paletteAccumulator:new Uint32Array(r),colorPaletteIndexAccumulator:new Float32Array(r)}}function H(r){r.heatmapMax=0,r.pixels.fill(0),r.heatmap.fill(0),r.colorAccumulator.fill(0),r.paletteAccumulator.fill(0),r.colorPaletteIndexAccumulator.fill(0)}const at=r=>r.createBindGroupLayout({entries:Array.from({length:8},(e,t)=>({binding:t,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}))});function it(r){const e=at(r),t=r.createBuffer({size:4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),n=r.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),s=r.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),i=r.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),c=r.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),h=r.createBuffer({size:1920*1080*4*10,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),f=r.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),p=r.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),m=r.createBindGroup({layout:e,entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:n}},{binding:2,resource:{buffer:f}},{binding:3,resource:{buffer:t}},{binding:4,resource:{buffer:p}},{binding:5,resource:{buffer:i}},{binding:6,resource:{buffer:c}},{binding:7,resource:{buffer:h}}]});return{bindgroupLayout:e,bindgroup:m,buffers:{pixels:n,heatmap:s,heatmapMax:t,finalImage:f,blurredImage:p,paletteIndexAccumulator:i,colorAccumulator:c,colorPaletteAccumulator:h}}}const ee=(r,e)=>((r+e-1)/e|0)*e;function ot(r){return Object.keys(r)}function ut(r,e){return new Array(r).fill(0).map((t,n)=>e(n))}const _e=r=>r&&typeof r.length=="number"&&r.buffer instanceof ArrayBuffer&&typeof r.byteLength=="number",d={i32:{numElements:1,align:4,size:4,type:"i32",View:Int32Array},u32:{numElements:1,align:4,size:4,type:"u32",View:Uint32Array},f32:{numElements:1,align:4,size:4,type:"f32",View:Float32Array},f16:{numElements:1,align:2,size:2,type:"u16",View:Uint16Array},vec2f:{numElements:2,align:8,size:8,type:"f32",View:Float32Array},vec2i:{numElements:2,align:8,size:8,type:"i32",View:Int32Array},vec2u:{numElements:2,align:8,size:8,type:"u32",View:Uint32Array},vec2h:{numElements:2,align:4,size:4,type:"u16",View:Uint16Array},vec3i:{numElements:3,align:16,size:12,type:"i32",View:Int32Array},vec3u:{numElements:3,align:16,size:12,type:"u32",View:Uint32Array},vec3f:{numElements:3,align:16,size:12,type:"f32",View:Float32Array},vec3h:{numElements:3,align:8,size:6,type:"u16",View:Uint16Array},vec4i:{numElements:4,align:16,size:16,type:"i32",View:Int32Array},vec4u:{numElements:4,align:16,size:16,type:"u32",View:Uint32Array},vec4f:{numElements:4,align:16,size:16,type:"f32",View:Float32Array},vec4h:{numElements:4,align:8,size:8,type:"u16",View:Uint16Array},mat2x2f:{numElements:4,align:8,size:16,type:"f32",View:Float32Array},mat2x2h:{numElements:4,align:4,size:8,type:"u16",View:Uint16Array},mat3x2f:{numElements:6,align:8,size:24,type:"f32",View:Float32Array},mat3x2h:{numElements:6,align:4,size:12,type:"u16",View:Uint16Array},mat4x2f:{numElements:8,align:8,size:32,type:"f32",View:Float32Array},mat4x2h:{numElements:8,align:4,size:16,type:"u16",View:Uint16Array},mat2x3f:{numElements:8,align:16,size:32,pad:[3,1],type:"f32",View:Float32Array},mat2x3h:{numElements:8,align:8,size:16,pad:[3,1],type:"u16",View:Uint16Array},mat3x3f:{numElements:12,align:16,size:48,pad:[3,1],type:"f32",View:Float32Array},mat3x3h:{numElements:12,align:8,size:24,pad:[3,1],type:"u16",View:Uint16Array},mat4x3f:{numElements:16,align:16,size:64,pad:[3,1],type:"f32",View:Float32Array},mat4x3h:{numElements:16,align:8,size:32,pad:[3,1],type:"u16",View:Uint16Array},mat2x4f:{numElements:8,align:16,size:32,type:"f32",View:Float32Array},mat2x4h:{numElements:8,align:8,size:16,type:"u16",View:Uint16Array},mat3x4f:{numElements:12,align:16,size:48,pad:[3,1],type:"f32",View:Float32Array},mat3x4h:{numElements:12,align:8,size:24,pad:[3,1],type:"u16",View:Uint16Array},mat4x4f:{numElements:16,align:16,size:64,type:"f32",View:Float32Array},mat4x4h:{numElements:16,align:8,size:32,type:"u16",View:Uint16Array},bool:{numElements:0,align:1,size:0,type:"bool",View:Uint32Array}},F={...d,"atomic<i32>":d.i32,"atomic<u32>":d.u32,"vec2<i32>":d.vec2i,"vec2<u32>":d.vec2u,"vec2<f32>":d.vec2f,"vec2<f16>":d.vec2h,"vec3<i32>":d.vec3i,"vec3<u32>":d.vec3u,"vec3<f32>":d.vec3f,"vec3<f16>":d.vec3h,"vec4<i32>":d.vec4i,"vec4<u32>":d.vec4u,"vec4<f32>":d.vec4f,"vec4<f16>":d.vec4h,"mat2x2<f32>":d.mat2x2f,"mat2x2<f16>":d.mat2x2h,"mat3x2<f32>":d.mat3x2f,"mat3x2<f16>":d.mat3x2h,"mat4x2<f32>":d.mat4x2f,"mat4x2<f16>":d.mat4x2h,"mat2x3<f32>":d.mat2x3f,"mat2x3<f16>":d.mat2x3h,"mat3x3<f32>":d.mat3x3f,"mat3x3<f16>":d.mat3x3h,"mat4x3<f32>":d.mat4x3f,"mat4x3<f16>":d.mat4x3h,"mat2x4<f32>":d.mat2x4f,"mat2x4<f16>":d.mat2x4h,"mat3x4<f32>":d.mat3x4f,"mat3x4<f16>":d.mat3x4h,"mat4x4<f32>":d.mat4x4f,"mat4x4<f16>":d.mat4x4h},ct=ot(F);function lt(r=[],e){const t=new Set;for(const n of ct){const s=F[n];t.has(s)||(t.add(s),s.flatten=r.includes(n)?e:!e)}}lt();function ht(r){const e=r;if(e.elementType)return e.size;{const n=r,s=e.numElements||1;if(n.fields)return r.size*s;{const i=r,{align:c}=F[i.type];return s>1?ee(r.size,c)*s:r.size}}}function ge(r,e,t,n){const{size:s,type:i}=r;try{const{View:c,align:h}=F[i],f=n!==void 0,p=f?ee(s,h):s,m=p/c.BYTES_PER_ELEMENT,w=f?n===0?(e.byteLength-t)/p:n:1;return new c(e,t,m*w)}catch{throw new Error(`unknown type: ${i}`)}}function ft(r){return!r.fields&&!r.elementType}function pt(r,e,t){const n=t||0,s=e||new ArrayBuffer(ht(r)),i=(c,h)=>{const f=c,p=f.elementType;if(p){if(ft(p)&&F[p.type].flatten)return ge(p,s,h,f.numElements);{const{size:m}=xe(c),w=f.numElements===0?(s.byteLength-h)/m:f.numElements;return ut(w,D=>i(p,h+m*D))}}else{if(typeof c=="string")throw Error("unreachable");{const m=c.fields;if(m){const w={};for(const[D,{type:lr,offset:hr}]of Object.entries(m))w[D]=i(lr,h+hr);return w}else return ge(c,s,h)}}};return{views:i(r,n),arrayBuffer:s}}function te(r,e){if(r!==void 0)if(_e(e)){const t=e;if(t.length===1&&typeof r=="number")t[0]=r;else if(Array.isArray(r[0])||_e(r[0])){const n=r[0].length,s=n===3?4:n;for(let i=0;i<r.length;++i){const c=i*s;t.set(r[i],c)}}else t.set(r)}else if(Array.isArray(e)){const t=e;r.forEach((n,s)=>{te(n,t[s])})}else{const t=e;for(const[n,s]of Object.entries(r)){const i=t[n];i&&te(s,i)}}}function ye(r,e,t=0){const n=r,s=n.group===void 0?r:n.typeDefinition,i=pt(s,e,t);return{...i,set(c){te(c,i.views)}}}function re(r){const t=r.elementType;if(t)return re(t);const s=r.fields;if(s)return Object.values(s).reduce((h,{type:f})=>Math.max(h,re(f)),0);const{type:i}=r,{align:c}=F[i];return c}function xe(r){const t=r.elementType;if(t){const i=t.size,c=re(t);return{unalignedSize:i,align:c,size:ee(i,c)}}const s=r.fields;if(s){const i=Object.values(s).pop();if(i.type.size===0)return xe(i.type)}return{size:0,unalignedSize:0,align:1}}class mt{constructor(){this.constants=new Map,this.aliases=new Map,this.structs=new Map}}class S{constructor(){}get isAstNode(){return!0}get astNodeType(){return""}evaluate(e){throw new Error("Cannot evaluate node")}evaluateString(e){return this.evaluate(e).toString()}search(e){}searchBlock(e,t){if(e){t(j.instance);for(const n of e)n instanceof Array?this.searchBlock(n,t):n.search(t);t(X.instance)}}}class j extends S{}j.instance=new j;class X extends S{}X.instance=new X;class _ extends S{constructor(){super()}}class ne extends _{constructor(e,t,n,s){super(),this.name=e,this.args=t,this.returnType=n,this.body=s}get astNodeType(){return"function"}search(e){this.searchBlock(this.body,e)}}class dt extends _{constructor(e){super(),this.expression=e}get astNodeType(){return"staticAssert"}search(e){this.expression.search(e)}}class _t extends _{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"while"}search(e){this.condition.search(e),this.searchBlock(this.body,e)}}class gt extends _{constructor(e){super(),this.body=e}get astNodeType(){return"continuing"}search(e){this.searchBlock(this.body,e)}}class yt extends _{constructor(e,t,n,s){super(),this.init=e,this.condition=t,this.increment=n,this.body=s}get astNodeType(){return"for"}search(e){var t,n,s;(t=this.init)===null||t===void 0||t.search(e),(n=this.condition)===null||n===void 0||n.search(e),(s=this.increment)===null||s===void 0||s.search(e),this.searchBlock(this.body,e)}}class I extends _{constructor(e,t,n,s,i){super(),this.name=e,this.type=t,this.storage=n,this.access=s,this.value=i}get astNodeType(){return"var"}search(e){var t;e(this),(t=this.value)===null||t===void 0||t.search(e)}}class we extends _{constructor(e,t,n){super(),this.name=e,this.type=t,this.value=n}get astNodeType(){return"override"}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}class se extends _{constructor(e,t,n,s,i){super(),this.name=e,this.type=t,this.storage=n,this.access=s,this.value=i}get astNodeType(){return"let"}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}class ve extends _{constructor(e,t,n,s,i){super(),this.name=e,this.type=t,this.storage=n,this.access=s,this.value=i}get astNodeType(){return"const"}evaluate(e){return this.value.evaluate(e)}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}var U;(function(r){r.increment="++",r.decrement="--"})(U||(U={})),function(r){function e(t){const n=t;if(n=="parse")throw new Error("Invalid value for IncrementOperator");return r[n]}r.parse=e}(U||(U={}));class xt extends _{constructor(e,t){super(),this.operator=e,this.variable=t}get astNodeType(){return"increment"}search(e){this.variable.search(e)}}var L;(function(r){r.assign="=",r.addAssign="+=",r.subtractAssin="-=",r.multiplyAssign="*=",r.divideAssign="/=",r.moduloAssign="%=",r.andAssign="&=",r.orAssign="|=",r.xorAssign="^=",r.shiftLeftAssign="<<=",r.shiftRightAssign=">>="})(L||(L={})),function(r){function e(t){const n=t;if(n=="parse")throw new Error("Invalid value for AssignOperator");return n}r.parse=e}(L||(L={}));class wt extends _{constructor(e,t,n){super(),this.operator=e,this.variable=t,this.value=n}get astNodeType(){return"assign"}search(e){this.value.search(e)}}class vt extends _{constructor(e,t){super(),this.name=e,this.args=t}get astNodeType(){return"call"}}class kt extends _{constructor(e,t){super(),this.body=e,this.continuing=t}get astNodeType(){return"loop"}}class bt extends _{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"body"}}class At extends _{constructor(e,t,n,s){super(),this.condition=e,this.body=t,this.elseif=n,this.else=s}get astNodeType(){return"if"}search(e){this.condition.search(e),this.searchBlock(this.body,e),this.searchBlock(this.elseif,e),this.searchBlock(this.else,e)}}class St extends _{constructor(e){super(),this.value=e}get astNodeType(){return"return"}search(e){var t;(t=this.value)===null||t===void 0||t.search(e)}}class Tt extends _{constructor(e){super(),this.name=e}get astNodeType(){return"enable"}}class ke extends _{constructor(e,t){super(),this.name=e,this.type=t}get astNodeType(){return"alias"}}class It extends _{constructor(){super()}get astNodeType(){return"discard"}}class Et extends _{constructor(){super()}get astNodeType(){return"break"}}class zt extends _{constructor(){super()}get astNodeType(){return"continue"}}class E extends _{constructor(e){super(),this.name=e}get astNodeType(){return"type"}get isStruct(){return!1}get isArray(){return!1}}class z extends E{constructor(e,t){super(e),this.members=t}get astNodeType(){return"struct"}get isStruct(){return!0}getMemberIndex(e){for(let t=0;t<this.members.length;t++)if(this.members[t].name==e)return t;return-1}}class be extends E{constructor(e,t,n){super(e),this.format=t,this.access=n}get astNodeType(){return"template"}}class Vt extends E{constructor(e,t,n,s){super(e),this.storage=t,this.type=n,this.access=s}get astNodeType(){return"pointer"}}class Ae extends E{constructor(e,t,n,s){super(e),this.attributes=t,this.format=n,this.count=s}get astNodeType(){return"array"}get isArray(){return!0}}class W extends E{constructor(e,t,n){super(e),this.format=t,this.access=n}get astNodeType(){return"sampler"}}class b extends S{constructor(){super()}}class Se extends b{constructor(e){super(),this.value=e}get astNodeType(){return"stringExpr"}toString(){return this.value}evaluateString(){return this.value}}class Y extends b{constructor(e,t){super(),this.type=e,this.args=t}get astNodeType(){return"createExpr"}}class Te extends b{constructor(e,t){super(),this.name=e,this.args=t}get astNodeType(){return"callExpr"}evaluate(e){switch(this.name){case"abs":return Math.abs(this.args[0].evaluate(e));case"acos":return Math.acos(this.args[0].evaluate(e));case"acosh":return Math.acosh(this.args[0].evaluate(e));case"asin":return Math.asin(this.args[0].evaluate(e));case"asinh":return Math.asinh(this.args[0].evaluate(e));case"atan":return Math.atan(this.args[0].evaluate(e));case"atan2":return Math.atan2(this.args[0].evaluate(e),this.args[1].evaluate(e));case"atanh":return Math.atanh(this.args[0].evaluate(e));case"ceil":return Math.ceil(this.args[0].evaluate(e));case"clamp":return Math.min(Math.max(this.args[0].evaluate(e),this.args[1].evaluate(e)),this.args[2].evaluate(e));case"cos":return Math.cos(this.args[0].evaluate(e));case"degrees":return this.args[0].evaluate(e)*180/Math.PI;case"distance":return Math.sqrt(Math.pow(this.args[0].evaluate(e)-this.args[1].evaluate(e),2));case"dot":case"exp":return Math.exp(this.args[0].evaluate(e));case"exp2":return Math.pow(2,this.args[0].evaluate(e));case"floor":return Math.floor(this.args[0].evaluate(e));case"fma":return this.args[0].evaluate(e)*this.args[1].evaluate(e)+this.args[2].evaluate(e);case"fract":return this.args[0].evaluate(e)-Math.floor(this.args[0].evaluate(e));case"inverseSqrt":return 1/Math.sqrt(this.args[0].evaluate(e));case"log":return Math.log(this.args[0].evaluate(e));case"log2":return Math.log2(this.args[0].evaluate(e));case"max":return Math.max(this.args[0].evaluate(e),this.args[1].evaluate(e));case"min":return Math.min(this.args[0].evaluate(e),this.args[1].evaluate(e));case"mix":return this.args[0].evaluate(e)*(1-this.args[2].evaluate(e))+this.args[1].evaluate(e)*this.args[2].evaluate(e);case"modf":return this.args[0].evaluate(e)-Math.floor(this.args[0].evaluate(e));case"pow":return Math.pow(this.args[0].evaluate(e),this.args[1].evaluate(e));case"radians":return this.args[0].evaluate(e)*Math.PI/180;case"round":return Math.round(this.args[0].evaluate(e));case"sign":return Math.sign(this.args[0].evaluate(e));case"sin":return Math.sin(this.args[0].evaluate(e));case"sinh":return Math.sinh(this.args[0].evaluate(e));case"saturate":return Math.min(Math.max(this.args[0].evaluate(e),0),1);case"smoothstep":return this.args[0].evaluate(e)*this.args[0].evaluate(e)*(3-2*this.args[0].evaluate(e));case"sqrt":return Math.sqrt(this.args[0].evaluate(e));case"step":return this.args[0].evaluate(e)<this.args[1].evaluate(e)?0:1;case"tan":return Math.tan(this.args[0].evaluate(e));case"tanh":return Math.tanh(this.args[0].evaluate(e));case"trunc":return Math.trunc(this.args[0].evaluate(e));default:throw new Error("Non const function: "+this.name)}}search(e){for(const t of this.args)t.search(e);e(this)}}class Ie extends b{constructor(e){super(),this.name=e}get astNodeType(){return"varExpr"}search(e){e(this)}}class Ee extends b{constructor(e,t){super(),this.name=e,this.initializer=t}get astNodeType(){return"constExpr"}evaluate(e){var t,n;if(this.initializer instanceof Y){const s=(t=this.postfix)===null||t===void 0?void 0:t.evaluateString(e),i=(n=this.initializer.type)===null||n===void 0?void 0:n.name,c=e.structs.get(i),h=c==null?void 0:c.getMemberIndex(s);if(h!=-1)return this.initializer.args[h].evaluate(e);console.log(h)}return this.initializer.evaluate(e)}search(e){this.initializer.search(e)}}class ze extends b{constructor(e){super(),this.value=e}get astNodeType(){return"literalExpr"}evaluate(){return this.value}}class Mt extends b{constructor(e,t){super(),this.type=e,this.value=t}get astNodeType(){return"bitcastExpr"}search(e){this.value.search(e)}}class Pt extends b{constructor(e,t){super(),this.type=e,this.args=t}get astNodeType(){return"typecastExpr"}evaluate(e){return this.args[0].evaluate(e)}search(e){this.searchBlock(this.args,e)}}class Ve extends b{constructor(e){super(),this.contents=e}get astNodeType(){return"groupExpr"}evaluate(e){return this.contents[0].evaluate(e)}search(e){this.searchBlock(this.contents,e)}}class Me extends b{constructor(){super()}}class Ft extends Me{constructor(e,t){super(),this.operator=e,this.right=t}get astNodeType(){return"unaryOp"}evaluate(e){switch(this.operator){case"+":return this.right.evaluate(e);case"-":return-this.right.evaluate(e);case"!":return this.right.evaluate(e)?0:1;case"~":return~this.right.evaluate(e);default:throw new Error("Unknown unary operator: "+this.operator)}}search(e){this.right.search(e)}}class A extends Me{constructor(e,t,n){super(),this.operator=e,this.left=t,this.right=n}get astNodeType(){return"binaryOp"}evaluate(e){switch(this.operator){case"+":return this.left.evaluate(e)+this.right.evaluate(e);case"-":return this.left.evaluate(e)-this.right.evaluate(e);case"*":return this.left.evaluate(e)*this.right.evaluate(e);case"/":return this.left.evaluate(e)/this.right.evaluate(e);case"%":return this.left.evaluate(e)%this.right.evaluate(e);case"==":return this.left.evaluate(e)==this.right.evaluate(e)?1:0;case"!=":return this.left.evaluate(e)!=this.right.evaluate(e)?1:0;case"<":return this.left.evaluate(e)<this.right.evaluate(e)?1:0;case">":return this.left.evaluate(e)>this.right.evaluate(e)?1:0;case"<=":return this.left.evaluate(e)<=this.right.evaluate(e)?1:0;case">=":return this.left.evaluate(e)>=this.right.evaluate(e)?1:0;case"&&":return this.left.evaluate(e)&&this.right.evaluate(e)?1:0;case"||":return this.left.evaluate(e)||this.right.evaluate(e)?1:0;default:throw new Error(`Unknown operator ${this.operator}`)}}search(e){this.left.search(e),this.right.search(e)}}class Pe extends S{constructor(){super()}}class Ut extends Pe{constructor(e,t){super(),this.selector=e,this.body=t}get astNodeType(){return"case"}search(e){this.searchBlock(this.body,e)}}class Ct extends Pe{constructor(e){super(),this.body=e}get astNodeType(){return"default"}search(e){this.searchBlock(this.body,e)}}class Bt extends S{constructor(e,t,n){super(),this.name=e,this.type=t,this.attributes=n}get astNodeType(){return"argument"}}class qt extends S{constructor(e,t){super(),this.condition=e,this.body=t}get astNodeType(){return"elseif"}search(e){this.condition.search(e),this.searchBlock(this.body,e)}}class Nt extends S{constructor(e,t,n){super(),this.name=e,this.type=t,this.attributes=n}get astNodeType(){return"member"}}class Fe extends S{constructor(e,t){super(),this.name=e,this.value=t}get astNodeType(){return"attribute"}}var l,o;(function(r){r[r.token=0]="token",r[r.keyword=1]="keyword",r[r.reserved=2]="reserved"})(o||(o={}));class u{constructor(e,t,n){this.name=e,this.type=t,this.rule=n}toString(){return this.name}}class a{}l=a,a.none=new u("",o.reserved,""),a.eof=new u("EOF",o.token,""),a.reserved={asm:new u("asm",o.reserved,"asm"),bf16:new u("bf16",o.reserved,"bf16"),do:new u("do",o.reserved,"do"),enum:new u("enum",o.reserved,"enum"),f16:new u("f16",o.reserved,"f16"),f64:new u("f64",o.reserved,"f64"),handle:new u("handle",o.reserved,"handle"),i8:new u("i8",o.reserved,"i8"),i16:new u("i16",o.reserved,"i16"),i64:new u("i64",o.reserved,"i64"),mat:new u("mat",o.reserved,"mat"),premerge:new u("premerge",o.reserved,"premerge"),regardless:new u("regardless",o.reserved,"regardless"),typedef:new u("typedef",o.reserved,"typedef"),u8:new u("u8",o.reserved,"u8"),u16:new u("u16",o.reserved,"u16"),u64:new u("u64",o.reserved,"u64"),unless:new u("unless",o.reserved,"unless"),using:new u("using",o.reserved,"using"),vec:new u("vec",o.reserved,"vec"),void:new u("void",o.reserved,"void")},a.keywords={array:new u("array",o.keyword,"array"),atomic:new u("atomic",o.keyword,"atomic"),bool:new u("bool",o.keyword,"bool"),f32:new u("f32",o.keyword,"f32"),i32:new u("i32",o.keyword,"i32"),mat2x2:new u("mat2x2",o.keyword,"mat2x2"),mat2x3:new u("mat2x3",o.keyword,"mat2x3"),mat2x4:new u("mat2x4",o.keyword,"mat2x4"),mat3x2:new u("mat3x2",o.keyword,"mat3x2"),mat3x3:new u("mat3x3",o.keyword,"mat3x3"),mat3x4:new u("mat3x4",o.keyword,"mat3x4"),mat4x2:new u("mat4x2",o.keyword,"mat4x2"),mat4x3:new u("mat4x3",o.keyword,"mat4x3"),mat4x4:new u("mat4x4",o.keyword,"mat4x4"),ptr:new u("ptr",o.keyword,"ptr"),sampler:new u("sampler",o.keyword,"sampler"),sampler_comparison:new u("sampler_comparison",o.keyword,"sampler_comparison"),struct:new u("struct",o.keyword,"struct"),texture_1d:new u("texture_1d",o.keyword,"texture_1d"),texture_2d:new u("texture_2d",o.keyword,"texture_2d"),texture_2d_array:new u("texture_2d_array",o.keyword,"texture_2d_array"),texture_3d:new u("texture_3d",o.keyword,"texture_3d"),texture_cube:new u("texture_cube",o.keyword,"texture_cube"),texture_cube_array:new u("texture_cube_array",o.keyword,"texture_cube_array"),texture_multisampled_2d:new u("texture_multisampled_2d",o.keyword,"texture_multisampled_2d"),texture_storage_1d:new u("texture_storage_1d",o.keyword,"texture_storage_1d"),texture_storage_2d:new u("texture_storage_2d",o.keyword,"texture_storage_2d"),texture_storage_2d_array:new u("texture_storage_2d_array",o.keyword,"texture_storage_2d_array"),texture_storage_3d:new u("texture_storage_3d",o.keyword,"texture_storage_3d"),texture_depth_2d:new u("texture_depth_2d",o.keyword,"texture_depth_2d"),texture_depth_2d_array:new u("texture_depth_2d_array",o.keyword,"texture_depth_2d_array"),texture_depth_cube:new u("texture_depth_cube",o.keyword,"texture_depth_cube"),texture_depth_cube_array:new u("texture_depth_cube_array",o.keyword,"texture_depth_cube_array"),texture_depth_multisampled_2d:new u("texture_depth_multisampled_2d",o.keyword,"texture_depth_multisampled_2d"),texture_external:new u("texture_external",o.keyword,"texture_external"),u32:new u("u32",o.keyword,"u32"),vec2:new u("vec2",o.keyword,"vec2"),vec3:new u("vec3",o.keyword,"vec3"),vec4:new u("vec4",o.keyword,"vec4"),bitcast:new u("bitcast",o.keyword,"bitcast"),block:new u("block",o.keyword,"block"),break:new u("break",o.keyword,"break"),case:new u("case",o.keyword,"case"),continue:new u("continue",o.keyword,"continue"),continuing:new u("continuing",o.keyword,"continuing"),default:new u("default",o.keyword,"default"),discard:new u("discard",o.keyword,"discard"),else:new u("else",o.keyword,"else"),enable:new u("enable",o.keyword,"enable"),fallthrough:new u("fallthrough",o.keyword,"fallthrough"),false:new u("false",o.keyword,"false"),fn:new u("fn",o.keyword,"fn"),for:new u("for",o.keyword,"for"),function:new u("function",o.keyword,"function"),if:new u("if",o.keyword,"if"),let:new u("let",o.keyword,"let"),const:new u("const",o.keyword,"const"),loop:new u("loop",o.keyword,"loop"),while:new u("while",o.keyword,"while"),private:new u("private",o.keyword,"private"),read:new u("read",o.keyword,"read"),read_write:new u("read_write",o.keyword,"read_write"),return:new u("return",o.keyword,"return"),storage:new u("storage",o.keyword,"storage"),switch:new u("switch",o.keyword,"switch"),true:new u("true",o.keyword,"true"),alias:new u("alias",o.keyword,"alias"),type:new u("type",o.keyword,"type"),uniform:new u("uniform",o.keyword,"uniform"),var:new u("var",o.keyword,"var"),override:new u("override",o.keyword,"override"),workgroup:new u("workgroup",o.keyword,"workgroup"),write:new u("write",o.keyword,"write"),r8unorm:new u("r8unorm",o.keyword,"r8unorm"),r8snorm:new u("r8snorm",o.keyword,"r8snorm"),r8uint:new u("r8uint",o.keyword,"r8uint"),r8sint:new u("r8sint",o.keyword,"r8sint"),r16uint:new u("r16uint",o.keyword,"r16uint"),r16sint:new u("r16sint",o.keyword,"r16sint"),r16float:new u("r16float",o.keyword,"r16float"),rg8unorm:new u("rg8unorm",o.keyword,"rg8unorm"),rg8snorm:new u("rg8snorm",o.keyword,"rg8snorm"),rg8uint:new u("rg8uint",o.keyword,"rg8uint"),rg8sint:new u("rg8sint",o.keyword,"rg8sint"),r32uint:new u("r32uint",o.keyword,"r32uint"),r32sint:new u("r32sint",o.keyword,"r32sint"),r32float:new u("r32float",o.keyword,"r32float"),rg16uint:new u("rg16uint",o.keyword,"rg16uint"),rg16sint:new u("rg16sint",o.keyword,"rg16sint"),rg16float:new u("rg16float",o.keyword,"rg16float"),rgba8unorm:new u("rgba8unorm",o.keyword,"rgba8unorm"),rgba8unorm_srgb:new u("rgba8unorm_srgb",o.keyword,"rgba8unorm_srgb"),rgba8snorm:new u("rgba8snorm",o.keyword,"rgba8snorm"),rgba8uint:new u("rgba8uint",o.keyword,"rgba8uint"),rgba8sint:new u("rgba8sint",o.keyword,"rgba8sint"),bgra8unorm:new u("bgra8unorm",o.keyword,"bgra8unorm"),bgra8unorm_srgb:new u("bgra8unorm_srgb",o.keyword,"bgra8unorm_srgb"),rgb10a2unorm:new u("rgb10a2unorm",o.keyword,"rgb10a2unorm"),rg11b10float:new u("rg11b10float",o.keyword,"rg11b10float"),rg32uint:new u("rg32uint",o.keyword,"rg32uint"),rg32sint:new u("rg32sint",o.keyword,"rg32sint"),rg32float:new u("rg32float",o.keyword,"rg32float"),rgba16uint:new u("rgba16uint",o.keyword,"rgba16uint"),rgba16sint:new u("rgba16sint",o.keyword,"rgba16sint"),rgba16float:new u("rgba16float",o.keyword,"rgba16float"),rgba32uint:new u("rgba32uint",o.keyword,"rgba32uint"),rgba32sint:new u("rgba32sint",o.keyword,"rgba32sint"),rgba32float:new u("rgba32float",o.keyword,"rgba32float"),static_assert:new u("static_assert",o.keyword,"static_assert")},a.tokens={decimal_float_literal:new u("decimal_float_literal",o.token,/((-?[0-9]*\.[0-9]+|-?[0-9]+\.[0-9]*)((e|E)(\+|-)?[0-9]+)?f?)|(-?[0-9]+(e|E)(\+|-)?[0-9]+f?)|([0-9]+f)/),hex_float_literal:new u("hex_float_literal",o.token,/-?0x((([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.[0-9a-fA-F]*)((p|P)(\+|-)?[0-9]+f?)?)|([0-9a-fA-F]+(p|P)(\+|-)?[0-9]+f?))/),int_literal:new u("int_literal",o.token,/-?0x[0-9a-fA-F]+|0i?|-?[1-9][0-9]*i?/),uint_literal:new u("uint_literal",o.token,/0x[0-9a-fA-F]+u|0u|[1-9][0-9]*u/),ident:new u("ident",o.token,/[a-zA-Z][0-9a-zA-Z_]*/),and:new u("and",o.token,"&"),and_and:new u("and_and",o.token,"&&"),arrow:new u("arrow ",o.token,"->"),attr:new u("attr",o.token,"@"),attr_left:new u("attr_left",o.token,"[["),attr_right:new u("attr_right",o.token,"]]"),forward_slash:new u("forward_slash",o.token,"/"),bang:new u("bang",o.token,"!"),bracket_left:new u("bracket_left",o.token,"["),bracket_right:new u("bracket_right",o.token,"]"),brace_left:new u("brace_left",o.token,"{"),brace_right:new u("brace_right",o.token,"}"),colon:new u("colon",o.token,":"),comma:new u("comma",o.token,","),equal:new u("equal",o.token,"="),equal_equal:new u("equal_equal",o.token,"=="),not_equal:new u("not_equal",o.token,"!="),greater_than:new u("greater_than",o.token,">"),greater_than_equal:new u("greater_than_equal",o.token,">="),shift_right:new u("shift_right",o.token,">>"),less_than:new u("less_than",o.token,"<"),less_than_equal:new u("less_than_equal",o.token,"<="),shift_left:new u("shift_left",o.token,"<<"),modulo:new u("modulo",o.token,"%"),minus:new u("minus",o.token,"-"),minus_minus:new u("minus_minus",o.token,"--"),period:new u("period",o.token,"."),plus:new u("plus",o.token,"+"),plus_plus:new u("plus_plus",o.token,"++"),or:new u("or",o.token,"|"),or_or:new u("or_or",o.token,"||"),paren_left:new u("paren_left",o.token,"("),paren_right:new u("paren_right",o.token,")"),semicolon:new u("semicolon",o.token,";"),star:new u("star",o.token,"*"),tilde:new u("tilde",o.token,"~"),underscore:new u("underscore",o.token,"_"),xor:new u("xor",o.token,"^"),plus_equal:new u("plus_equal",o.token,"+="),minus_equal:new u("minus_equal",o.token,"-="),times_equal:new u("times_equal",o.token,"*="),division_equal:new u("division_equal",o.token,"/="),modulo_equal:new u("modulo_equal",o.token,"%="),and_equal:new u("and_equal",o.token,"&="),or_equal:new u("or_equal",o.token,"|="),xor_equal:new u("xor_equal",o.token,"^="),shift_right_equal:new u("shift_right_equal",o.token,">>="),shift_left_equal:new u("shift_left_equal",o.token,"<<=")},a.storage_class=[l.keywords.function,l.keywords.private,l.keywords.workgroup,l.keywords.uniform,l.keywords.storage],a.access_mode=[l.keywords.read,l.keywords.write,l.keywords.read_write],a.sampler_type=[l.keywords.sampler,l.keywords.sampler_comparison],a.sampled_texture_type=[l.keywords.texture_1d,l.keywords.texture_2d,l.keywords.texture_2d_array,l.keywords.texture_3d,l.keywords.texture_cube,l.keywords.texture_cube_array],a.multisampled_texture_type=[l.keywords.texture_multisampled_2d],a.storage_texture_type=[l.keywords.texture_storage_1d,l.keywords.texture_storage_2d,l.keywords.texture_storage_2d_array,l.keywords.texture_storage_3d],a.depth_texture_type=[l.keywords.texture_depth_2d,l.keywords.texture_depth_2d_array,l.keywords.texture_depth_cube,l.keywords.texture_depth_cube_array,l.keywords.texture_depth_multisampled_2d],a.texture_external_type=[l.keywords.texture_external],a.any_texture_type=[...l.sampled_texture_type,...l.multisampled_texture_type,...l.storage_texture_type,...l.depth_texture_type,...l.texture_external_type],a.texel_format=[l.keywords.r8unorm,l.keywords.r8snorm,l.keywords.r8uint,l.keywords.r8sint,l.keywords.r16uint,l.keywords.r16sint,l.keywords.r16float,l.keywords.rg8unorm,l.keywords.rg8snorm,l.keywords.rg8uint,l.keywords.rg8sint,l.keywords.r32uint,l.keywords.r32sint,l.keywords.r32float,l.keywords.rg16uint,l.keywords.rg16sint,l.keywords.rg16float,l.keywords.rgba8unorm,l.keywords.rgba8unorm_srgb,l.keywords.rgba8snorm,l.keywords.rgba8uint,l.keywords.rgba8sint,l.keywords.bgra8unorm,l.keywords.bgra8unorm_srgb,l.keywords.rgb10a2unorm,l.keywords.rg11b10float,l.keywords.rg32uint,l.keywords.rg32sint,l.keywords.rg32float,l.keywords.rgba16uint,l.keywords.rgba16sint,l.keywords.rgba16float,l.keywords.rgba32uint,l.keywords.rgba32sint,l.keywords.rgba32float],a.const_literal=[l.tokens.int_literal,l.tokens.uint_literal,l.tokens.decimal_float_literal,l.tokens.hex_float_literal,l.keywords.true,l.keywords.false],a.literal_or_ident=[l.tokens.ident,l.tokens.int_literal,l.tokens.uint_literal,l.tokens.decimal_float_literal,l.tokens.hex_float_literal],a.element_count_expression=[l.tokens.int_literal,l.tokens.uint_literal,l.tokens.ident],a.template_types=[l.keywords.vec2,l.keywords.vec3,l.keywords.vec4,l.keywords.mat2x2,l.keywords.mat2x3,l.keywords.mat2x4,l.keywords.mat3x2,l.keywords.mat3x3,l.keywords.mat3x4,l.keywords.mat4x2,l.keywords.mat4x3,l.keywords.mat4x4,l.keywords.atomic,l.keywords.bitcast,...l.any_texture_type],a.attribute_name=[l.tokens.ident,l.keywords.block],a.assignment_operators=[l.tokens.equal,l.tokens.plus_equal,l.tokens.minus_equal,l.tokens.times_equal,l.tokens.division_equal,l.tokens.modulo_equal,l.tokens.and_equal,l.tokens.or_equal,l.tokens.xor_equal,l.tokens.shift_right_equal,l.tokens.shift_left_equal],a.increment_operators=[l.tokens.plus_plus,l.tokens.minus_minus];class Ue{constructor(e,t,n){this.type=e,this.lexeme=t,this.line=n}toString(){return this.lexeme}isTemplateType(){return a.template_types.indexOf(this.type)!=-1}isArrayType(){return this.type==a.keywords.array}isArrayOrTemplateType(){return this.isArrayType()||this.isTemplateType()}}class Ot{constructor(e){this._tokens=[],this._start=0,this._current=0,this._line=1,this._source=e??""}scanTokens(){for(;!this._isAtEnd();)if(this._start=this._current,!this.scanToken())throw`Invalid syntax at line ${this._line}`;return this._tokens.push(new Ue(a.eof,"",this._line)),this._tokens}scanToken(){let e=this._advance();if(e==`
`)return this._line++,!0;if(this._isWhitespace(e))return!0;if(e=="/"){if(this._peekAhead()=="/"){for(;e!=`
`;){if(this._isAtEnd())return!0;e=this._advance()}return this._line++,!0}else if(this._peekAhead()=="*"){this._advance();let n=1;for(;n>0;){if(this._isAtEnd())return!0;if(e=this._advance(),e==`
`)this._line++;else if(e=="*"){if(this._peekAhead()=="/"&&(this._advance(),n--,n==0))return!0}else e=="/"&&this._peekAhead()=="*"&&(this._advance(),n++)}return!0}}let t=a.none;for(;;){let n=this._findType(e);const s=this._peekAhead();if(e==">"&&(s==">"||s=="=")){let i=!1,c=this._tokens.length-1;for(let h=0;h<5&&c>=0;++h,--c)if(this._tokens[c].type===a.tokens.less_than){c>0&&this._tokens[c-1].isArrayOrTemplateType()&&(i=!0);break}if(i)return this._addToken(n),!0}if(n===a.none){let i=e,c=0;const h=2;for(let f=0;f<h;++f)if(i+=this._peekAhead(f),n=this._findType(i),n!==a.none){c=f;break}if(n===a.none)return t===a.none?!1:(this._current--,this._addToken(t),!0);e=i,this._current+=c+1}if(t=n,this._isAtEnd())break;e+=this._advance()}return t===a.none?!1:(this._addToken(t),!0)}_findType(e){for(const t in a.keywords){const n=a.keywords[t];if(this._match(e,n.rule))return n}for(const t in a.tokens){const n=a.tokens[t];if(this._match(e,n.rule))return n}return a.none}_match(e,t){if(typeof t=="string"){if(t==e)return!0}else{const n=t.exec(e);if(n&&n.index==0&&n[0]==e)return!0}return!1}_isAtEnd(){return this._current>=this._source.length}_isWhitespace(e){return e==" "||e=="	"||e=="\r"}_advance(e=0){let t=this._source[this._current];return e=e||0,e++,this._current+=e,t}_peekAhead(e=0){return e=e||0,this._current+e>=this._source.length?"\0":this._source[this._current+e]}_addToken(e){const t=this._source.substring(this._start,this._current);this._tokens.push(new Ue(e,t,this._line))}}class Gt{constructor(){this._tokens=[],this._current=0,this._context=new mt}parse(e){this._initialize(e);let t=[];for(;!this._isAtEnd();){const n=this._global_decl_or_directive();if(!n)break;t.push(n)}return t}_initialize(e){if(e)if(typeof e=="string"){const t=new Ot(e);this._tokens=t.scanTokens()}else this._tokens=e;else this._tokens=[];this._current=0}_error(e,t){return console.error(e,t),{token:e,message:t,toString:function(){return`${t}`}}}_isAtEnd(){return this._current>=this._tokens.length||this._peek().type==a.eof}_match(e){if(e instanceof u)return this._check(e)?(this._advance(),!0):!1;for(let t=0,n=e.length;t<n;++t){const s=e[t];if(this._check(s))return this._advance(),!0}return!1}_consume(e,t){if(this._check(e))return this._advance();throw this._error(this._peek(),t)}_check(e){if(this._isAtEnd())return!1;const t=this._peek();if(e instanceof Array){let n=t.type;return e.indexOf(n)!=-1}return t.type==e}_advance(){return this._isAtEnd()||this._current++,this._previous()}_peek(){return this._tokens[this._current]}_previous(){return this._tokens[this._current-1]}_global_decl_or_directive(){for(;this._match(a.tokens.semicolon)&&!this._isAtEnd(););if(this._match(a.keywords.alias)){const t=this._type_alias();return this._consume(a.tokens.semicolon,"Expected ';'"),t}if(this._match(a.keywords.enable)){const t=this._enable_directive();return this._consume(a.tokens.semicolon,"Expected ';'"),t}const e=this._attribute();if(this._check(a.keywords.var)){const t=this._global_variable_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.override)){const t=this._override_variable_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.let)){const t=this._global_let_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.const)){const t=this._global_const_decl();return t!=null&&(t.attributes=e),this._consume(a.tokens.semicolon,"Expected ';'."),t}if(this._check(a.keywords.struct)){const t=this._struct_decl();return t!=null&&(t.attributes=e),t}if(this._check(a.keywords.fn)){const t=this._function_decl();return t!=null&&(t.attributes=e),t}return null}_function_decl(){if(!this._match(a.keywords.fn))return null;const e=this._consume(a.tokens.ident,"Expected function name.").toString();this._consume(a.tokens.paren_left,"Expected '(' for function arguments.");const t=[];if(!this._check(a.tokens.paren_right))do{if(this._check(a.tokens.paren_right))break;const i=this._attribute(),c=this._consume(a.tokens.ident,"Expected argument name.").toString();this._consume(a.tokens.colon,"Expected ':' for argument type.");const h=this._attribute(),f=this._type_decl();f!=null&&(f.attributes=h,t.push(new Bt(c,f,i)))}while(this._match(a.tokens.comma));this._consume(a.tokens.paren_right,"Expected ')' after function arguments.");let n=null;if(this._match(a.tokens.arrow)){const i=this._attribute();n=this._type_decl(),n!=null&&(n.attributes=i)}const s=this._compound_statement();return new ne(e,t,n,s)}_compound_statement(){const e=[];for(this._consume(a.tokens.brace_left,"Expected '{' for block.");!this._check(a.tokens.brace_right);){const t=this._statement();t!==null&&e.push(t)}return this._consume(a.tokens.brace_right,"Expected '}' for block."),e}_statement(){for(;this._match(a.tokens.semicolon)&&!this._isAtEnd(););if(this._check(a.keywords.if))return this._if_statement();if(this._check(a.keywords.switch))return this._switch_statement();if(this._check(a.keywords.loop))return this._loop_statement();if(this._check(a.keywords.for))return this._for_statement();if(this._check(a.keywords.while))return this._while_statement();if(this._check(a.keywords.continuing))return this._continuing_statement();if(this._check(a.keywords.static_assert))return this._static_assert_statement();if(this._check(a.tokens.brace_left))return this._compound_statement();let e=null;return this._check(a.keywords.return)?e=this._return_statement():this._check([a.keywords.var,a.keywords.let,a.keywords.const])?e=this._variable_statement():this._match(a.keywords.discard)?e=new It:this._match(a.keywords.break)?e=new Et:this._match(a.keywords.continue)?e=new zt:e=this._increment_decrement_statement()||this._func_call_statement()||this._assignment_statement(),e!=null&&this._consume(a.tokens.semicolon,"Expected ';' after statement."),e}_static_assert_statement(){if(!this._match(a.keywords.static_assert))return null;let e=this._optional_paren_expression();return new dt(e)}_while_statement(){if(!this._match(a.keywords.while))return null;let e=this._optional_paren_expression();const t=this._compound_statement();return new _t(e,t)}_continuing_statement(){if(!this._match(a.keywords.continuing))return null;const e=this._compound_statement();return new gt(e)}_for_statement(){if(!this._match(a.keywords.for))return null;this._consume(a.tokens.paren_left,"Expected '('.");const e=this._check(a.tokens.semicolon)?null:this._for_init();this._consume(a.tokens.semicolon,"Expected ';'.");const t=this._check(a.tokens.semicolon)?null:this._short_circuit_or_expression();this._consume(a.tokens.semicolon,"Expected ';'.");const n=this._check(a.tokens.paren_right)?null:this._for_increment();this._consume(a.tokens.paren_right,"Expected ')'.");const s=this._compound_statement();return new yt(e,t,n,s)}_for_init(){return this._variable_statement()||this._func_call_statement()||this._assignment_statement()}_for_increment(){return this._func_call_statement()||this._increment_decrement_statement()||this._assignment_statement()}_variable_statement(){if(this._check(a.keywords.var)){const e=this._variable_decl();if(e===null)throw this._error(this._peek(),"Variable declaration expected.");let t=null;return this._match(a.tokens.equal)&&(t=this._short_circuit_or_expression()),new I(e.name,e.type,e.storage,e.access,t)}if(this._match(a.keywords.let)){const e=this._consume(a.tokens.ident,"Expected name for let.").toString();let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}this._consume(a.tokens.equal,"Expected '=' for let.");const n=this._short_circuit_or_expression();return new se(e,t,null,null,n)}if(this._match(a.keywords.const)){const e=this._consume(a.tokens.ident,"Expected name for const.").toString();let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}this._consume(a.tokens.equal,"Expected '=' for const.");const n=this._short_circuit_or_expression();return new ve(e,t,null,null,n)}return null}_increment_decrement_statement(){const e=this._current,t=this._unary_expression();if(t==null)return null;if(!this._check(a.increment_operators))return this._current=e,null;const n=this._consume(a.increment_operators,"Expected increment operator");return new xt(n.type===a.tokens.plus_plus?U.increment:U.decrement,t)}_assignment_statement(){let e=null;if(this._check(a.tokens.brace_right))return null;let t=this._match(a.tokens.underscore);if(t||(e=this._unary_expression()),!t&&e==null)return null;const n=this._consume(a.assignment_operators,"Expected assignment operator."),s=this._short_circuit_or_expression();return new wt(L.parse(n.lexeme),e,s)}_func_call_statement(){if(!this._check(a.tokens.ident))return null;const e=this._current,t=this._consume(a.tokens.ident,"Expected function name."),n=this._argument_expression_list();return n===null?(this._current=e,null):new vt(t.lexeme,n)}_loop_statement(){if(!this._match(a.keywords.loop))return null;this._consume(a.tokens.brace_left,"Expected '{' for loop.");const e=[];let t=this._statement();for(;t!==null;){if(Array.isArray(t))for(let s of t)e.push(s);else e.push(t);t=this._statement()}let n=null;return this._match(a.keywords.continuing)&&(n=this._compound_statement()),this._consume(a.tokens.brace_right,"Expected '}' for loop."),new kt(e,n)}_switch_statement(){if(!this._match(a.keywords.switch))return null;const e=this._optional_paren_expression();this._consume(a.tokens.brace_left,"Expected '{' for switch.");const t=this._switch_body();if(t==null||t.length==0)throw this._error(this._previous(),"Expected 'case' or 'default'.");return this._consume(a.tokens.brace_right,"Expected '}' for switch."),new bt(e,t)}_switch_body(){const e=[];if(this._match(a.keywords.case)){const t=this._case_selectors();this._match(a.tokens.colon),this._consume(a.tokens.brace_left,"Exected '{' for switch case.");const n=this._case_body();this._consume(a.tokens.brace_right,"Exected '}' for switch case."),e.push(new Ut(t,n))}if(this._match(a.keywords.default)){this._match(a.tokens.colon),this._consume(a.tokens.brace_left,"Exected '{' for switch default.");const t=this._case_body();this._consume(a.tokens.brace_right,"Exected '}' for switch default."),e.push(new Ct(t))}if(this._check([a.keywords.default,a.keywords.case])){const t=this._switch_body();e.push(t[0])}return e}_case_selectors(){var e,t,n,s;const i=[(t=(e=this._shift_expression())===null||e===void 0?void 0:e.evaluate(this._context).toString())!==null&&t!==void 0?t:""];for(;this._match(a.tokens.comma);)i.push((s=(n=this._shift_expression())===null||n===void 0?void 0:n.evaluate(this._context).toString())!==null&&s!==void 0?s:"");return i}_case_body(){if(this._match(a.keywords.fallthrough))return this._consume(a.tokens.semicolon,"Expected ';'"),[];let e=this._statement();if(e==null)return[];e instanceof Array||(e=[e]);const t=this._case_body();return t.length==0?e:[...e,t[0]]}_if_statement(){if(!this._match(a.keywords.if))return null;const e=this._optional_paren_expression(),t=this._compound_statement();let n=[];this._match_elseif()&&(n=this._elseif_statement(n));let s=null;return this._match(a.keywords.else)&&(s=this._compound_statement()),new At(e,t,n,s)}_match_elseif(){return this._tokens[this._current].type===a.keywords.else&&this._tokens[this._current+1].type===a.keywords.if?(this._advance(),this._advance(),!0):!1}_elseif_statement(e=[]){const t=this._optional_paren_expression(),n=this._compound_statement();return e.push(new qt(t,n)),this._match_elseif()&&this._elseif_statement(e),e}_return_statement(){if(!this._match(a.keywords.return))return null;const e=this._short_circuit_or_expression();return new St(e)}_short_circuit_or_expression(){let e=this._short_circuit_and_expr();for(;this._match(a.tokens.or_or);)e=new A(this._previous().toString(),e,this._short_circuit_and_expr());return e}_short_circuit_and_expr(){let e=this._inclusive_or_expression();for(;this._match(a.tokens.and_and);)e=new A(this._previous().toString(),e,this._inclusive_or_expression());return e}_inclusive_or_expression(){let e=this._exclusive_or_expression();for(;this._match(a.tokens.or);)e=new A(this._previous().toString(),e,this._exclusive_or_expression());return e}_exclusive_or_expression(){let e=this._and_expression();for(;this._match(a.tokens.xor);)e=new A(this._previous().toString(),e,this._and_expression());return e}_and_expression(){let e=this._equality_expression();for(;this._match(a.tokens.and);)e=new A(this._previous().toString(),e,this._equality_expression());return e}_equality_expression(){const e=this._relational_expression();return this._match([a.tokens.equal_equal,a.tokens.not_equal])?new A(this._previous().toString(),e,this._relational_expression()):e}_relational_expression(){let e=this._shift_expression();for(;this._match([a.tokens.less_than,a.tokens.greater_than,a.tokens.less_than_equal,a.tokens.greater_than_equal]);)e=new A(this._previous().toString(),e,this._shift_expression());return e}_shift_expression(){let e=this._additive_expression();for(;this._match([a.tokens.shift_left,a.tokens.shift_right]);)e=new A(this._previous().toString(),e,this._additive_expression());return e}_additive_expression(){let e=this._multiplicative_expression();for(;this._match([a.tokens.plus,a.tokens.minus]);)e=new A(this._previous().toString(),e,this._multiplicative_expression());return e}_multiplicative_expression(){let e=this._unary_expression();for(;this._match([a.tokens.star,a.tokens.forward_slash,a.tokens.modulo]);)e=new A(this._previous().toString(),e,this._unary_expression());return e}_unary_expression(){return this._match([a.tokens.minus,a.tokens.bang,a.tokens.tilde,a.tokens.star,a.tokens.and])?new Ft(this._previous().toString(),this._unary_expression()):this._singular_expression()}_singular_expression(){const e=this._primary_expression(),t=this._postfix_expression();return t&&(e.postfix=t),e}_postfix_expression(){if(this._match(a.tokens.bracket_left)){const e=this._short_circuit_or_expression();this._consume(a.tokens.bracket_right,"Expected ']'.");const t=this._postfix_expression();return t&&(e.postfix=t),e}if(this._match(a.tokens.period)){const e=this._consume(a.tokens.ident,"Expected member name."),t=this._postfix_expression(),n=new Se(e.lexeme);return t&&(n.postfix=t),n}return null}_getStruct(e){return this._context.aliases.has(e)?this._context.aliases.get(e).type:this._context.structs.has(e)?this._context.structs.get(e):null}_primary_expression(){if(this._match(a.tokens.ident)){const n=this._previous().toString();if(this._check(a.tokens.paren_left)){const s=this._argument_expression_list(),i=this._getStruct(n);return i!=null?new Y(i,s):new Te(n,s)}if(this._context.constants.has(n)){const s=this._context.constants.get(n);return new Ee(n,s.value)}return new Ie(n)}if(this._match(a.const_literal))return new ze(parseFloat(this._previous().toString()));if(this._check(a.tokens.paren_left))return this._paren_expression();if(this._match(a.keywords.bitcast)){this._consume(a.tokens.less_than,"Expected '<'.");const n=this._type_decl();this._consume(a.tokens.greater_than,"Expected '>'.");const s=this._paren_expression();return new Mt(n,s)}const e=this._type_decl(),t=this._argument_expression_list();return new Pt(e,t)}_argument_expression_list(){if(!this._match(a.tokens.paren_left))return null;const e=[];do{if(this._check(a.tokens.paren_right))break;const t=this._short_circuit_or_expression();e.push(t)}while(this._match(a.tokens.comma));return this._consume(a.tokens.paren_right,"Expected ')' for agument list"),e}_optional_paren_expression(){this._match(a.tokens.paren_left);const e=this._short_circuit_or_expression();return this._match(a.tokens.paren_right),new Ve([e])}_paren_expression(){this._consume(a.tokens.paren_left,"Expected '('.");const e=this._short_circuit_or_expression();return this._consume(a.tokens.paren_right,"Expected ')'."),new Ve([e])}_struct_decl(){if(!this._match(a.keywords.struct))return null;const e=this._consume(a.tokens.ident,"Expected name for struct.").toString();this._consume(a.tokens.brace_left,"Expected '{' for struct body.");const t=[];for(;!this._check(a.tokens.brace_right);){const s=this._attribute(),i=this._consume(a.tokens.ident,"Expected variable name.").toString();this._consume(a.tokens.colon,"Expected ':' for struct member type.");const c=this._attribute(),h=this._type_decl();h!=null&&(h.attributes=c),this._check(a.tokens.brace_right)?this._match(a.tokens.comma):this._consume(a.tokens.comma,"Expected ',' for struct member."),t.push(new Nt(i,h,s))}this._consume(a.tokens.brace_right,"Expected '}' after struct body.");const n=new z(e,t);return this._context.structs.set(e,n),n}_global_variable_decl(){const e=this._variable_decl();return e&&this._match(a.tokens.equal)&&(e.value=this._const_expression()),e}_override_variable_decl(){const e=this._override_decl();return e&&this._match(a.tokens.equal)&&(e.value=this._const_expression()),e}_global_const_decl(){if(!this._match(a.keywords.const))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const i=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=i)}let n=null;if(this._match(a.tokens.equal)){const i=this._short_circuit_or_expression();if(i instanceof Y)n=i;else if(i instanceof Ee&&i.initializer instanceof Y)n=i.initializer;else try{const c=i.evaluate(this._context);n=new ze(c)}catch{n=i}}const s=new ve(e.toString(),t,"","",n);return this._context.constants.set(s.name,s),s}_global_let_decl(){if(!this._match(a.keywords.let))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const s=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=s)}let n=null;return this._match(a.tokens.equal)&&(n=this._const_expression()),new se(e.toString(),t,"","",n)}_const_expression(){if(this._match(a.const_literal))return new Se(this._previous().toString());const e=this._type_decl();this._consume(a.tokens.paren_left,"Expected '('.");let t=[];for(;!this._check(a.tokens.paren_right)&&(t.push(this._const_expression()),!!this._check(a.tokens.comma));)this._advance();return this._consume(a.tokens.paren_right,"Expected ')'."),new Y(e,t)}_variable_decl(){if(!this._match(a.keywords.var))return null;let e="",t="";this._match(a.tokens.less_than)&&(e=this._consume(a.storage_class,"Expected storage_class.").toString(),this._match(a.tokens.comma)&&(t=this._consume(a.access_mode,"Expected access_mode.").toString()),this._consume(a.tokens.greater_than,"Expected '>'."));const n=this._consume(a.tokens.ident,"Expected variable name");let s=null;if(this._match(a.tokens.colon)){const i=this._attribute();s=this._type_decl(),s!=null&&(s.attributes=i)}return new I(n.toString(),s,e,t,null)}_override_decl(){if(!this._match(a.keywords.override))return null;const e=this._consume(a.tokens.ident,"Expected variable name");let t=null;if(this._match(a.tokens.colon)){const n=this._attribute();t=this._type_decl(),t!=null&&(t.attributes=n)}return new we(e.toString(),t,null)}_enable_directive(){const e=this._consume(a.tokens.ident,"identity expected.");return new Tt(e.toString())}_type_alias(){const e=this._consume(a.tokens.ident,"identity expected.");this._consume(a.tokens.equal,"Expected '=' for type alias.");let t=this._type_decl();if(t===null)throw this._error(this._peek(),"Expected Type for Alias.");this._context.aliases.has(t.name)&&(t=this._context.aliases.get(t.name).type);const n=new ke(e.toString(),t);return this._context.aliases.set(n.name,n),n}_type_decl(){if(this._check([a.tokens.ident,...a.texel_format,a.keywords.bool,a.keywords.f32,a.keywords.i32,a.keywords.u32])){const n=this._advance(),s=n.toString();return this._context.structs.has(s)?this._context.structs.get(s):this._context.aliases.has(s)?this._context.aliases.get(s).type:new E(n.toString())}let e=this._texture_sampler_types();if(e)return e;if(this._check(a.template_types)){let n=this._advance().toString(),s=null,i=null;return this._match(a.tokens.less_than)&&(s=this._type_decl(),i=null,this._match(a.tokens.comma)&&(i=this._consume(a.access_mode,"Expected access_mode for pointer").toString()),this._consume(a.tokens.greater_than,"Expected '>' for type.")),new be(n,s,i)}if(this._match(a.keywords.ptr)){let n=this._previous().toString();this._consume(a.tokens.less_than,"Expected '<' for pointer.");const s=this._consume(a.storage_class,"Expected storage_class for pointer");this._consume(a.tokens.comma,"Expected ',' for pointer.");const i=this._type_decl();let c=null;return this._match(a.tokens.comma)&&(c=this._consume(a.access_mode,"Expected access_mode for pointer").toString()),this._consume(a.tokens.greater_than,"Expected '>' for pointer."),new Vt(n,s.toString(),i,c)}const t=this._attribute();if(this._match(a.keywords.array)){let n=null,s=-1;const i=this._previous();if(this._match(a.tokens.less_than)){n=this._type_decl(),this._context.aliases.has(n.name)&&(n=this._context.aliases.get(n.name).type);let c="";this._match(a.tokens.comma)&&(c=this._shift_expression().evaluate(this._context).toString()),this._consume(a.tokens.greater_than,"Expected '>' for array."),s=c?parseInt(c):0}return new Ae(i.toString(),t,n,s)}return null}_texture_sampler_types(){if(this._match(a.sampler_type))return new W(this._previous().toString(),null,null);if(this._match(a.depth_texture_type))return new W(this._previous().toString(),null,null);if(this._match(a.sampled_texture_type)||this._match(a.multisampled_texture_type)){const e=this._previous();this._consume(a.tokens.less_than,"Expected '<' for sampler type.");const t=this._type_decl();return this._consume(a.tokens.greater_than,"Expected '>' for sampler type."),new W(e.toString(),t,null)}if(this._match(a.storage_texture_type)){const e=this._previous();this._consume(a.tokens.less_than,"Expected '<' for sampler type.");const t=this._consume(a.texel_format,"Invalid texel format.").toString();this._consume(a.tokens.comma,"Expected ',' after texel format.");const n=this._consume(a.access_mode,"Expected access mode for storage texture type.").toString();return this._consume(a.tokens.greater_than,"Expected '>' for sampler type."),new W(e.toString(),t,n)}return null}_attribute(){let e=[];for(;this._match(a.tokens.attr);){const t=this._consume(a.attribute_name,"Expected attribute name"),n=new Fe(t.toString(),null);if(this._match(a.tokens.paren_left)){if(n.value=this._consume(a.literal_or_ident,"Expected attribute value").toString(),this._check(a.tokens.comma)){this._advance();do{const s=this._consume(a.literal_or_ident,"Expected attribute value").toString();n.value instanceof Array||(n.value=[n.value]),n.value.push(s)}while(this._match(a.tokens.comma))}this._consume(a.tokens.paren_right,"Expected ')'")}e.push(n)}for(;this._match(a.tokens.attr_left);){if(!this._check(a.tokens.attr_right))do{const t=this._consume(a.attribute_name,"Expected attribute name"),n=new Fe(t.toString(),null);if(this._match(a.tokens.paren_left)){if(n.value=[this._consume(a.literal_or_ident,"Expected attribute value").toString()],this._check(a.tokens.comma)){this._advance();do{const s=this._consume(a.literal_or_ident,"Expected attribute value").toString();n.value.push(s)}while(this._match(a.tokens.comma))}this._consume(a.tokens.paren_right,"Expected ')'")}e.push(n)}while(this._match(a.tokens.comma));this._consume(a.tokens.attr_right,"Expected ']]' after attribute declarations")}return e.length==0?null:e}}class C{constructor(e,t){this.name=e,this.attributes=t,this.size=0}get isArray(){return!1}get isStruct(){return!1}get isTemplate(){return!1}}class Ce{constructor(e,t,n){this.name=e,this.type=t,this.attributes=n,this.offset=0,this.size=0}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray?this.type.format:this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class K extends C{constructor(e,t){super(e,t),this.members=[],this.align=0}get isStruct(){return!0}}class ae extends C{constructor(e,t){super(e,t),this.count=0,this.stride=0}get isArray(){return!0}}class Be extends C{constructor(e,t,n,s){super(e,n),this.format=t,this.access=s}get isTemplate(){return!0}}var y;(function(r){r[r.Uniform=0]="Uniform",r[r.Storage=1]="Storage",r[r.Texture=2]="Texture",r[r.Sampler=3]="Sampler",r[r.StorageTexture=4]="StorageTexture"})(y||(y={}));class ${constructor(e,t,n,s,i,c,h){this.name=e,this.type=t,this.group=n,this.binding=s,this.attributes=i,this.resourceType=c,this.access=h}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get size(){return this.type.size}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray?this.type.format:this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class Dt{constructor(e,t){this.name=e,this.type=t}}class J{constructor(e,t){this.align=e,this.size=t}}class Rt{constructor(e,t,n,s){this.name=e,this.type=t,this.locationType=n,this.location=s,this.interpolation=null}}class qe{constructor(e,t,n,s){this.name=e,this.type=t,this.locationType=n,this.location=s}}class Lt{constructor(e,t=null){this.stage=null,this.inputs=[],this.outputs=[],this.resources=[],this.name=e,this.stage=t}}class Wt{constructor(){this.vertex=[],this.fragment=[],this.compute=[]}}class Yt{constructor(e,t,n,s){this.name=e,this.type=t,this.attributes=n,this.id=s}}class Ht{constructor(e){this.resources=null,this.node=e}}class T{constructor(e){this.uniforms=[],this.storage=[],this.textures=[],this.samplers=[],this.aliases=[],this.overrides=[],this.structs=[],this.entry=new Wt,this._types=new Map,this._functions=new Map,e&&this.update(e)}_isStorageTexture(e){return e.name=="texture_storage_1d"||e.name=="texture_storage_2d"||e.name=="texture_storage_2d_array"||e.name=="texture_storage_3d"}update(e){const n=new Gt().parse(e);for(const s of n)s instanceof ne&&this._functions.set(s.name,new Ht(s));for(const s of n){if(s instanceof z){const i=this._getTypeInfo(s,null);i instanceof K&&this.structs.push(i);continue}if(s instanceof ke){this.aliases.push(this._getAliasInfo(s));continue}if(s instanceof we){const i=s,c=this._getAttributeNum(i.attributes,"id",0),h=i.type!=null?this._getTypeInfo(i.type,i.attributes):null;this.overrides.push(new Yt(i.name,h,i.attributes,c));continue}if(this._isUniformVar(s)){const i=s,c=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),p=new $(i.name,f,c,h,i.attributes,y.Uniform,i.access);this.uniforms.push(p);continue}if(this._isStorageVar(s)){const i=s,c=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),p=this._isStorageTexture(f),m=new $(i.name,f,c,h,i.attributes,p?y.StorageTexture:y.Storage,i.access);this.storage.push(m);continue}if(this._isTextureVar(s)){const i=s,c=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),p=this._isStorageTexture(f),m=new $(i.name,f,c,h,i.attributes,p?y.StorageTexture:y.Texture,i.access);p?this.storage.push(m):this.textures.push(m);continue}if(this._isSamplerVar(s)){const i=s,c=this._getAttributeNum(i.attributes,"group",0),h=this._getAttributeNum(i.attributes,"binding",0),f=this._getTypeInfo(i.type,i.attributes),p=new $(i.name,f,c,h,i.attributes,y.Sampler,i.access);this.samplers.push(p);continue}if(s instanceof ne){const i=this._getAttribute(s,"vertex"),c=this._getAttribute(s,"fragment"),h=this._getAttribute(s,"compute"),f=i||c||h;if(f){const p=new Lt(s.name,f==null?void 0:f.name);p.inputs=this._getInputs(s.args),p.outputs=this._getOutputs(s.returnType),p.resources=this._findResources(s),this.entry[f.name].push(p)}continue}}}_findResource(e){for(const t of this.uniforms)if(t.name==e)return t;for(const t of this.storage)if(t.name==e)return t;for(const t of this.textures)if(t.name==e)return t;for(const t of this.samplers)if(t.name==e)return t;return null}_findResources(e){const t=[],n=this,s=[];return e.search(i=>{if(i instanceof j)s.push({});else if(i instanceof X)s.pop();else if(i instanceof I){if(s.length>0){const c=i;s[s.length-1][c.name]=c}}else if(i instanceof se){if(s.length>0){const c=i;s[s.length-1][c.name]=c}}else if(i instanceof Ie){const c=i;if(s.length>0&&s[s.length-1][c.name])return;const h=n._findResource(c.name);h&&t.push(h)}else if(i instanceof Te){const c=i,h=n._functions.get(c.name);h&&(h.resources===null&&(h.resources=n._findResources(h.node)),t.push(...h.resources))}}),[...new Map(t.map(i=>[i.name,i])).values()]}getBindGroups(){const e=[];function t(n,s){n>=e.length&&(e.length=n+1),e[n]===void 0&&(e[n]=[]),s>=e[n].length&&(e[n].length=s+1)}for(const n of this.uniforms){t(n.group,n.binding);const s=e[n.group];s[n.binding]=n}for(const n of this.storage){t(n.group,n.binding);const s=e[n.group];s[n.binding]=n}for(const n of this.textures){t(n.group,n.binding);const s=e[n.group];s[n.binding]=n}for(const n of this.samplers){t(n.group,n.binding);const s=e[n.group];s[n.binding]=n}return e}_getOutputs(e,t=void 0){if(t===void 0&&(t=[]),e instanceof z)this._getStructOutputs(e,t);else{const n=this._getOutputInfo(e);n!==null&&t.push(n)}return t}_getStructOutputs(e,t){for(const n of e.members)if(n.type instanceof z)this._getStructOutputs(n.type,t);else{const s=this._getAttribute(n,"location")||this._getAttribute(n,"builtin");if(s!==null){const i=this._getTypeInfo(n.type,n.type.attributes),c=this._parseInt(s.value),h=new qe(n.name,i,s.name,c);t.push(h)}}}_getOutputInfo(e){const t=this._getAttribute(e,"location")||this._getAttribute(e,"builtin");if(t!==null){const n=this._getTypeInfo(e,e.attributes),s=this._parseInt(t.value);return new qe("",n,t.name,s)}return null}_getInputs(e,t=void 0){t===void 0&&(t=[]);for(const n of e)if(n.type instanceof z)this._getStructInputs(n.type,t);else{const s=this._getInputInfo(n);s!==null&&t.push(s)}return t}_getStructInputs(e,t){for(const n of e.members)if(n.type instanceof z)this._getStructInputs(n.type,t);else{const s=this._getInputInfo(n);s!==null&&t.push(s)}}_getInputInfo(e){const t=this._getAttribute(e,"location")||this._getAttribute(e,"builtin");if(t!==null){const n=this._getAttribute(e,"interpolation"),s=this._getTypeInfo(e.type,e.attributes),i=this._parseInt(t.value),c=new Rt(e.name,s,t.name,i);return n!==null&&(c.interpolation=this._parseString(n.value)),c}return null}_parseString(e){return e instanceof Array&&(e=e[0]),e}_parseInt(e){e instanceof Array&&(e=e[0]);const t=parseInt(e);return isNaN(t)?e:t}_getAlias(e){for(const t of this.aliases)if(t.name==e)return t.type;return null}_getAliasInfo(e){return new Dt(e.name,this._getTypeInfo(e.type,null))}_getTypeInfo(e,t){if(this._types.has(e))return this._types.get(e);if(e instanceof Ae){const s=e,i=this._getTypeInfo(s.format,s.attributes),c=new ae(s.name,t);return c.format=i,c.count=s.count,this._types.set(e,c),this._updateTypeInfo(c),c}if(e instanceof z){const s=e,i=new K(s.name,t);for(const c of s.members){const h=this._getTypeInfo(c.type,c.attributes);i.members.push(new Ce(c.name,h,c.attributes))}return this._types.set(e,i),this._updateTypeInfo(i),i}if(e instanceof W){const s=e,i=s.format instanceof E,c=s.format?i?this._getTypeInfo(s.format,null):new C(s.format,null):null,h=new Be(s.name,c,t,s.access);return this._types.set(e,h),this._updateTypeInfo(h),h}if(e instanceof be){const s=e,i=s.format?this._getTypeInfo(s.format,null):null,c=new Be(s.name,i,t,s.access);return this._types.set(e,c),this._updateTypeInfo(c),c}const n=new C(e.name,t);return this._types.set(e,n),this._updateTypeInfo(n),n}_updateTypeInfo(e){var t,n;const s=this._getTypeSize(e);if(e.size=(t=s==null?void 0:s.size)!==null&&t!==void 0?t:0,e instanceof ae){const i=this._getTypeSize(e.format);e.stride=(n=i==null?void 0:i.size)!==null&&n!==void 0?n:0,this._updateTypeInfo(e.format)}e instanceof K&&this._updateStructInfo(e)}_updateStructInfo(e){var t;let n=0,s=0,i=0,c=0;for(let h=0,f=e.members.length;h<f;++h){const p=e.members[h],m=this._getTypeSize(p);if(!m)continue;(t=this._getAlias(p.type.name))!==null&&t!==void 0||p.type;const w=m.align,D=m.size;n=this._roundUp(w,n+s),s=D,i=n,c=Math.max(c,w),p.offset=n,p.size=D,this._updateTypeInfo(p.type)}e.size=this._roundUp(c,i+s),e.align=c}_getTypeSize(e){var t;if(e==null)return null;const n=this._getAttributeNum(e.attributes,"size",0),s=this._getAttributeNum(e.attributes,"align",0);if(e instanceof Ce&&(e=e.type),e instanceof C){const i=this._getAlias(e.name);i!==null&&(e=i)}{const i=T._typeInfo[e.name];if(i!==void 0){const c=e.format==="f16"?2:1;return new J(Math.max(s,i.align/c),Math.max(n,i.size/c))}}{const i=T._typeInfo[e.name.substring(0,e.name.length-1)];if(i){const c=e.name[e.name.length-1]==="h"?2:1;return new J(Math.max(s,i.align/c),Math.max(n,i.size/c))}}if(e instanceof ae){let i=e,c=8,h=8;const f=this._getTypeSize(i.format);f!==null&&(h=f.size,c=f.align);const p=i.count,m=this._getAttributeNum((t=e==null?void 0:e.attributes)!==null&&t!==void 0?t:null,"stride",this._roundUp(c,h));return h=p*m,n&&(h=n),new J(Math.max(s,c),Math.max(n,h))}if(e instanceof K){let i=0,c=0,h=0,f=0,p=0;for(const m of e.members){const w=this._getTypeSize(m.type);w!==null&&(i=Math.max(w.align,i),h=this._roundUp(w.align,h+f),f=w.size,p=h)}return c=this._roundUp(i,p+f),new J(Math.max(s,i),Math.max(n,c))}return null}_isUniformVar(e){return e instanceof I&&e.storage=="uniform"}_isStorageVar(e){return e instanceof I&&e.storage=="storage"}_isTextureVar(e){return e instanceof I&&e.type!==null&&T._textureTypes.indexOf(e.type.name)!=-1}_isSamplerVar(e){return e instanceof I&&e.type!==null&&T._samplerTypes.indexOf(e.type.name)!=-1}_getAttribute(e,t){const n=e;if(!n||!n.attributes)return null;const s=n.attributes;for(let i of s)if(i.name==t)return i;return null}_getAttributeNum(e,t,n){if(e===null)return n;for(let s of e)if(s.name==t){let i=s!==null&&s.value!==null?s.value:n;return i instanceof Array&&(i=i[0]),typeof i=="number"?i:typeof i=="string"?parseInt(i):n}return n}_roundUp(e,t){return Math.ceil(t/e)*e}}T._typeInfo={f16:{align:2,size:2},i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},atomic:{align:4,size:4},vec2:{align:8,size:8},vec3:{align:16,size:12},vec4:{align:16,size:16},mat2x2:{align:8,size:16},mat3x2:{align:8,size:24},mat4x2:{align:8,size:32},mat2x3:{align:16,size:32},mat3x3:{align:16,size:48},mat4x3:{align:16,size:64},mat2x4:{align:16,size:32},mat3x4:{align:16,size:48},mat4x4:{align:16,size:64}},T._textureTypes=a.any_texture_type.map(r=>r.name),T._samplerTypes=a.sampler_type.map(r=>r.name);function B(r,e){return Object.fromEntries(e.map(t=>{const n=Zt(r,t,0);return[t.name,{typeDefinition:n,group:t.group,binding:t.binding,size:n.size}]}))}function Ne(r,e,t){return{fields:Object.fromEntries(e.members.map(s=>[s.name,{offset:s.offset,type:ue(r,s.type,0)}])),size:e.size,offset:t}}function jt(r){var e;if(r.name.includes("depth"))return"depth";switch((e=r.format)==null?void 0:e.name){case"f32":return"float";case"i32":return"sint";case"u32":return"uint";default:throw new Error("unknown texture sample type")}}function Oe(r){return r.name.includes("2d_array")?"2d-array":r.name.includes("cube_array")?"cube-array":r.name.includes("3d")?"3d":r.name.includes("1d")?"1d":r.name.includes("cube")?"cube":"2d"}function Xt(r){switch(r.access){case"read":return"read-only";case"write":return"write-only";case"read_write":return"read-write";default:throw new Error("unknonw storage texture access")}}function Kt(r){return r.name.endsWith("_comparison")?"comparison":"filtering"}function $t(r,e){const{binding:t,access:n,type:s}=r;switch(r.resourceType){case y.Uniform:return{binding:t,visibility:e,buffer:{}};case y.Storage:return{binding:t,visibility:e,buffer:{type:n===""||n==="read"?"read-only-storage":"storage"}};case y.Texture:{if(s.name==="texture_external")return{binding:t,visibility:e,externalTexture:{}};const i=s.name.includes("multisampled");return{binding:t,visibility:e,texture:{sampleType:jt(s),viewDimension:Oe(s),multisampled:i}}}case y.Sampler:return{binding:t,visibility:e,sampler:{type:Kt(s)}};case y.StorageTexture:return{binding:t,visibility:e,storageTexture:{access:Xt(s),format:s.format.name,viewDimension:Oe(s)}};default:throw new Error("unknown resource type")}}function ie(r,e){const t={};for(const n of r)t[n.name]={stage:e,resources:n.resources.map(s=>{const{name:i,group:c}=s;return{name:i,group:c,entry:$t(s,e)}})};return t}function Jt(r){const e=new T(r),t=Object.fromEntries(e.structs.map(m=>[m.name,Ne(e,m,0)])),n=B(e,e.uniforms),s=B(e,e.storage.filter(m=>m.resourceType===y.Storage)),i=B(e,e.storage.filter(m=>m.resourceType===y.StorageTexture)),c=B(e,e.textures.filter(m=>m.type.name!=="texture_external")),h=B(e,e.textures.filter(m=>m.type.name==="texture_external")),f=B(e,e.samplers),p={...ie(e.entry.vertex,GPUShaderStage.VERTEX),...ie(e.entry.fragment,GPUShaderStage.FRAGMENT),...ie(e.entry.compute,GPUShaderStage.COMPUTE)};return{externalTextures:h,samplers:f,structs:t,storages:s,storageTextures:i,textures:c,uniforms:n,entryPoints:p}}function oe(r,e=""){if(!r)throw new Error(e)}function Zt(r,e,t){switch(e.resourceType){case y.Uniform:case y.Storage:case y.StorageTexture:return ue(r,e.type,t);default:return{size:0,type:e.type.name}}}function ue(r,e,t){if(e.isArray){oe(!e.isStruct,"struct array is invalid"),oe(!e.isStruct,"template array is invalid");const n=e;return{size:n.size,elementType:ue(r,n.format,t),numElements:n.count}}else{if(e.isStruct)return oe(!e.isTemplate,"template struct is invalid"),Ne(r,e,t);{const n=e,s=e.isTemplate?`${n.name}<${n.format.name}>`:e.name;return{size:e.size,type:s}}}}const Qt=new Map([[Int8Array,{formats:["sint8","snorm8"],defaultForType:1}],[Uint8Array,{formats:["uint8","unorm8"],defaultForType:1}],[Int16Array,{formats:["sint16","snorm16"],defaultForType:1}],[Uint16Array,{formats:["uint16","unorm16"],defaultForType:1}],[Int32Array,{formats:["sint32","snorm32"],defaultForType:0}],[Uint32Array,{formats:["uint32","unorm32"],defaultForType:0}],[Float32Array,{formats:["float32","float32"],defaultForType:0}]]);new Map([...Qt.entries()].map(([r,{formats:[e,t]}])=>[[e,r],[t,r]]).flat());const er=r=>r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]});function tr(r){const e=Jt(me),t=ye(e.uniforms.flames),n=er(r),s=r.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),i=r.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),c=r.createBuffer({size:4*3,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),h=r.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),f=r.createBuffer({size:t.arrayBuffer.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),p=r.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return{bindgroup:r.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:i}},{binding:2,resource:{buffer:c}},{binding:3,resource:{buffer:h}},{binding:4,resource:{buffer:f}},{binding:5,resource:{buffer:p}}]}),bindgroupLayout:n,flamesVariableDefinition:e.uniforms.flames,buffers:{gamma:s,logDensity:i,densityEstimation:c,antialiasing:h,flames:f,timeElapsed:p}}}function Ge(r){return{enabled:[r.enabled],color:{r:[r.color.r],g:[r.color.g],b:[r.color.b]},colorPaletteIdx:[r.colorPaletteIndex],weight:[r.weight],transform:{a:[r.transform.a],b:[r.transform.b],c:[r.transform.c],d:[r.transform.d],e:[r.transform.e],f:[r.transform.f]},variations:r.weightedVariations.map(e=>({weight:[e.weight],variation:[$e(e.variation)]}))}}function rr(r,e,t,n,s){var c,h,f,p;const i=ye(s.flamesVariableDefinition);i.set({resolution:[1920,1080],palette:{a:[t.namedPalette.palette.a.x,t.namedPalette.palette.a.y,t.namedPalette.palette.a.z],b:[t.namedPalette.palette.b.x,t.namedPalette.palette.b.y,t.namedPalette.palette.b.z],c:[t.namedPalette.palette.c.x,t.namedPalette.palette.c.y,t.namedPalette.palette.c.z],d:[t.namedPalette.palette.d.x,t.namedPalette.palette.d.y,t.namedPalette.palette.d.z]},gammaCorrection:t.gammaCorrection,densityEstimation:{enabled:[t.densityEstimation!=null],minsigma:[((c=t.densityEstimation)==null?void 0:c.minSigma)??0],maxsigma:[((h=t.densityEstimation)==null?void 0:h.maxSigma)??0]},antialiasing:[t.antialiasing?1:0],renderMode:[Qe(t.renderMode)],spaceWarp:{zoom:[t.spaceWarp.zoom],rotationalSymmetry:[t.spaceWarp.rotationalSymmetry],mirrorX:[t.spaceWarp.mirrorX],mirrorY:[t.spaceWarp.mirrorY]},finalComponent:Ge(t.final),components:t.components.map(Ge)}),r.queue.writeBuffer(s.buffers.flames,0,i.arrayBuffer),r.queue.writeBuffer(s.buffers.timeElapsed,0,new Uint32Array([Date.now()])),r.queue.writeBuffer(n.buffers.heatmapMax,0,new Uint32Array([e.heatmapMax])),r.queue.writeBuffer(s.buffers.gamma,0,new Float32Array([t.gammaCorrection])),r.queue.writeBuffer(s.buffers.logDensity,0,new Float32Array([+(t.renderMode!=Je)])),r.queue.writeBuffer(s.buffers.densityEstimation,0,new Float32Array([t!=null&&t.densityEstimation?1:0,((f=t==null?void 0:t.densityEstimation)==null?void 0:f.minSigma)??0,((p=t==null?void 0:t.densityEstimation)==null?void 0:p.maxSigma)??0])),r.queue.writeBuffer(s.buffers.antialiasing,0,new Float32Array([t.antialiasing?1:0]))}function q(r,e,t){return r.createComputePipeline({layout:e,compute:{module:r.createShaderModule({code:t}),entryPoint:"main"}})}let g,ce={x:0,y:0},nr=0,le=0,V,M,De,N,O,Z,x,Re,Le,We,Ye,He,P,Q;function G(r,e,t=1920,n=1080){r.setPipeline(e),r.setBindGroup(0,O.bindgroup),r.setBindGroup(1,Z.bindgroup),r.dispatchWorkgroups(t/8,n/8)}async function sr(r,e){rr(x,r,g,O,Z);let t=O.buffers.finalImage,n=x.createCommandEncoder({label:"Compute encoder"}),s=n.beginComputePass();G(s,Le,16,16),G(s,We),g!=null&&g.antialiasing?G(s,He):G(s,Ye),g!=null&&g.densityEstimation&&(G(s,Re),t=O.buffers.blurredImage),s.end(),n.copyBufferToBuffer(t,0,N,0,N.size),x.queue.submit([n.finish()]),await N.mapAsync(GPUMapMode.READ);const i=new Uint8ClampedArray(N.getMappedRange()),c=new ImageData(i,1920,1080);e.putImageData(c,0,0),N.unmap()}function je(){let r=x.createCommandEncoder({label:"Reset render data encoder"}),e=r.beginComputePass();G(e,Q),e.end(),x.queue.submit([r.finish()])}async function ar(r){if(!M||!V||!De||!g)return;g.spaceWarp.rotationalSymmetry>1&&(le=(le+2*Math.PI/g.spaceWarp.rotationalSymmetry)%(2*Math.PI));let e=g.antialiasing?M:V;const t=Date.now();await sr(e,r),console.log("Frame cost : "+(Date.now()-t)+", Total iteration :"+nr++*1e3*64*64)}async function ir(r,e){const t=e.getContext("2d");if(t===null){console.error("Failure to initialize the flames worker due to invaldie canvas context");return}x=await(await navigator.gpu.requestAdapter()).requestDevice(),O=it(x),Z=tr(x),N=x.createBuffer({size:1920*1080*4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),P=x.createPipelineLayout({bindGroupLayouts:[O.bindgroupLayout,Z.bindgroupLayout]}),Le=q(x,P,nt),We=q(x,P,tt),He=q(x,P,et),Ye=q(x,P,rt),Re=q(x,P,me),Q=q(x,P,st),ce={x:e.width,y:e.height},g=r,De??(De=new Uint8ClampedArray(ce.x*ce.y*4)),V??(V=de(g.resolution.x*g.resolution.y)),M??(M=de(g.resolution.x*g.resolution.y*3*3)),requestAnimationFrame(s);async function s(){g!==void 0&&t&&await ar(t),setTimeout(()=>requestAnimationFrame(s),1e3/60)}}function or(r){g=r,M&&H(M),V&&H(V),Q&&je()}function ur(r){le=0,g=r,M&&H(M),V&&H(V),Q&&je()}function cr(r){g=r}onmessage=async({data:r})=>{const e=Ze(r.rawFlames);switch(r.resetType){case"init":r.canvasContext&&await ir(e,r.canvasContext);break;case"full":or(e);break;case"soft":ur(e);break;case"none":cr(e);break}postMessage({flames:JSON.stringify(e,null,4)})}})();
