@group(0) @binding(0) var<storage, read_write> heatmap: array<atomic<u32>>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: atomic<u32>;
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;

@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<atomic<u32>>;
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<atomic<u32>>;
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<atomic<u32>>;

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

const pi = 3.1415926;

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

fn c01(x: f32) -> f32 {
    return clamp(x, 0, 1);
}

fn rotate2d(p: vec2<f32>, offset: vec2<f32>, angle: f32) -> vec2<f32> {
	let x = p.x - offset.x;
	let y = p.y - offset.y;

	let s = sin(angle);
	let c = cos(angle);

	return vec2<f32>(
		x * c - s * y + offset.x,
		x * s + c * y + offset.y
    );
}

fn updatePaletteAccumulator(index: u32, colorPaletteIdx: f32) {
    var paletteColor = palette(colorPaletteIdx);
    var c255 = vec3<u32>(paletteColor * 255);
    var colorU32 = atomicLoad(&paletteAccumulator[index]);

    var color = vec3<u32>(
        colorU32 & 0xFF,
        (colorU32 >> 8) & 0xFF,
        (colorU32 >> 16) & 0xFF
    );

    color += c255;
    color /= 2;
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));
    atomicStore(&paletteAccumulator[index], colorU32);
}

fn updateColorAccumulator(index: u32, newColor: vec3<f32>) {
    var colorU32 = atomicLoad(&colorAccumulator[index]);

    var color = vec3<u32>(
        colorU32 & 0xFF,
        (colorU32 >> 8) & 0xFF,
        (colorU32 >> 16) & 0xFF
    );

    color += vec3<u32>(newColor * 255);
    color /= 2;
    colorU32 = (0xFF << 24) | (u32(color.z & 0xFF) << 16) | (u32(color.y & 0xFF) << 8) | (u32(color.x & 0xFF));
    atomicStore(&colorAccumulator[index], colorU32);
}

// Since atomic<f32> isn't allowed, we increase the range of the accumulator from 0-1 to 0-1e4 to keep some precision as a u32.
fn updatePaletteIndexAccumulator(index: u32, paletteIndex: f32) {
    var palletteIndexU32 = u32(paletteIndex * 1e4);

    var newValue = (atomicLoad(&paletteIndexAccumulator[index]) + palletteIndexU32) / 2;
    atomicStore(&paletteIndexAccumulator[index], newValue);
}

// See https://flam3.com/flame_draves.pdf - Appendix: Catalog of Variations
fn theta(p: vec2<f32>) -> f32 {
    return atan2(p.y, p.x);
}

fn phi(p: vec2<f32>) -> f32 {
    return atan2(p.x, p.y);
}

fn r(p: vec2<f32>) -> f32 {
    return length(p);
}

fn omega() -> f32 {
     if (smf32() < 0.5) {
        return 0.;
    }

    return pi;
}

fn lambda() -> f32 {
    if (smf32() < 0.5) {
        return -1.;
    }

    return 1.;
}

fn psi() -> f32 {
    return smf32();
}


fn swirlVariation(tp: vec2<f32>) -> vec2<f32> {
    let r = length(tp);
    let r2 = r * r;
    let cos = cos(r2);
    let sin = sin(r2);
    return vec2<f32>(tp.x * sin - tp.y * cos, tp.x * cos + tp.y * sin);
}

fn juliaVariation(tp: vec2<f32>) -> vec2<f32> {
    let r = r(tp);
    let theta = theta(tp);
    let omega = omega();
    let rSqrt = sqrt(r);

    return vec2(
        rSqrt * cos(theta / 2. + omega),
        rSqrt * sin(theta / 2. + omega)
    );
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
        case 13: {
            result = juliaVariation(tp);
        }
        default: {
            result = tp; 
        }
    }
    return result;
}

fn palette(t: f32) -> vec3<f32> {
    let p = flames.palette;
    return vec3<f32>(
        c01(p.a.x + p.b.x * cos(6.28318 * (p.c.x * t + p.d.x))),
        c01(p.a.y + p.b.y * cos(6.28318 * (p.c.y * t + p.d.y))),
        c01(p.a.z + p.b.z * cos(6.28318 * (p.c.z * t + p.d.z))),
    );
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


fn worldCoordinatesToPixels(p: vec2<f32>, resolution: vec2<u32>, rotation: f32) -> vec2<u32> {
    let pixel = vec2<f32>(
        (p.x + 2. * (f32(resolution.x) / f32(resolution.y))) * (f32(resolution.y) / 4.),
        (p.y + 2.) * (f32(resolution.y) / 4.)
    );

    if (flames.spaceWarp.rotationalSymmetry == 1) {
		return vec2<u32>(round(pixel));
    }

	let rPixel = rotate2d(pixel, vec2<f32>(resolution) / 2., rotation);

    return vec2<u32>(round(rPixel));
}

fn updateRenderData(pixel: vec2<u32>, componentIdx: u32) {
    let component = flames.components[componentIdx];
    let colorPaletteIdx = component.colorPaletteIdx;
    let idx = pixel.y * flames.resolution.x + pixel.x;
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;
    
    updatePaletteAccumulator(idx, colorPaletteIdx);
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);

    if flames.antialiasing == 0 && localHeatmapMax < bucketValue {
        localHeatmapMax = bucketValue;
    }
}

fn updateRenderData3x(pixel: vec2<u32>, componentIdx: u32) {
    let component = flames.components[componentIdx];
    let colorPaletteIdx = component.colorPaletteIdx;
    const hOffset = 1920u * 1080u;

    let idx = pixel.y * flames.resolution.x * 3u + pixel.x + hOffset;
    var bucketValue = atomicAdd(&heatmap[idx], 1) + 1;

    updatePaletteAccumulator(idx, colorPaletteIdx);
    updateColorAccumulator(idx, vec3<f32>(component.color.r, component.color.g, component.color.b));
    updatePaletteIndexAccumulator(idx, colorPaletteIdx);
   
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

    var rotation = 1.;

    // With current implementation, only up to 64 rotation can be enabled
    if (flames.spaceWarp.rotationalSymmetry != 1) {
        let localId = f32(8 * local_invocation_id.x + local_invocation_id.y + 1);
        rotation = localId * (2. * pi) / f32(flames.spaceWarp.rotationalSymmetry);
        rotation = rotation % (2. * pi);
    }

    let res3x = 3 * flames.resolution;
    var p = vec2(0.);

    for (var i = 0; i < iterationPerInvocation; i++) {
        var componentIdx = randomComponentIdx();

        p = applyFlames(p, componentIdx);

        // p *= flames.spaceWarp.zoom;
        // p = applyMirror();

        let pixel3x = worldCoordinatesToPixels(p, res3x, rotation);
        let pixel = worldCoordinatesToPixels(p, flames.resolution, rotation);

        if i > 20 && pixel3x.x > 0 && pixel3x.x < res3x.x && pixel3x.y > 0 && pixel3x.y < res3x.y {
           updateRenderData3x(pixel3x, componentIdx);
        }

        if i > 20 && pixel.x > 0 && pixel.x < flames.resolution.x && pixel.y > 0 && pixel.y < flames.resolution.y {
            updateRenderData(pixel, componentIdx);
        }
    }

    atomicMax(&heatmapMax, localHeatmapMax);
}  