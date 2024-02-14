@group(0) @binding(0) var<storage, read_write> heatmap: array<u32>;
@group(0) @binding(1) var<storage, read_write> pixels: array<u32>;
@group(0) @binding(2) var<storage, read_write> image: array<u32>;
@group(0) @binding(3) var<storage, read_write> heatmapMax: u32;
@group(0) @binding(4) var<storage, read_write> blurredImage: array<u32>;

@group(0) @binding(5) var<storage, read_write> paletteIndexAccumulator: array<u32>;
@group(0) @binding(6) var<storage, read_write> colorAccumulator: array<u32>;
@group(0) @binding(7) var<storage, read_write> paletteAccumulator: array<u32>;

@compute @workgroup_size(8, 8)
fn main(
    @builtin(workgroup_id) workgroup_id: vec3<u32>,
    @builtin(local_invocation_id) local_invocation_id: vec3<u32>,
    @builtin(global_invocation_id) global_invocation_id: vec3<u32>,
    @builtin(local_invocation_index) local_invocation_index: u32,
    @builtin(num_workgroups) num_workgroups: vec3<u32>
) {
    heatmapMax = 0;
    let x = global_invocation_id.x;
    let y = global_invocation_id.y;
    let idx = (x + y * 1920u) * 10;

    for (var i = 0u; i < 10; i++) {
        pixels[idx + i] = 0;
        heatmap[idx + i] = 0;
        colorAccumulator[idx + i] = 0;
        paletteAccumulator[idx + i] = 0;
        paletteIndexAccumulator[idx + i] = 0;
    }
}  