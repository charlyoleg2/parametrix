<script lang="ts">
	import { asset } from '$app/paths';
</script>

<img src={asset('/favicon.svg')} alt="Parametrix's logo" />
<img src={asset('/favicon.svg')} alt="Parametrix's logo" />
<img src={asset('/favicon.svg')} alt="Parametrix's logo" />

<style lang="scss">
	img {
		width: 1rem;
		height: 1rem;
		margin: 0.1rem;
		margin-top: 0.8rem;
		transition: transform 0.5s;
	}
	img:hover {
		transform: rotate(180deg);
	}
</style>
