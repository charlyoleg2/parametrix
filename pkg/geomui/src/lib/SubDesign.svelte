<script lang="ts">
	import type { tPosiOrien, tSubDesign, tAllLink } from 'geometrix';
	import { ffix, radToDeg, paramListToVal } from 'geometrix';
	//import { downloadParams, generateUrl } from './downloadParams';
	import { downloadParams } from './downloadParams';
	import { updateStore } from './initStore';
	//import { page } from '$app/state';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// props
	interface Props {
		subD: tSubDesign;
		origPartName: string;
		pLink: tAllLink;
	}
	let { subD, origPartName, pLink }: Props = $props();

	// derived
	const dSubInstList: string[] = $derived(Object.keys(subD));

	// actions
	async function goToUrl(subInstName: string) {
		const subObj = subD[subInstName];
		// modify the global store sParams
		updateStore(subObj.partName, paramListToVal(subObj.dparam), true);
		//const rUrl = generateUrl(`${page.url.origin}${base}/${subObj.link}`, paramListToVal(subObj.dparam), true);
		//const rUrl = generateUrl(`${page.url.origin}${base}/${subObj.link}`, {}, true);
		const rUrl = `${base}${pLink[subObj.partName]}`;
		//const rUrl = pLink[subObj.partName];
		//console.log(`dbg505: ${rUrl}`);
		//window.location.assign(rUrl);
		//goto(rUrl, { invalidateAll: true });
		goto(rUrl);
	}
	function dwnParams2(subInstName: string) {
		const iPartName = subD[subInstName].partName;
		const idparams = subD[subInstName].dparam;
		const aComment = `sub-design parameters of ${iPartName} from ${origPartName}`;
		downloadParams(iPartName, paramListToVal(idparams), aComment);
	}
	function printOrientation(vec: tPosiOrien): string {
		let rStr = '[ ';
		rStr += `${ffix(radToDeg(vec[0]))}, `;
		rStr += `${ffix(radToDeg(vec[1]))}, `;
		rStr += `${ffix(radToDeg(vec[2]))} ]`;
		return rStr;
	}
	function printPosition(vec: tPosiOrien): string {
		let rStr = '[ ';
		rStr += `${ffix(vec[0])}, `;
		rStr += `${ffix(vec[1])}, `;
		rStr += `${ffix(vec[2])} ]`;
		return rStr;
	}
	function printSet(changed: boolean): string {
		const rStr = changed ? 'Yes' : '';
		return rStr;
	}
</script>

<section>
	<h2>
		Sub-designs
		<span>(Number of sub-instances: {dSubInstList.length})</span>
	</h2>
	<ol>
		{#each dSubInstList as subInst (subInst)}
			<li>
				<input type="checkbox" id="cb_{subInst}" class="toggle" checked={false} />
				<label for="cb_{subInst}" class="label">
					<div class="arrow"></div>
					{subInst}
				</label>
				<button onclick={() => goToUrl(subInst)}
					>Go to {pLink[subD[subInst].partName]}</button
				>
				<button onclick={() => dwnParams2(subInst)}>Export parameters</button>
				<div class="nested">
					<article>
						{Object.keys(subD[subInst].dparam).length} parameters of
						<strong>{subD[subInst].partName}</strong>
						with orientation {printOrientation(subD[subInst].orientation)} (degree) at position
						{printPosition(subD[subInst].position)} (mm)
					</article>
					<table>
						<thead>
							<tr>
								<td>Num</td>
								<td>Name</td>
								<td>Value</td>
								<td>Init</td>
								<td>Set?</td>
							</tr>
						</thead>
						<tbody>
							{#each Object.keys(subD[subInst].dparam) as param, pIdx (param)}
								<tr class:changed={subD[subInst].dparam[param].chg}>
									<td>{pIdx + 1}</td>
									<td>{param}</td>
									<td>{subD[subInst].dparam[param].val}</td>
									<td><i>{subD[subInst].dparam[param].init}</i></td>
									<td><i>{printSet(subD[subInst].dparam[param].chg)}</i></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

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
	div > article {
		margin: 0.5rem;
	}
	div > table {
		font-size: 0.8rem;
		font-weight: 400;
		padding-bottom: 1rem;
		margin-left: 1rem;
	}
	div > table > thead {
		background-color: colors.$table-head;
	}
	div > table > tbody {
		background-color: colors.$table-body;
	}
	div > table > tbody > tr.changed {
		background-color: colors.$table-line-changed;
	}
</style>
