@group(0) @binding(0) var<storage, read_write> input: array<u32>;
@group(0) @binding(1) var<storage, read_write> output: array<u32>;

@group(1) @binding(0) var<uniform> gamma: f32;

@compute @workgroup_size(8, 8)fn main(
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,
    @builtin(local_invocation_index) local_invocation_index: u32,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    let rowsize = 3u * 1920u;
    let x = global_invocation_id.x;
    let y = global_invocation_id.y;
    let cIdx = 3 * x + 3 * y * rowsize;

    let c1 = input[cIdx];
    let c2 = input[cIdx + 1];
    let c3 = input[cIdx + 2];
    let c4 = input[cIdx + rowsize + 0];
    let c5 = input[cIdx + rowsize + 1];
    let c6 = input[cIdx + rowsize + 2];
    let c7 = input[cIdx + 2 * rowsize + 0];
    let c8 = input[cIdx + 2 * rowsize + 1];
    let c9 = input[cIdx + 2 * rowsize + 2];

    let arr = array<u32, 9>(c1, c2, c3, c4, c5, c6, c7, c8, c9);
    var res = vec4<u32>(0);

    for (var i = 0; i < 9; i++) {
        res.x += (arr[i] >> 24) & 0xFF;
        res.y += (arr[i] >> 16) & 0xFF;
        res.z += (arr[i] >> 8) & 0xFF;
        res.w += (arr[i]) & 0xFF;
    }

    res /= 9;

    var fres = vec4<f32>(res);
    fres /= 255.;

    fres.w = clamp(0, 1, pow(fres.w, 1. / gamma));
    fres.z = clamp(0, 1, pow(fres.z, 1. / gamma));
    fres.y = clamp(0, 1, pow(fres.y, 1. / gamma));
    fres.x = clamp(0, 1, pow(fres.x, 1. / gamma));

    fres *= 255.;

    res = vec4<u32>(fres);
    let fc: u32 = (0xFF << 24) | (res.y << 16) | (res.z << 8) | res.w;
    
    output[x + y * (rowsize / 3)] = fc;
}