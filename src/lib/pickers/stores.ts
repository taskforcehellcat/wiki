import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themeId = writable(
  browser && (localStorage.getItem('theme') || 'auto')
);

export const layoutId = writable(
  browser && (localStorage.getItem('layout') || 'de-win')
);
