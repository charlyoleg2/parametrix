<script lang="ts">
	//import type { tMParams, tRParams, tSubInst, tSubDesign } from 'geometrix';
	import type { tSubDesign } from 'geometrix';
	//import { PType } from 'geometrix';
	//import { onMount, createEventDispatcher } from 'svelte';
	//import { browser } from '$app/environment';
	//import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let subD: tSubDesign = {};

	let subInsts: string[] = [];
	$: subInsts = Object.keys(subD);

	function downloadConstraints() {
		console.log(`dbg330: downloadConstraints`);
	}
</script>

<section>
	<h2>
		Sub-design
		<span>(Number of sub-instances: {subInsts.length})</span>
	</h2>
	<ol>
		{#each subInsts as subInst}
			<li>
				<input type="checkbox" id="cb_{subInst}" class="toggle" checked={false} />
				<label for="cb_{subInst}" class="label">
					<div class="arrow" />
					{subInst}
				</label>
				<a href="{base}/gear/{subD[subInst].partName}">Go to {subD[subInst].partName}</a>
				<button on:click={downloadConstraints}>Export Constraints</button>
				<div class="nested">
					<article>
						<input type="checkbox" id="cb1_{subInst}" class="toggle" checked={false} />
						<label for="cb1_{subInst}" class="label">
							<div class="arrow" />
							Mandatory
						</label>
						<span>( {Object.keys(subD[subInst].mandatories).length} parameters)</span>
						<div class="nested">
							<table>
								<thead>
									<tr>
										<td>Num</td>
										<td>Name</td>
										<td>Value</td>
									</tr>
								</thead>
								<tbody>
									{#each Object.keys(subD[subInst].mandatories) as param, pIdx}
										<tr>
											<td>{pIdx + 1}</td>
											<td>{param}</td>
											<td>{subD[subInst].mandatories[param]}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</article>
					<article>
						<input type="checkbox" id="cb2_{subInst}" class="toggle" checked={false} />
						<label for="cb2_{subInst}" class="label">
							<div class="arrow" />
							Recommended
						</label>
						<span>( {Object.keys(subD[subInst].recommended).length} parameters)</span>
						<div class="nested">
							<table>
								<thead>
									<tr>
										<td>Num</td>
										<td>Name</td>
										<td>Value</td>
									</tr>
								</thead>
								<tbody>
									{#each Object.keys(subD[subInst].recommended) as param, pIdx}
										<tr>
											<td>{pIdx + 1}</td>
											<td>{param}</td>
											<td>{subD[subInst].recommended[param]}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</article>
					<article>
						<input type="checkbox" id="cb3_{subInst}" class="toggle" checked={false} />
						<label for="cb3_{subInst}" class="label">
							<div class="arrow" />
							Restricted
						</label>
						<span>( {Object.keys(subD[subInst].restricted).length} parameters)</span>
						<div class="nested">
							<table>
								<thead>
									<tr>
										<td>Num</td>
										<td>Name</td>
										<td>Min</td>
										<td>Max</td>
										<td>Step</td>
									</tr>
								</thead>
								<tbody>
									{#each Object.keys(subD[subInst].restricted) as param, pIdx}
										<tr>
											<td>{pIdx + 1}</td>
											<td>{param}</td>
											<td>{subD[subInst].restricted[param].min}</td>
											<td>{subD[subInst].restricted[param].max}</td>
											<td>{subD[subInst].restricted[param].step}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</article>
					<article>
						<input type="checkbox" id="cb4_{subInst}" class="toggle" checked={false} />
						<label for="cb4_{subInst}" class="label">
							<div class="arrow" />
							Summary
						</label>
						<span>( {Object.keys(subD[subInst].restricted).length} parameters)</span>
						<div class="nested">aaa</div>
					</article>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style lang="scss">
	@use '$lib/style/colors.scss';
	@use '$lib/style/styling.scss';

	section {
		margin-left: 0.25rem;
		margin-right: 1rem;
		border-radius: 0.5rem;
		background-color: colors.$subdesign-bg;
	}
	section > h2 {
		@include styling.mix-h2;
		margin-left: 0.25rem;
	}
	section > h2 > span {
		color: colors.$subd-title-complement;
		font-size: 1rem;
		font-weight: 400;
		margin-left: 1rem;
	}
	section > ol > li {
		color: colors.$subd-title;
		font-size: 1rem;
		font-weight: 400;
	}
	section > ol > li > a {
		text-decoration: none;
	}
	section > ol > li > a,
	section > ol > li > button {
		@include styling.mix-button;
	}
	input.toggle {
		display: none;
	}
	div.nested {
		/*
		margin: 0;
		padding: 0;
		padding-left: 2rem;
		*/
		padding-left: 1rem;
		display: none;
	}
	input.toggle:checked ~ div.nested {
		display: block;
	}
	$arrow-size: 0.4rem;
	div.arrow {
		display: inline-block;
		width: 0;
		height: 0;
		border-top: $arrow-size solid transparent;
		border-bottom: $arrow-size solid transparent;
		border-left: (1.8 * $arrow-size) solid colors.$arrow;
		margin-left: 0.5rem;
	}
	input.toggle:checked ~ label > div.arrow {
		border-left: $arrow-size solid transparent;
		border-right: $arrow-size solid transparent;
		border-top: (1.8 * $arrow-size) solid colors.$arrow;
		border-bottom: 0;
	}
	article > label {
		color: colors.$subd-h4;
		font-size: 1rem;
		font-weight: 700;
		margin: 0;
	}
	article > span {
		color: colors.$subd-title-complement;
		font-size: 1rem;
		font-weight: 400;
		margin-left: 0.5rem;
	}
	div > table {
		font-size: 0.8rem;
		font-weight: 400;
		margin-left: 1rem;
	}
	div > table > thead {
		background-color: colors.$table-head;
	}
	div > table > tbody {
		background-color: colors.$table-body;
	}
</style>
