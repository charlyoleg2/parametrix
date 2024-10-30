<script lang="ts">
	interface Props {
		checkboxId: string;
		labelText: string;
		top1?: import('svelte').Snippet;
		top2?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let {
		checkboxId,
		labelText,
		top1,
		top2,
		children
	}: Props = $props();
</script>

<input type="checkbox" id={checkboxId} class="toggle" checked />
<label for={checkboxId} class="label"
	><div class="arrow"></div>
	{labelText}</label
>
{@render top1?.()}
{@render top2?.()}
<ul class="nested">
	{#if children}{@render children()}{:else}dbg492{/if}
</ul>

<style lang="scss">
	@use './style/colors.scss';

	input.toggle {
		display: none;
	}
	ul.nested {
		list-style-type: none;
		margin: 0;
		padding: 0;
		padding-left: 2rem;
		display: none;
	}
	input.toggle:checked ~ ul.nested {
		display: block;
	}
	$arrow-size: 0.4rem;
	div.arrow {
		display: inline-block;
		width: 0;
		height: 0;
		border-top: $arrow-size solid transparent;
		border-bottom: $arrow-size solid transparent;
		border-left: (1.8 * $arrow-size) solid colors.$arrow;
		margin-left: 0.5rem;
	}
	input.toggle:checked ~ label > div.arrow {
		border-left: $arrow-size solid transparent;
		border-right: $arrow-size solid transparent;
		border-top: (1.8 * $arrow-size) solid colors.$arrow;
		border-bottom: 0;
	}
</style>
