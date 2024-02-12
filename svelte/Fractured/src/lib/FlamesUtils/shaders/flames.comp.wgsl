@group(0) @binding(0) var<storage, read_write> heatmap: array<atomic<u32>>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: atomic<u32>;
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;

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
@group(1) @binding(5) var<uniform> timeElapsed: u32;

const maxVariationPerComponent = 16;
const maxComponentPerFlames = 16;
const iterationPerInvocation = 1000;

// Local heatmap cached value, to avoid using atomic operation until the end.
var<private> localHeatmapMax = 0u;

// State of the random number generator
var<private> seed: u32 = 0;

// Initialize the random number generator with a seed
fn initRandom(newSeed: u32) {
    seed = newSeed;
}

fn smu32() -> u32 {
    seed = seed + 0x9e3779b9u;
    var z: u32 = seed;
    z = (z ^ (z >> 15)) * 0x85ebca6bu;
    z = (z ^ (z >> 13)) * 0xc2b2ae35u;
    return z ^ (z >> 16);
}

fn smf32() -> f32 {
    return abs(f32(smu32())) / abs(f32(4294967296.0));
}

fn swirlVariation(tp: vec2<f32>) -> vec2<f32> {
    let r = length(tp);
    let r2 = r * r;
    let cos = cos(r2);
    let sin = sin(r2);
    return vec2<f32>(tp.x * sin - tp.y * cos, tp.x * cos + tp.y * sin);
}

fn applyVariation(tp: vec2<f32>, variation: WeightedVariation, transform: IFSTransform) -> vec2<f32> {
    var result = vec2(0.);

    switch (variation.variation) {
        case 0: {
            result = tp;
        }
        case 3: {
            result = swirlVariation(tp);
        }
        default: {
            result = tp; 
        }
    }
    return result;
}

fn randomComponentIdx() -> u32 {
    let r = smf32();
    var accumulator = 0.;
    var i = 0u;

    for (; i < maxComponentPerFlames; i++) {
        if flames.components[i].enabled == 0 {
            break;
        }

        accumulator += flames.components[i].weight;
        if accumulator >= r {
            return i;
        }
    }

    return i - 1;
}

fn applyComponent(p: vec2<f32>, component: FlamesComponent) -> vec2<f32> {
    var newP = vec2(0.);
    let transform = component.transform;
    let tp = vec2<f32>(
        transform.a * p.x + transform.b * p.y + transform.c,
        transform.d * p.x + transform.e * p.y + transform.f
    );

    for (var i = 0; i < maxVariationPerComponent; i++) {
        let vp = applyVariation(tp, component.variations[i], transform);

        newP += vp * component.variations[i].weight;
    }

    return newP;
}

fn applyFlames(p: vec2<f32>, componentIdx: u32) -> vec2<f32> {
    let newP = applyComponent(p, flames.components[componentIdx]);
    return newP;
    return applyComponent(p, flames.finalComponent);
}


// TODO: rotation
fn worldCoordinatesToPixels(p: vec2<f32>, resolution: vec2<u32>) -> vec2<u32> {
    let pixel = vec2<f32>(
        (p.x + 2. * (f32(resolution.x) / f32(resolution.y))) * (f32(resolution.y) / 4.),
        (p.y + 2.) * (f32(resolution.y) / 4.)
    );

    return vec2<u32>(round(pixel));
}

fn updateRenderData(pixel: vec2<u32>, componentIdx: u32) {
    let component = flames.components[componentIdx];
    let colorPaletteIdx = component.colorPaletteIdx;
    let idx = pixel.y * flames.resolution.x + pixel.x;
    // renderData.paletteAccumulator[idx] = (renderData.paletteAccumulator[idx] + colorPaletteIdx) / 2;
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;

    if localHeatmapMax < bucketValue {
        localHeatmapMax = bucketValue;
    }
}

fn updateRenderData3x(pixel: vec2<u32>, componentIdx: u32) {
    let component = flames.components[componentIdx];
    let colorPaletteIdx = component.colorPaletteIdx;
    const hOffset = 1920u * 1080u;

    let idx = pixel.y * flames.resolution.x * 3u + pixel.x + hOffset;
    // renderData.paletteAccumulator[idx] = (renderData.paletteAccumulator[idx] + colorPaletteIdx) / 2;
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;

    if flames.antialiasing != 0 {
        let bucketX = (pixel.x - pixel.x % 3) / 3;
        let bucketY = (pixel.y - pixel.y % 3) / 3;
        let hidx = 3 * bucketX + 3 * bucketY * flames.resolution.x * 3 + hOffset;

        bucketValue = (atomicLoad(&heatmap[hidx]) + atomicLoad(&heatmap[hidx + 1]) + atomicLoad(&heatmap[hidx + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 + 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 1]) + atomicLoad(&heatmap[hidx + flames.resolution.x * 3 * 2 + 2])) / 9;
    
        if localHeatmapMax < bucketValue {
            localHeatmapMax = bucketValue;
        }
    }
}


@compute @workgroup_size(8, 8)
fn main(
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,
    @builtin(local_invocation_index) local_invocation_index: u32,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    initRandom(timeElapsed * ((global_invocation_id.x << 16) | global_invocation_id.y));

    let res3x = 3 * flames.resolution;
    var p = vec2(0.);

    for (var i = 0; i < iterationPerInvocation; i++) {
        var componentIdx = randomComponentIdx();

        p = applyFlames(p, componentIdx);

        // p *= flames.spaceWarp.zoom;
        // p = applyMirror();

        let pixel3x = worldCoordinatesToPixels(p, res3x);
        let pixel = worldCoordinatesToPixels(p, flames.resolution);

        if i > 20 && pixel3x.x > 0 && pixel3x.x < res3x.x && pixel3x.y > 0 && pixel3x.y < res3x.y {
           updateRenderData3x(pixel3x, componentIdx);
        }

        if i > 20 && pixel.x > 0 && pixel.x < flames.resolution.x && pixel.y > 0 && pixel.y < flames.resolution.y {
            updateRenderData(pixel, componentIdx);
        }
    }

    atomicMax(&heatmapMax, localHeatmapMax);
}  