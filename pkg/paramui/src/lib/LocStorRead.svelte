<script lang="ts">
	import LocStorTable from '$lib/LocStorTable.svelte';
	//import { browser } from '$app/environment';

	export let pageName: string;
	export let storeName: string;

	let localKeys: string[] = [];
	// create a default key name
	function defaultName(ilocalKeys: string[]) {
		let rname = storeName;
		const nameUpdate = !ilocalKeys.includes(rname);
		if (nameUpdate) {
			if (ilocalKeys.length > 0) {
				rname = ilocalKeys[0];
			} else {
				rname = '';
			}
		}
		return rname;
	}
	$: storeName = defaultName(localKeys);
	//$: console.log(`dbg994: ${storeName}`);
</script>

<LocStorTable {pageName} bind:storeName bind:localKeys />
<div>
	<label for="storName">Select a parameter-set:</label>
	<input
		type="text"
		id="storName"
		value={storeName}
		readonly
		minlength="4"
		maxlength="30"
		size="32"
	/>
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
	div > input {
		font-size: 1rem;
		font-weight: 400;
		margin: 0.2rem;
	}
</style>
