@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> output: array<u32>;
@group(0) @binding(3) var<uniform> heatmapMax: f32;

@group(1) @binding(0) var<uniform> gamma: f32;
@group(1) @binding(1) var<uniform> logDensity: u32;

// return a rgba color, 8 bit per channel.
fn gammaCorrection(col: vec4<u32>, hvalue: f32) -> u32 {
    var fres = vec4<f32>(col);
    var fAlpha = 1.;
    var logmax = log2(heatmapMax) / log2(10.);

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
    let rowsize = 1920u;

    var res = vec4<u32>(0);
    let pixel = pixels[x + y * rowsize];

    res.x += (pixel >> 24) & 0xFF;
    res.y += (pixel >> 16) & 0xFF;
    res.z += (pixel >> 8) & 0xFF;
    res.w += (pixel) & 0xFF;
    
    output[x + y * rowsize] = gammaCorrection(res, f32(pixel));
}