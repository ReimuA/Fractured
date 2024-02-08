@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> output: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;

@group(1) @binding(0) var<uniform> gamma: f32;
@group(1) @binding(1) var<uniform> logDensity: u32;

fn downsamplePixels(x: u32, y: u32, rowsize: u32) -> vec4<u32> {
    let cIdx = 3 * x + 3 * y * rowsize;

    let c1 = pixels[cIdx];
    let c2 = pixels[cIdx + 1];
    let c3 = pixels[cIdx + 2];
    let c4 = pixels[cIdx + rowsize + 0];
    let c5 = pixels[cIdx + rowsize + 1];
    let c6 = pixels[cIdx + rowsize + 2];
    let c7 = pixels[cIdx + 2 * rowsize + 0];
    let c8 = pixels[cIdx + 2 * rowsize + 1];
    let c9 = pixels[cIdx + 2 * rowsize + 2];

    let arr = array<u32, 9>(c1, c2, c3, c4, c5, c6, c7, c8, c9);
    var res = vec4<u32>(0);

    for (var i = 0; i < 9; i++) {
        res.x += (arr[i] >> 24) & 0xFF;
        res.y += (arr[i] >> 16) & 0xFF;
        res.z += (arr[i] >> 8) & 0xFF;
        res.w += (arr[i]) & 0xFF;
    }

    res /= 9;

    return res;
}

fn downsampleHeatmap(x: u32, y: u32, rowsize: u32) -> u32 {
    let cIdx = 3 * x + 3 * y * rowsize;

    return (heatmap[cIdx] + heatmap[cIdx + 1] + heatmap[cIdx + 2] + heatmap[cIdx + rowsize + 0] + heatmap[cIdx + rowsize + 1] + heatmap[cIdx + rowsize + 2] + heatmap[cIdx + 2 * rowsize + 0] + heatmap[cIdx + 2 * rowsize + 1] + pixels[cIdx + 2 * rowsize + 2]) / 9;
}

// return a rgba color, 8 bit per channel.
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {
    var fres = vec4<f32>(col);
    var fAlpha = 1.;
    var logmax = log2(f32(heatmapMax)) / log2(10.);

    if (logDensity != 0 && hvalue != 0.) {
        fAlpha = clamp((log2(10. * hvalue) / log2(10.)) / logmax, 0, 1);
    }

    fres /= 255.;

    fres.w = clamp(pow(fAlpha * fres.w, gamma), 0, 1);
    fres.z = clamp(pow(fAlpha * fres.z, gamma), 0, 1);
    fres.y = clamp(pow(fAlpha * fres.y, gamma), 0, 1);
    fres.x = clamp(pow(fAlpha * fres.x, gamma), 0, 1);

    fres *= 255.;

    let res = vec4<u32>(fres);
    return (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;
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
    let rowsize = 3u * 1920u;

    let res = downsamplePixels(x, y, rowsize);
    let hvalue = downsampleHeatmap(x, y, rowsize);

    output[x + y * (rowsize / 3)] = gammaCorrection(res, f32(hvalue));
}