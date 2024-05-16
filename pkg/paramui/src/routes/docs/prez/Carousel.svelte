<script lang="ts">
	//import OneSlide from './OneSlide.svelte';
	import { onMount } from 'svelte';

	let carousContent: HTMLElement;
	let slideNb = 0;
	let slideIdx = 0;
	let prezActive = false;

	function equipSlides(elems: HTMLCollection) {
		slideNb = elems.length;
		//console.log(`dbg449: slideNb: ${slideNb}`);
		for (let idx = 0; idx < slideNb; idx++) {
			const oneElem = elems.item(idx);
			if (oneElem === null) {
				console.log(`dbg892: ${idx} : this is a null element`);
			} else if (oneElem.nodeName === 'ARTICLE') {
				//console.log(`dbg745: ${idx} : this is a ARTICLE`);
				oneElem.addEventListener('click', function () {
					slideIdx = idx;
					prezActive = true;
				});
			} else {
				console.log(`dbg893: ${idx} : this is something else`);
			}
		}
	}

	onMount(() => {
		const elems = carousContent?.children;
		if (elems !== undefined) {
			equipSlides(elems);
		} else {
			console.log('dbg298: elems is undefined!');
		}
	});

	function stopPrez() {
		prezActive = false;
	}
	function goPrev() {
		slideIdx = Math.max(0, slideIdx - 1);
	}
	function goNext() {
		slideIdx = Math.min(slideNb - 1, slideIdx + 1);
	}
</script>

{#if prezActive}
	<aside class="backdrop">
		<article>{slideIdx}</article>
		<button on:click={goPrev}>&#60;&#60;&#60;</button><button class="mid" on:click={stopPrez}
			>Stop</button
		><button on:click={goNext}>&#62;&#62;&#62;</button>
	</aside>
{/if}

<div class="carousel-container" bind:this={carousContent}>
	<slot />
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';

	div.carousel-container {
		display: flex;
		flex-wrap: wrap;
	}
	aside.backdrop {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		background-color: rgba(0, 0, 0, 0.4);
	}
	aside > article {
		display: block;
		width: 100%;
		height: 90%;
		margin: 0;
		border: none;
		padding: 0;
		color: colors.$prezText;
		background-color: colors.$prezArticle;
	}
	aside > button {
		width: 30%;
		height: 10%;
		margin: 0;
		border: none;
		padding: 0;
		font-size: 3rem;
		font-weight: bold;
		color: colors.$prezArticle;
		background-color: colors.$prezArticle;
	}
	aside > button:hover {
		color: colors.$prezControl;
	}
	aside > button.mid {
		width: 40%;
	}
</style>
