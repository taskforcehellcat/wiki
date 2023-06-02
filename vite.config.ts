import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

const config = {
  plugins: [sveltekit(), dynamicImport()]
};

export default config;
