<script lang="ts">
	//import type { HTMLAttributes } from 'svelte/elements';
	//type $$Props = HTMLAttributes<HTMLElement>;

	import { checkEmptyPath, findMenuMenu } from './menuList';
	import Navig from './Navig.svelte';

	import { page } from '$app/stores';
	import { base } from '$app/paths';
	let pagePath: string;
	$: pagePath = checkEmptyPath($page.url.pathname.replace(base, ''));
</script>

<Navig menuList={findMenuMenu(pagePath)} menuSelected={pagePath} />
