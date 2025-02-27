<script lang="ts">
	import { designNameList } from '$lib/makeList';
	import { base } from '$app/paths';
</script>

<h2>List of designs:</h2>
<ol>
	{#each designNameList as designOne (designOne)}
		<li><a href={`${base}/${designOne}`}>{designOne}</a></li>
	{/each}
</ol>

<style lang="scss">
	h2 {
		color: pink;
		margin: 1rem;
	}
</style>
