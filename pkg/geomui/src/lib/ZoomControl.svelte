<script lang="ts">
	// props
	interface Props {
		zoomClick: (action: string) => void;
	}
	let { zoomClick }: Props = $props();
</script>

<nav>
	<button aria-labelledby="zoomInit" onclick={() => zoomClick('zoomInit')}
		><div class="zero"></div></button
	><button aria-labelledby="zoomIn" onclick={() => zoomClick('zoomIn')}
		><div class="zoomin"></div></button
	><button aria-labelledby="zoomOut" onclick={() => zoomClick('zoomOut')}
		><div class="zoomout"></div></button
	><button aria-labelledby="moveLeft" onclick={() => zoomClick('moveLeft')}
		><div class="arrowleft"></div></button
	><button aria-labelledby="moveRight" onclick={() => zoomClick('moveRight')}
		><div class="arrowright"></div></button
	><button aria-labelledby="moveUp" onclick={() => zoomClick('moveUp')}
		><div class="arrowup"></div></button
	><button aria-labelledby="moveDown" onclick={() => zoomClick('moveDown')}
		><div class="arrowdown"></div></button
	>
</nav>

<style lang="scss">
	@use './style/colors.scss';

	nav > button {
		height: 2rem;
		width: 2rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$zoom-sign;
		padding: 0;
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
