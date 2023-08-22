import { writable } from 'svelte/store';
import { FlamesBuilder } from '$lib/FlamesUtils/flamesBuilder';

export type flamesBuilderStoreValue = {
	builder: FlamesBuilder;
	resetType: 'full' | 'soft' | 'none';
};

export const flamesBuilderStore = writable<flamesBuilderStoreValue>({
	builder: new FlamesBuilder(),
	resetType: 'full'
});

export const flamesJsonMetadata = writable<string>('{}');

export const canvasRef = writable<HTMLCanvasElement>();
