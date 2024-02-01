@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<uniform> heatmapMax: f32;
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;

struct DensityEstimation {
    enabled: f32,
    minsigma: f32,
    maxsigma: f32,
}

@group(1) @binding(0) var<uniform> gamma: f32;
@group(1) @binding(1) var<uniform> logDensity: u32;
@group(1) @binding(2) var<uniform> densityEstimation: DensityEstimation;

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
    let cIdx = 3 * x + 3 * y * rowsize;

    return (pixels[cIdx] + pixels[cIdx + 1] + pixels[cIdx + 2] + pixels[cIdx + rowsize + 0] + pixels[cIdx + rowsize + 1] + pixels[cIdx + rowsize + 2] + pixels[cIdx + 2 * rowsize + 0] + pixels[cIdx + 2 * rowsize + 1] + pixels[cIdx + 2 * rowsize + 2]) / 9;
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
    let hvalue = downsampleHeatmap(x, y, 1920u * 3u);
    let logmax = log2(heatmapMax) / log2(10.);
    let logcurrent = log2(f32(hvalue + 1)) / log2(10.);
    let sigma = mix(densityEstimation.minsigma, densityEstimation.maxsigma, f32(hvalue) / heatmapMax);

    // Short circuit sigma value leading to the default gaussian kernel.
    if sigma < 1e-2 {
        blurredImage[x + y * 1920] = image[x + y * 1920u];
        return;
    }

    let len = createKernel(densityEstimation.maxsigma);

    blur(i32(x), i32(y), len);
}  