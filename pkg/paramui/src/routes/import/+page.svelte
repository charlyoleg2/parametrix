<script lang="ts">
	import { loadDesignFile1, runDesignFile1, delay } from './runImpScript';

	let loadMsg = '';

	async function loadDesignFile(eve: Event) {
		loadMsg += await loadDesignFile1(eve);
		await delay(1); // waiting in ms
		loadMsg += await runDesignFile1();
	}
</script>

<h1>Import a geometrix-design</h1>
<article>
	<h3>Upload a javascript-geometrix-design-library-file</h3>
	<label for="loadDLib" class="fileUpload">Load design-file</label>
	<input type="file" id="loadDLib" accept="text/javascript" on:change={loadDesignFile} />
	<textarea rows="10" cols="80" readonly wrap="off" value={loadMsg} />
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
	}
	article > label.fileUpload {
		display: inline-block;
		height: 1.2rem;
		/*width: 1.6rem;*/
		color: blue;
		font-size: 0.8rem;
		font-weight: 400;
		padding: 0.1rem 0.4rem 0.1rem;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: yellow;
		margin: 0.5rem;
		background-color: green;
	}
	article > input[type='file'] {
		display: none;
	}
	article > textarea {
		display: block;
	}
</style>
