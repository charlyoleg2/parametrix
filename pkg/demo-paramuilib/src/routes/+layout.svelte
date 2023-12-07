<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Welcome to demo-paramuilib</h1>
<h6>
	Showcasing the usage of the <a href="https://svelte.dev/">svelte</a> library
	<a href="https://www.npmjs.com/">paramuilib</a>.
</h6>
<nav>
	<a href={`${base}/`}>[index] list of designs</a>
</nav>
<main>
	<slot />
</main>
<footer>
	<a href="https://github.com/charlyoleg2/parametrix">demo-paramuilib</a>, a minimalist showcase
	of
	<a href="https://www.npmjs.com/">paramuilib</a>.
</footer>

<style lang="scss">
	:global(body) {
		font-family: 'Lucida Console', 'Monaco', 'Verdana';
		margin: 0;
		background-color: DarkCyan;
	}
	h1 {
		margin: 1rem;
	}
	h6 {
		margin: 1rem;
	}
	nav {
		margin: 1rem;
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
