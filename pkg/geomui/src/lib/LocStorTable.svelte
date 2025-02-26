<script lang="ts">
	import ModalDiag from './ModalDiag.svelte';
	import { browser } from '$app/environment';

	// props
	interface Props {
		pageName: string;
		storeName: string;
		localKeys: string[];
	}
	let { pageName, storeName = $bindable(), localKeys = $bindable() }: Props = $props();

	// state
	let localDel: tLocalDel = $state({});
	let globalDel = $state(false);
	let modalDelConfirm = $state(false);

	// get the list of localStorage keys
	function getLocalKey() {
		let rKeyList: string[] = [];
		const re = new RegExp(`^${pageName}_`);
		if (browser) {
			const keyList = Object.keys(window.localStorage).filter((k) => re.test(k));
			//console.log(keyList);
			rKeyList = keyList.map((k) => k.replace(re, ''));
		}
		rKeyList.sort(); // order the list for consistent UX
		//console.log(rKeyList);
		return rKeyList;
	}
	localKeys = getLocalKey();
	function modifInput(iname: string) {
		storeName = iname;
	}
	// last modification date
	type tLocalDate = Record<string, string>;
	function getLocalDate(iKeys: string[]): tLocalDate {
		let rLocalDate: tLocalDate = {};
		if (browser) {
			for (const k of iKeys) {
				let lastModif = '';
				const k2 = `${pageName}_${k}`;
				const storeStr = window.localStorage.getItem(k2);
				if (storeStr !== null) {
					const val2 = JSON.parse(storeStr);
					lastModif = val2.lastModif;
				}
				//console.log(`dbg194: ${lastModif}`);
				rLocalDate[k] = lastModif;
			}
		}
		return rLocalDate;
	}
	let localDate: tLocalDate = $derived(getLocalDate(localKeys));
	// delete checkbox
	type tLocalDel = Record<string, boolean>;
	function getInitDel(iKeys: string[]): tLocalDel {
		let rLocalDel: tLocalDel = {};
		for (const k of iKeys) {
			rLocalDel[k] = false;
		}
		return rLocalDel;
	}
	localDel = getInitDel(localKeys);
	// global delete
	function setGlobalDel() {
		for (const k of localKeys) {
			localDel[k] = globalDel;
		}
	}
	// delete action
	function actionDel() {
		if (browser) {
			for (const k of localKeys) {
				if (localDel[k]) {
					//console.log(`delete ${k}`);
					const k2 = `${pageName}_${k}`;
					window.localStorage.removeItem(k2);
				}
			}
		}
		globalDel = false; // reset global delete checkbox
		localKeys = getLocalKey();
	}
</script>

<div class="deleteKeys">
	<button
		onclick={() => {
			modalDelConfirm = true;
		}}>Delete</button
	>
	<ModalDiag bind:modalOpen={modalDelConfirm} okName="Confirm" okFunc={actionDel}>
		<p class="diagTitle">Do you really want to delete the following localStorage keys?</p>
		{#each localKeys as kname (kname)}
			{#if localDel[kname]}
				<p class="diagItem">{kname}</p>
			{/if}
		{/each}
	</ModalDiag>
	<table>
		<thead>
			<tr>
				<td>Delete</td>
				<td>Key name</td>
				<td>Last modification</td>
			</tr>
			<tr>
				<td><input type="checkbox" bind:checked={globalDel} onchange={setGlobalDel} /></td>
				<td class="instruction">delete all</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			{#each localKeys as kname (kname)}
				<tr>
					<td><input type="checkbox" bind:checked={localDel[kname]} /></td>
					<td><button onclick={() => modifInput(kname)}>{kname}</button></td>
					<td>{localDate[kname]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

	div.deleteKeys {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div > button {
		@include styling.mix-button;
	}
	div > table {
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0.5rem 2rem 0.5rem;
	}
	div > table > thead {
		background-color: colors.$table-head;
	}
	div > table > tbody {
		background-color: colors.$table-body;
	}
	div > table > tbody > tr > td > button {
		color: colors.$timectrl-sign;
		background-color: transparent;
		border: 0;
	}
	p.diagTitle {
		font-size: 1rem;
		font-weight: 400;
		margin: 0.2rem;
	}
	p.diagItem {
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0;
	}
</style>
