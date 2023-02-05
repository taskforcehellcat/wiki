import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themeId = writable(browser && (localStorage.getItem('theme') || 'auto'));
