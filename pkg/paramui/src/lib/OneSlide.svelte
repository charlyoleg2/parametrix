<script lang="ts">
	import type { Snippet } from 'svelte';

	// props
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div>
	<article>
		{@render children?.()}
	</article>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 18rem;
		width: 30rem;
		margin: 2rem;
		font-size: 0.8rem;
		color: colors.$prezText;
		background-color: colors.$prezArticle;
	}
</style>
