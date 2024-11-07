<script lang="ts">
	import LocStorTable from './LocStorTable.svelte';

	// props
	interface Props {
		pageName: string;
		storeName: string;
	}
	let { pageName, storeName = $bindable() }: Props = $props();

	// state
	let localKeys: string[] = $state([]);

	// create a default key name
	function defaultName(prefix: string) {
		const re1 = /[-:]/g;
		const re2 = /\..*$/;
		const datestr = new Date()
			.toISOString()
			.replace(re1, '')
			.replace(re2, '')
			.replace('T', '_');
		const rname = `${prefix}_${datestr}`;
		return rname;
	}
	storeName = defaultName(pageName);
	// check if the key already exist
	let warn: boolean = $derived(localKeys.includes(storeName));
</script>

<LocStorTable {pageName} bind:storeName bind:localKeys />
<div>
	<label for="storName">Give a name to your parameter-set:</label>
	<input
		type="text"
		id="storName"
		bind:value={storeName}
		required
		minlength="4"
		maxlength="30"
		size="32"
	/>
	{#if warn}
		<p class="warnMsg">Warning: name {storeName} already used</p>
	{/if}
</div>

<style lang="scss">
	@use './style/colors.scss';

	div {
		min-height: 6rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	div > label,
	div > input,
	div > p.warnMsg {
		font-size: 1rem;
		font-weight: 400;
		margin: 0.2rem;
		color: colors.$warning-message;
	}
</style>
