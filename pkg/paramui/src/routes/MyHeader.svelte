<script lang="ts">
	import { base } from '$app/paths';
</script>

<header>
	<section>
		<img class="img1" src="{base}/favicon.svg" alt="Parametrix's logo" />
		<h1>Parametrix</h1>
		<img class="img2 img-suite" src="{base}/favicon.svg" alt="Parametrix's logo" />
		<img class="img3 img-suite" src="{base}/favicon.svg" alt="Parametrix's logo" />
		<img class="img4 img-suite" src="{base}/favicon.svg" alt="Parametrix's logo" />
		<img class="img5 img-suite" src="{base}/favicon.svg" alt="Parametrix's logo" />
	</section>
	<article>
		Technical drawing --- Dessin industriel --- 2D parametric designs --- Software defined
		modelling
	</article>
</header>

<style lang="scss">
	@use '$lib/style/colors.scss';

	header {
		background-color: colors.$header-bg;
	}
	header > section {
		display: flex;
		align-items: center;
		padding-left: 1rem;
	}
	header > section > h1 {
		color: colors.$header-title;
		font-size: 3rem;
		margin: 0;
		margin-right: 0.5rem;
	}
	header > section > img {
		margin: 0.1rem;
		transition: transform 0.5s;
	}
	header > section > img.img-suite {
		margin-left: 0.4rem;
		margin-right: 0.4rem;
	}
	header > section > img.img1 {
		width: 3rem;
		height: 3rem;
	}
	header > section > img.img1:hover {
		transform: scale(1.3);
	}
	header > section > img.img2 {
		width: 2rem;
		height: 2rem;
	}
	header > section > img.img2:hover {
		transform: scale(1.3) rotate(45deg);
	}
	header > section > img.img3 {
		width: 1.6rem;
		height: 1.6rem;
	}
	header > section > img.img3:hover {
		transform: scaleX(1.5);
	}
	header > section > img.img4 {
		width: 2.5rem;
		height: 2.5rem;
	}
	header > section > img.img4:hover {
		transform: scaleY(1.5);
	}
	header > section > img.img5 {
		width: 1.5rem;
		height: 1.5rem;
	}
	header > section > img.img5:hover {
		transform: scale(1.3) rotate(-45deg);
	}
	header > article {
		color: colors.$header-subtitle;
		font-size: 1rem;
		padding-left: 1rem;
	}
</style>
