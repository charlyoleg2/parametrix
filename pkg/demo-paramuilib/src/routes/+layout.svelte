<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Welcome to demo-paramuilib</h1>
<h6>
	Demonstrating the usage of the <a href="https://svelte.dev/">svelte</a> library
	<strong>paramuilib</strong>
</h6>
<nav>
	<a href={base}>[index] list of designs</a>
</nav>
<main>
	<slot />
</main>
<footer>
	demo-paramuilib, a minimalist showcase of paramuilib.
</footer>

<style lang="scss">
	:global(body) {
		font-family: 'Lucida Console', 'Monaco', 'Verdana';
		margin: 0;
		background-color: dark-blue;
	}
	main {
		background-color: light-blue;
		min-height: 70vh;
	}
</style>
