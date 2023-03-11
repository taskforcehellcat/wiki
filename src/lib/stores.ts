import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const keysLayout = writable(browser && (localStorage.getItem('preferredKeyboardLayout') || 'de-win'));
