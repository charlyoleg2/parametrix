<script lang="ts">
	import LocStorTable from '$lib/LocStorTable.svelte';
	//import { browser } from '$app/environment';

	export let pageName: string;
	export let storeName: string;

	let localKeys: string[] = [];
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
	let warn = false;
	function checkWarning(iname: string) {
		warn = localKeys.includes(iname);
		//console.log(`dbg040: ${warn}`);
	}
	function validInput(eve: Event) {
		const storeName2 = (eve.target as HTMLInputElement).value;
		//const storeName2 = storeName;
		//console.log(`dbg162: ${storeName2}`);
		//warn = localKeys.includes(storeName2);
		checkWarning(storeName2);
	}
	// modify input
	$: checkWarning(storeName);
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
		on:input={validInput}
	/>
	{#if warn}
		<p class="warnMsg">Warning: name {storeName} already used</p>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';

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
