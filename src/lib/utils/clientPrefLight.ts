/* 
    store that contains whether the client prefers a light color theme
*/

import { readable } from 'svelte/store';

const clientPrefLight = readable(true, (set) => {
  const query = window.matchMedia('(prefers-color-scheme: light)');
  set(query.matches);

  const update = (e: MediaQueryList) => set(e.matches);

  query.addEventListener('change', update);

  return function stop() {
    query.removeEventListener('change', update);
  };
});

export default clientPrefLight;
