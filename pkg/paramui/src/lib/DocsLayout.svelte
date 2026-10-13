<script lang="ts">
	import type { Snippet } from 'svelte';

	// props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<article>
	{@render children()}
</article>

<style lang="scss">
	/*@use './/style/colors.scss';*/
	article {
		margin: 1rem;
	}
</style>
