import { writable } from 'svelte/store';
import type { Hit } from './engine';

export const searchResults = writable<Array<Hit>>([]);
export const searchInUse = writable(false);
