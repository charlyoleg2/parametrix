<script lang="ts">
	import MyHeader from './MyHeader.svelte';
	import Navigat from '$lib/Navigat.svelte';
	import MyFooter from './MyFooter.svelte';
	import type { Snippet } from 'svelte';

	// props
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<MyHeader />

<!-- Does svelte support named snippet in +layout.svelte? Possible alternative <svelte:component> ?
{@render navig?.() }
-->
<Navigat />
<main>
	{@render children?.()}
</main>

<MyFooter />

<style lang="scss">
	@use '$lib/style/colors.scss';

	:global(body) {
		font-family: 'Courier New', 'Helvetica', 'Arial', 'Verdana';
		margin: 0;
		background-color: colors.$main-bg;
	}
	main {
		//background-color: colors.$main-bg;
		min-height: 70vh;
	}
</style>
