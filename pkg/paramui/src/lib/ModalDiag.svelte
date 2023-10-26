<script lang="ts" context="module">
	type tOkFunc = () => void;
	export type { tOkFunc };
</script>

<script lang="ts">
	export let okName = 'Ok';
	export let okFunc: tOkFunc;
	export let modalOpen: boolean;

	function mCancel() {
		modalOpen = false;
	}
	function mOk() {
		okFunc();
		modalOpen = false;
	}
</script>

{#if modalOpen}
	<aside class="backdrop">
		<div class="dialog">
			<article class="question">
				<slot />
			</article>
			<footer>
				<button class="cancel" on:click={mCancel}>Cancel</button>
				<button class="ok" on:click={mOk}>{okName}</button>
			</footer>
		</div>
	</aside>
{/if}

<style lang="scss">
	@use '$lib/style/colors.scss';

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
		width: 40rem;
		height: 20rem;
		max-width: 80vw;
		max-height: 80vh;
		background-color: colors.$modal;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
	}
	aside > div > article.question {
		font-size: 1.2rem;
		height: 80%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	aside > div > footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	aside > div > footer > button {
		/*display: inline-block;*/
		/*height: 1.6rem;*/
		/*width: 1.6rem;*/
		color: colors.$timectrl-sign;
		font-size: 1.2rem;
		font-weight: 400;
		padding: 0.6rem 2.2rem 0.6rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$timectrl-sign;
		margin: 0.5rem;
		margin-left: 3rem;
		margin-right: 3rem;
		background-color: colors.$timectrl-bg;
	}
</style>
