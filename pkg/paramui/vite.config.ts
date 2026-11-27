import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
//import { join } from 'path';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

//import { fileURLToPath } from 'url';
const basePath = process.env.BASE_PATH;

const dev = process.argv.includes('dev') || basePath === undefined;
//const pathToDocsLayout = join(import.meta.dirname, './src/lib/DocsLayout.svelte');

export default defineConfig({
	plugins: [
		mdsvex({
			extensions: ['.svx', '.md'],
			templates: {
				default: '#lib/DocsLayout.svelte'
			}
		}),
		sveltekit({
			extensions: ['.svelte'],
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: [vitePreprocess()],
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),
			//appDir: 'app_',
			paths: {
				base: dev ? '' : `/${basePath}`,
				relative: true /* true and false works for paramui */
			}
		})
	],
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
