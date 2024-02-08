// Using Float32 to represent color component imply that each color take 96 (128 with alpha channel) bits to represent.
// Moreover, most of these bit are useless since color represented are contained between 0 and 1.
// The purpose of this function is to reduce the space used by such color representation by mapping each color
// component between 0 and 255, and compose a 32 bit unsigned integer from these component.
// This is a performance killer since it iterate over supersampled array, but i hope i will be able to remove it.
export function reduceColorArray(input: Float32Array): Uint32Array {
    const length = input.length / 3
    let arr = new Uint32Array(length)


    for (let i = 0; i < length; i++) {
        let r = Math.round(input[i * 3] * 255);
        let g = Math.round(input[i * 3 + 1] * 255);
        let b = Math.round(input[i * 3 + 2] * 255);

        arr[i] = (r << 16) | (g << 8) | (b);
    }

    return arr;
}
/* 
function dec2bin(dec : number) {
    return (dec >>> 0).toString(2).match(/.{1,8}/g);;
  }

  let f32 = new Float32Array([1, 0.75, 0.5, 0]);

  let res = reduceColorArray(f32)

  console.log(dec2bin(res[0])) */