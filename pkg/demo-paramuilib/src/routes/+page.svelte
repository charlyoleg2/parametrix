<script lang="ts">
	import { designList } from '$lib/designList';
	import { base } from '$app/paths';
</script>

<h2>List of designs:</h2>
<ol>
	{#each designList as designOne, designIdx}
		<li><a href={`${base}${designOne}`}>{designOne}</a></li>
	{/each}
</ol>

<style lang="scss">
	h2 {
		color: pink;
	}
</style>
