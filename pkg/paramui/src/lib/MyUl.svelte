<script lang="ts">
	export let checkboxId: string;
	export let labelText: string;
</script>

<input type="checkbox" id={checkboxId} class="toggle" checked />
<label for={checkboxId} class="label"
	><div class="arrow" />
	{labelText}</label
>
<slot name="top1" />
<slot name="top2" />
<ul class="nested">
	<slot>dbg492</slot>
</ul>

<style lang="scss">
	@use '$lib/style/colors.scss';

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
