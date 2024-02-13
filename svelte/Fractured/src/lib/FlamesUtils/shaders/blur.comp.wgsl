@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: f32;
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

var<private> gaussKern = array<f32, 729>();

const e = 2.718;
const pi = 3.14;

fn createKernel(sigma: f32) -> i32 {
    const gausskern = 3.0;
    let correctedSigma = max(sigma, 1e-6);
    var len = i32(floor(max(3.0, gausskern * correctedSigma)));
    if len % 2 == 0 {
        len += 1;
    }

    let half = i32(floor(f32(len) / 2.));
    var total = 0.;

    let gaussKernTotalLength = len * len;

    for (var i = 0; i < gaussKernTotalLength; i++) {
        let x = i % len - half;
        let y = i / len - half;
        let exponent = pow(e, -f32(x * x + y * y) / (2. * correctedSigma * correctedSigma));
        let value = exponent / (2 * pi * correctedSigma * correctedSigma);
        gaussKern[i] = value;
        total += value;
    }

    for (var i = 0; i < gaussKernTotalLength; i++) {
        gaussKern[i] /= total;
    }

    return len;
}

fn blur(x: i32, y: i32, len: i32) {
    var r = 0.;
    var g = 0.;
    var b = 0.;
    var ml = len / 2;

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            let current: f32 = gaussKern[i + j * len];
            let xOffset = (i - ml);
            let yOffset = j - ml;

            if x + xOffset >= 0 && y + yOffset >= 0 {
                let idx = x + xOffset + (yOffset + y) * 1920;
                r += current * f32((image[idx] >> 0) & 0xFF);
                g += current * f32((image[idx] >> 8) & 0xFF);
                b += current * f32((image[idx] >> 16) & 0xFF);
            };
        }
    }

    blurredImage[x + y * 1920] = (0xFF << 24) | (u32(b) << 16) | (u32(g) << 8) | u32(r);
}

fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {
    const hOffset = 1920u * 1080u;
    let cIdx = 3 * x + 3 * y * rowsize + hOffset;

    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + heatmap[cIdx + 2 * rowsize + 2]) / 9;
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
    var hvalue = heatmap[x + y * 1920u];
    if flames.antialiasing != 0 {
        hvalue = downsampleHeatmap(x, y, 1920u * 3u);
    }

    let logmax = log2(heatmapMax) / log2(10.);
    let logcurrent = log2(f32(hvalue + 1)) / log2(10.);
    let t = 1 - smoothstep(0., 1., f32(hvalue) / heatmapMax); 
    let sigma = mix(flames.densityEstimation.minsigma, flames.densityEstimation.maxsigma, t);

    // Short circuit sigma value leading to the default gaussian kernel.
    if sigma < 1e-2 {
        blurredImage[x + y * 1920] = image[x + y * 1920u];
        return;
    }

    let len = createKernel(flames.densityEstimation.maxsigma);

    blur(i32(x), i32(y), len);
}  