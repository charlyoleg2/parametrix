<script lang="ts">
	import type { tMenuFull } from '$lib/menuList';
	//import type { HTMLAttributes } from 'svelte/elements';
	//interface $$Props extends HTMLAttributes<HTMLElement> {
	//	menuList: tMenu;
	//}

	import { base } from '$app/paths';

	export let menuList: tMenuFull;
	export let menuSelected: string;
</script>

<nav>
	{#each menuList.menu as menuItem}
		<div class="oneMenu">
			<a href="{base}{menuItem.path}" class:page-active={menuSelected === menuItem.path}
				>{menuItem.label}</a
			>
			<div class="arrow" class:arrow-active={menuSelected === menuItem.path} />
		</div>
	{/each}
	{#if menuList.category}
		<span>[{menuList.category}]</span>
	{/if}
</nav>

<style lang="scss">
	@use '$lib/style/colors.scss';

	nav {
		background-color: colors.$header-bg;
		padding: 0.3rem;
		//padding-top: 0.8rem;
		padding-bottom: 0.1rem;
		//display: flex;
		//flex-wrap: wrap;
		//justify-content: flex-start;
	}
	nav > div.oneMenu {
		display: inline-block;
	}
	nav > div > a {
		display: inline-block;
		color: colors.$menu;
		background-color: colors.$menu-back;
		text-decoration: none;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		border-style: solid;
		border-width: 0.2rem;
		border-radius: 0.6rem;
		border-color: colors.$menu-border;
		margin-top: 0.1rem;
		margin-left: 0.1rem;
	}
	nav > div > a.page-active {
		color: colors.$menu-active;
	}
	nav > div > a:hover {
		color: colors.$menu-hover;
	}
	$arrow-size: 0.5rem;
	nav > div > div.arrow {
		display: none;
		width: 0;
		height: 0;
		border-left: $arrow-size solid transparent;
		border-right: $arrow-size solid transparent;
		border-bottom: (1.2 * $arrow-size) solid colors.$menu-arrow;
		margin-left: auto;
		margin-right: auto;
		//margin-top: -0.3rem;
		margin-bottom: -0.3rem;
		position: relative;
		z-index: 0;
		bottom: 0.2rem;
		//left: 1rem;
	}
	nav > div > div.arrow-active {
		display: block;
	}
	nav > span {
		color: colors.$menu-category;
	}
</style>
