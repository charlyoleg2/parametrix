<script lang="ts">
	import { sDraw } from './stateDrawing.svelte';
</script>

<div>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.main} />main part</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.mainB} />main skeleton</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.second} />second parts</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.secondB} />second skeletons</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.dynamics} />dynamics</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.ruler} />ruler</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.refframe} />frame of reference</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.points} />points</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.lines} />lines</label>
	<label><input type="checkbox" bind:checked={sDraw.dLayers.vectors} />vectors</label>
</div>

<style lang="scss">
	@use './style/colors.scss';

	div > label > input {
		margin-left: 1rem;
	}
</style>
