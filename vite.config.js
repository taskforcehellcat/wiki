import { sveltekit } from '@sveltejs/kit/vite';
import dynamicImport from 'vite-plugin-dynamic-import';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit({
      inspector: true
    }),
    dynamicImport()
  ]
};

export default config;
