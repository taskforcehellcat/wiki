import dynamicImport from 'vite-plugin-dynamic-import';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), dynamicImport()]
});
