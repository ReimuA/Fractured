// seed parameter is used as an integer and is thus truncated
export function splitmix32(seed: number) {
    return function () {
        seed |= 0; seed = seed + 0x9e3779b9 | 0;
        let t = seed ^ seed >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

export function randomWeigthedSelection<T>(objs: (T & { weight: number })[]): T {
	const r = Math.random();
	let accumulator = 0;

	for (let i = 0; i < objs.length; i++) {
		accumulator += objs[i].weight;
		if (accumulator > r) return objs[i];
	}

	return objs[objs.length - 1];
}
