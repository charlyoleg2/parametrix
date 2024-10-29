<script lang="ts">
	import { OneDesign } from '$lib/index';
	let { data } = $props();
</script>

<OneDesign pageDef={data.pageDef} pLink={data.allLink} />
