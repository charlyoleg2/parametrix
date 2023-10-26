<script lang="ts">
	import MyHeader from './MyHeader.svelte';
	import Navigat from '$lib/Navigat.svelte';
	import MyFooter from './MyFooter.svelte';
</script>

<MyHeader />

<!-- named slot is not yet supported in +layout.svelte! Possible alternative <svelte:component>
<slot name="navig" />
-->
<Navigat />
<main>
	<slot />
</main>

<MyFooter />

<style lang="scss">
	@use '$lib/style/colors.scss';

	:global(body) {
		font-family: 'Lucida Console', 'Monaco', 'Verdana';
		margin: 0;
		background-color: colors.$main-bg;
	}
	main {
		//background-color: colors.$main-bg;
		min-height: 70vh;
	}
</style>
