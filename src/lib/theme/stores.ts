import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const themeId = writable(browser && (localStorage.getItem('theme') || 'auto'));
