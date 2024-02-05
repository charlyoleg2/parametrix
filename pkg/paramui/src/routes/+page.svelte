<script lang="ts">
	import { apidocPath } from '$lib/menuList';
	import { menuList2 } from '$lib/makeMenu';
	import { base } from '$app/paths';
</script>

<h1>Parametrix index</h1>
<article>
	{#each menuList2 as menuCategory, listIdx}
		<div class="separation" />
		{#if menuCategory.category !== ''}
			<h2>{listIdx} - {menuCategory.category}</h2>
		{/if}
		<ul>
			{#each menuCategory.pages as menuItem, itemIdx}
				<li>
					<img
						class:alter={(listIdx + itemIdx) % 2 === 1}
						src="{base}/puisvg/{menuItem.svg}"
						alt={menuItem.label}
					/>
					{#if menuCategory.category !== ''}
						{#if menuItem.path === apidocPath}
							<a href="{base}{menuItem.path}" rel="external"
								>{listIdx}.{itemIdx + 1} - API docs</a
							>
						{:else}
							<a href="{base}{menuItem.path}"
								>{listIdx}.{itemIdx + 1} - {menuItem.label}</a
							>
						{/if}
					{:else}
						<a href="{base}{menuItem.path}" class="noindex">{menuItem.label}</a>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="separation sepaStop" />
	{/each}
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 0rem;
		column-width: 30rem;
		column-gap: 2rem;
	}
	article > div.separation {
		width: 28rem;
		height: 0.5rem;
		border-radius: 0.3rem;
		margin: 1rem;
		margin-top: 0.1rem;
		background-color: colors.$indexSepara;
	}
	article > div.separation.sepaStop {
		background-color: colors.$indexSeparaStop;
		margin-top: 1rem;
		margin-bottom: 0.1rem;
	}
	article > ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		/*
		max-width: 15rem;
		background-color: colors.$indexBg;
		*/
	}
	article > ul > li > img {
		margin: -1rem;
		margin-left: 1rem;
		margin-right: 3rem;
		width: 1.5rem;
		height: 1.5rem;
		position: relative;
		bottom: 0.5rem;
	}
	article > ul > li > img.alter {
		margin-left: 3.5rem;
		margin-right: 0.5rem;
	}
	article > ul > li > a {
		text-decoration: none;
		margin-left: 0.1rem;
	}
	article > ul > li > a.noindex {
		margin-left: 3rem;
	}
</style>
