/*
    utility function that returns a theme preference of the client
*/

import { themeId } from '$lib/pickers/stores';
import { get } from 'svelte/store';

function getTheme(): 'dark' | 'light' {
  // note: $-syntax does not work outside svelte files
  const themeChoice = get(themeId) || 'light';

  if (themeChoice === 'dark' || themeChoice === 'light') {
    return themeChoice;
  }

  // else $themeId is auto and we return the clients preference
  let clientPreference: 'light' | 'dark' = 'light';
  if (window) {
    clientPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return clientPreference;
}

export default getTheme;
