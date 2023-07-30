import { writable } from 'svelte/store';
import type { Variation } from './Variations';

export const variationsPools = writable<Variation[]>([]);
