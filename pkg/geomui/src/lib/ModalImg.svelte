<script lang="ts">
	interface Props {
		svgPath: string;
		modalOpen: boolean;
	}
	let { svgPath, modalOpen = $bindable() }: Props = $props();

	function mCancel() {
		modalOpen = false;
	}
</script>

{#if modalOpen}
	<aside class="backdrop">
		<div class="dialog">
			<button onclick={mCancel}>
				<img src={svgPath} alt={svgPath} />
			</button>
		</div>
	</aside>
{/if}

<style lang="scss">
	@use './style/colors.scss';

	aside.backdrop {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
	}
	aside > div.dialog {
		max-width: 80vw;
		max-height: 80vh;
		background-color: colors.$modal;
	}
	aside > div > button {
		width: 100%;
		height: 100%;
		margin: 0;
		border: none;
		padding: 0;
		background-color: colors.$mini-picture;
	}
	/*
	aside > div > button > img {
		max-width: 200px;
		max-height: 200px;
	}
	*/
</style>
