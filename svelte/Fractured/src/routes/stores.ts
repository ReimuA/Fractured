import { writable } from 'svelte/store';
import type { Variation } from './FlamesUtils/Variations';

export const variationsPools = writable<Variation[]>([]);
