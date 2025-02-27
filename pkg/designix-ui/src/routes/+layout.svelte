<script lang="ts">
	import type { Snippet } from 'svelte';
	import { base } from '$app/paths';
	import { version_details } from 'geometrix';
	import appPackage from '../../package.json';

	// props
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();

	const detailed_versions = version_details(appPackage);
</script>

<h1>Welcome to designix-ui</h1>
<h6>
	Showcasing the usage of the <a href="https://svelte.dev/">svelte</a> library
	<a href="https://www.npmjs.com/package/geomui">geomui</a>.
</h6>
<nav>
	<a href={`${base}/`}>index: list of designs</a>
</nav>
<main>
	{@render children?.()}
</main>
<footer>
	<article>
		<a href="https://github.com/charlyoleg2/parametrix">designix-ui</a>, a minimalist showcase
		of
		<a href="https://www.npmjs.com/package/geomui">geomui</a>.
	</article>
	<article>
		<h3>Designix-ui version</h3>
		<code>
			{#each detailed_versions as dversion (dversion)}
				{dversion}<br />
			{/each}
		</code>
	</article>
	<article>
		<h3>Parametrix</h3>
		<ol>
			<li><a href="https://github.com/charlyoleg2/parametrix">Parametrix repo</a></li>
			<li><a href="https://charlyoleg2.github.io/parametrix/">Parametrix page</a></li>
			<li><a href="https://catalos-catalui.vercel.app/">Catalos</a></li>
		</ol>
	</article>
</footer>

<style lang="scss">
	:global(body) {
		font-family: 'Courier New', 'Helvetica', 'Arial', 'Verdana';
		margin: 0;
		background-color: DarkCyan;
	}
	h1 {
		color: aquamarine;
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	h6 {
		margin: 1rem;
		margin-top: 0.2rem;
	}
	nav {
		margin: 1rem;
	}
	nav > a {
		display: inline-block;
		color: black;
		background-color: GhostWhite;
		text-decoration: none;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		border-style: solid;
		border-width: 0.2rem;
		border-radius: 0.6rem;
		border-color: Brown;
		margin-top: 0.1rem;
		margin-left: 0.1rem;
	}
	nav > a:hover {
		background-color: yellow;
	}
	main {
		background-color: GhostWhite;
		min-height: 70vh;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}
	footer {
		margin: 1rem;
		margin-top: 5rem;
		margin-bottom: 5rem;
	}
</style>
