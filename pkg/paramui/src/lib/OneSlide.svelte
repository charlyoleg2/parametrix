<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
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
