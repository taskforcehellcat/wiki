import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import {mdsvex} from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.svx'],
	preprocess: [mdsvex(), preprocess()],
	// preprocess: preprocess(),
	kit: {
		adapter: adapter(),
	}
};

export default config;
