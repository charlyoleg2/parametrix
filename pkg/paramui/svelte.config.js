import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
//import { join } from 'path';
import { fileURLToPath } from 'url';

const dev = process.argv.includes('dev');
//const pathToDocsLayout = join(import.meta.dirname, './src/lib/DocsLayout.svelte'); // works with node V20.11.0 and higher
const pathToDocsLayoutURL = new URL('./src/lib/DocsLayout.svelte', import.meta.url);
const pathToDocsLayout = fileURLToPath(pathToDocsLayoutURL);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			layout: pathToDocsLayout
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		//appDir: 'app_',
		paths: {
			base: dev ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
