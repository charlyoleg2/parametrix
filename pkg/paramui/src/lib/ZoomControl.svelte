<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function theClick(actionName: string) {
		dispatch('myevent', {
			action: actionName
		});
	}
</script>

<nav>
	<button on:click={() => theClick('zoomInit')}><div class="zero" /></button>
	<button on:click={() => theClick('zoomIn')}><div class="zoomin" /></button>
	<button on:click={() => theClick('zoomOut')}><div class="zoomout" /></button>
	<button on:click={() => theClick('moveLeft')}><div class="arrowleft" /></button>
	<button on:click={() => theClick('moveRight')}><div class="arrowright" /></button>
	<button on:click={() => theClick('moveUp')}><div class="arrowup" /></button>
	<button on:click={() => theClick('moveDown')}><div class="arrowdown" /></button>
</nav>

<style lang="scss">
	@use '$lib/style/colors.scss';

	nav > button {
		height: 2rem;
		width: 2rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$zoom-sign;
		margin: 0.1rem;
		background-color: colors.$zoom-bg;
	}
	$zero-size: 0.8rem;
	nav > button > div.zero {
		height: $zero-size;
		width: $zero-size;
		border-style: solid;
		border-width: 0.3rem;
		border-radius: 1rem;
		border-color: colors.$zoom-sign;
		margin: auto;
		background-color: transparent;
	}
	nav > button > div.zoomin {
		height: $zero-size;
		width: $zero-size;
		border-style: solid;
		border-width: 0.3rem;
		border-radius: 0;
		border-color: colors.$zoom-other;
		margin: auto;
		background-color: colors.$zoom-sign;
	}
	nav > button > div.zoomout {
		height: $zero-size;
		width: $zero-size;
		border-style: solid;
		border-width: 0.3rem;
		border-radius: 0;
		border-color: colors.$zoom-sign;
		margin: auto;
		background-color: colors.$zoom-other;
	}
	$arrow-size: 0.7rem;
	nav > button > div.arrowleft {
		width: 0;
		height: 0;
		border-top: $arrow-size solid transparent;
		border-bottom: $arrow-size solid transparent;
		border-right: (1.8 * $arrow-size) solid colors.$zoom-sign;
		margin: auto;
	}
	nav > button > div.arrowright {
		width: 0;
		height: 0;
		border-top: $arrow-size solid transparent;
		border-bottom: $arrow-size solid transparent;
		border-left: (1.8 * $arrow-size) solid colors.$zoom-sign;
		margin: auto;
	}
	nav > button > div.arrowup {
		width: 0;
		height: 0;
		border-left: $arrow-size solid transparent;
		border-right: $arrow-size solid transparent;
		border-bottom: (1.8 * $arrow-size) solid colors.$zoom-sign;
		margin: auto;
	}
	nav > button > div.arrowdown {
		width: 0;
		height: 0;
		border-left: $arrow-size solid transparent;
		border-right: $arrow-size solid transparent;
		border-top: (1.8 * $arrow-size) solid colors.$zoom-sign;
		margin: auto;
	}
</style>
