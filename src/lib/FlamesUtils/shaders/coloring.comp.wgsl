@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;

@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;

struct DensityEstimation {
    enabled: f32,
    minsigma: f32,
    maxsigma: f32,
}

struct Rgb {
    r: f32,
    g: f32,
    b: f32,
}

// Cosine gradient procedural palette
struct ColorPalette {
    a: vec3<f32>,
    b: vec3<f32>,
    c: vec3<f32>,
    d: vec3<f32>,
}

// Rotation and translation matrices
struct IFSTransform {
    a: f32,
    b: f32,
    c: f32,
	d: f32,
    e: f32,
    f: f32,
}

struct WeightedVariation {
    variation: u32,
    @size(12) weight: f32,
}

struct FlamesComponent {
	enabled: u32,
    colorPaletteIdx: f32,
    @size(8) weight: f32,
    color: Rgb,
    @align(16) transform: IFSTransform,
    @align(16) variations: array<WeightedVariation, 16>,
}

struct SpaceWarp {
    zoom: f32,
    rotationalSymmetry: u32,
    mirrorX: u32,
    mirrorY: u32,
}

struct Flames {
    resolution: vec2<u32>,
    gammaCorrection: f32,
    antialiasing: u32,
    renderMode: u32,
    @align(16) palette: ColorPalette,
    @align(16) spaceWarp: SpaceWarp,
    @align(16) densityEstimation: DensityEstimation,
    @align(16) finalComponent: FlamesComponent,
    components: array<FlamesComponent, 16>,
};

@group(1) @binding(4) var<uniform> flames: Flames;

const HEATMAP = 0u;
const STRUCTURAL = 1u;
const STRUCTURAL_PALETTE = 2u;
const STRUCTURAL_PALETTE_INDEX = 3u;

fn c01(x: f32) -> f32 {
    return clamp(x, 0, 1);
}

fn log10(n: f32) -> f32 {
    const log2_10: f32 = 3.321928094887362;
    return log2(n) / log2_10;
}

fn palette(t: f32) -> vec3<f32> {
    let p = flames.palette;
    return vec3<f32>(
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),
    );
}

fn heatmapColoring(idx: u32) -> vec3<f32> {
    let hValue = heatmap[idx];
    if hValue == 0 {
        return vec3(0);
    }

    let maxDensity = log2(f32(heatmapMax));
    let density = log2(f32(hValue));
    let colorIdx = density / maxDensity;
    return palette(colorIdx);
}

fn structural(color: u32) -> vec3<f32> {
    let r = (color >> 16) & 0xFF;
    let g = (color >> 8) & 0xFF;
    let b = (color) & 0xFF;
    
    return vec3<f32>(
        f32(r),
        f32(g),
        f32(b)
    ).zyx;
}

fn coloring(pIdx: u32, hIdx: u32) -> u32 {
    if (heatmap[hIdx] < 1) {
        return 0;
    }

    let renderMode = flames.renderMode;
    var c: vec3<f32>;
    if renderMode == HEATMAP {
        c = heatmapColoring(hIdx) * 255.;
    }
    if renderMode == STRUCTURAL_PALETTE_INDEX {
        c = palette(f32(paletteIndexAccumulator[hIdx]) / 1e4)  * 255.;
    }
    if renderMode == STRUCTURAL {
        c = structural(colorAccumulator[hIdx]);
    }
    if renderMode == STRUCTURAL_PALETTE {
        c = structural(paletteAccumulator[hIdx]);
    }

    let previousColor = pixels[pIdx];
    let c2 = vec3<f32>(
        f32((previousColor) & 0xFF),
        f32((previousColor >> 8) & 0xFF),
        f32((previousColor >> 16) & 0xFF)
    );

    // Pixels Interpolation isn't working correctly when switching from/to antialising. Could be due to a single buffer being used now.
    c = mix(c2 , c, 0.15);
    var c255 = vec3<u32>(c);

    return (0xFF << 24) | (u32(c255.z & 0xFF) << 16) | (u32(c255.y & 0xFF) << 8) | (u32(c255.x & 0xFF));
}

@compute @workgroup_size(8, 8)
fn main(
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,
    @builtin(local_invocation_index) local_invocation_index: u32,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    let x = global_invocation_id.x;
    let y = global_invocation_id.y;

    if flames.antialiasing == 0 {
        let idx = x + y * flames.resolution.x;
        pixels[idx] = coloring(idx, idx);
        return;
    }

    const hOffset = 1920u * 1080u;
    let rowsize = flames.resolution.x * 3u;

    let pIdx = (x + y * rowsize) * 3u + hOffset;
    let hIdx = (x + y * rowsize) * 3u + hOffset;


    pixels[pIdx] = coloring(pIdx, hIdx);
    pixels[pIdx + 1] = coloring(pIdx + 1, hIdx + 1);
    pixels[pIdx + 2] = coloring(pIdx + 2, hIdx + 2);
    pixels[pIdx + rowsize + 0] = coloring(pIdx + rowsize + 0, hIdx + rowsize + 0);
    pixels[pIdx + rowsize + 1] = coloring(pIdx + rowsize + 1, hIdx + rowsize + 1);
    pixels[pIdx + rowsize + 2] = coloring(pIdx + rowsize + 2, hIdx + rowsize + 2);
    pixels[pIdx + 2 * rowsize + 0] = coloring(pIdx + 2 * rowsize + 0, hIdx + 2 * rowsize + 0);
    pixels[pIdx + 2 * rowsize + 1] = coloring(pIdx + 2 * rowsize + 1, hIdx + 2 * rowsize + 1);
    pixels[pIdx + 2 * rowsize + 2] = coloring(pIdx + 2 * rowsize + 2, hIdx + 2 * rowsize + 2);
}  