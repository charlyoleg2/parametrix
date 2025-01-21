<script lang="ts">
	//import type { HTMLAttributes } from 'svelte/elements';
	//type $$Props = HTMLAttributes<HTMLElement>;

	import { checkPath, listOneCategory } from './makeMenu';
	import Navig from './Navig.svelte';

	import { page } from '$app/state';
	import { base } from '$app/paths';
	let pagePath: string = $derived(checkPath(page.url.pathname.replace(base, '')));
</script>

<Navig menuList={listOneCategory(pagePath)} menuSelected={pagePath} />
