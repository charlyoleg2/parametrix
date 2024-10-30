<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<article>
	{#if children}{@render children()}{:else}
		<!-- the mdsvex content will be slotted in here -->
	{/if}
</article>

<style lang="scss">
	/*@use '$lib/style/colors.scss';*/
	article {
		margin: 1rem;
	}
</style>
