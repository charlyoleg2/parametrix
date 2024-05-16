<script lang="ts">
	//import OneSlide from './OneSlide.svelte';
	import { onMount } from 'svelte';

	let carousContent: HTMLElement;
	let slideNb = 0;
	let slideIdx = 0;
	let prezActive = false;

	function getSlides(): HTMLCollection {
		const elems = carousContent?.children;
		if (elems === undefined) {
			throw 'err309: error by getting the carousContent children';
		} else {
			return elems;
		}
	}
	function getOneSlide(elems: HTMLCollection, idx: number): HTMLElement {
		const oneElem = elems.item(idx);
		if (oneElem === null) {
			throw `dbg892: ${idx} : this is a null element`;
		} else if (oneElem.nodeName === 'ARTICLE') {
			//console.log(`dbg745: ${idx} : this is a ARTICLE`);
			return oneElem;
		} else {
			console.log(`dbg893: ${idx} : this is something else`);
		}
	}
	function getPrezArticle(): HTMLElement {
		const elem = document.getElementById("prezId");
		if (elem === null) {
			throw 'dbg192: elem with preyId is a null element';
		} else {
			return elem;
		}
	}

	function equipSlides(elems: HTMLCollection) {
		slideNb = elems.length;
		//console.log(`dbg449: slideNb: ${slideNb}`);
		try {
			for (let idx = 0; idx < slideNb; idx++) {
				const oneElem = getOneSlide(elems, idx);
				oneElem.addEventListener('click', function () {
					slideIdx = idx;
					prezActive = true;
				});
			}
		} catch(err) {
			console.log(err);
		}
	}

	onMount(() => {
		try {
			const elems = getSlides();
			equipSlides(elems);
		} catch(err) {
			console.log(err);
		}
	});

	function cloneSlide(idx: number) {
		const elems = getSlides();
		const oneElem = getOneSlide(elems, idx);
		return oneElem.cloneNode(true);
	}
	function updateSlide(idx: number) {
		try {
			const elem = getPrezArticle();
			const newSlide = cloneSlide(idx);
			// remove all content of elem
			elem.textContent = '';
			while (elem.firstChild) {
				elem.removeChild(elem.firstChild);
			}
			// add new content
			elem.appendChild(newSlide);
			// remove style-class
			elem.firstChild.className = '';
		} catch(err) {
			console.log(err);
		}
	}
	function stopPrez() {
		prezActive = false;
	}
	function goPrev() {
		slideIdx = Math.max(0, slideIdx - 1);
		updateSlide(slideIdx);
	}
	function goNext() {
		slideIdx = Math.min(slideNb - 1, slideIdx + 1);
		updateSlide(slideIdx);
	}
</script>

{#if prezActive}
	<aside class="backdrop">
		<article id="prezId">{slideIdx}</article>
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
