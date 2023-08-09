import { writable } from 'svelte/store';
import type { Variation } from '$lib/FlamesUtils/Variations';
import type {  SpaceWarp } from '$lib/FlamesUtils/Flames';
import { FlamesBuilder } from '$lib/FlamesUtils/flamesBuilder';

export type flamesBuilderStoreValue = {
    builder: FlamesBuilder
    resetType: "full" | "soft" | "none"
}

export const flamesBuilderStore = writable<flamesBuilderStoreValue>({builder: new FlamesBuilder(), resetType: "full"})

export const flamesJsonMetadata = writable<string>("{}")

export const canvasRef = writable<HTMLCanvasElement>()