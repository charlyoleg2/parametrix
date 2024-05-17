<div>
	<article>
		<slot />
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
		color: colors.$prezText;
		background-color: colors.$prezArticle;
	}
</style>
