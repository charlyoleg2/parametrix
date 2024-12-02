<script lang="ts">
	import { OneDesign } from '$lib/index';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<OneDesign pageDef={data.pageDef} pLink={data.allLink} />
