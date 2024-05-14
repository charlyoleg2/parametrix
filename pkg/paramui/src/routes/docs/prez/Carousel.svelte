<div class="carousel-container">
	<slot />
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';

	div.carousel-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
