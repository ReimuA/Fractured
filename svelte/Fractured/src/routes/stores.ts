import { writable } from 'svelte/store';
import { FlamesBuilder } from '$lib/FlamesUtils/flamesBuilder';
import type { Flames } from '$lib/FlamesUtils/Flames';

export type flamesStoreValue = {
	flames: Flames;
	resetType: 'full' | 'soft' | 'none';
};

export const flamesBuilderStore = writable<FlamesBuilder>(new FlamesBuilder());


export const flamesStore = writable<flamesStoreValue>({
	flames: new FlamesBuilder().build(),
	resetType: 'full'
});

flamesBuilderStore.subscribe((builder) => {
	const flames = builder.build()
	flamesStore.set({flames, resetType: "full"})
})


export const flamesJsonMetadata = writable<string>('{}');


export const canvasRef = writable<HTMLCanvasElement>();
