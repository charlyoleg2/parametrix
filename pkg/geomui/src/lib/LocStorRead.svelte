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

	// default storeName
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
	$effect(() => {
		storeName = defaultName(localKeys);
	});
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
	@use './style/colors.scss';

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
