import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function updateThemeColor() {
  // Wait a tick for the data-theme attribute to update the CSS variables
  requestAnimationFrame(() => {
    const main = document.getElementById('main');
    if (!main) return;
    const color = getComputedStyle(main).getPropertyValue('--color-bg-primary').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && color) meta.setAttribute('content', color);
  });
}

export const themeId = writable(
  browser ? localStorage.getItem('theme') || 'auto' : 'auto'
);

if (browser) {
  themeId.subscribe(() => updateThemeColor());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => updateThemeColor());
}

export const layoutId = writable(
  browser && (localStorage.getItem('layout') || 'de-win')
);
