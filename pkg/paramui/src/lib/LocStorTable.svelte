<script lang="ts">
	import ModalDiag from '$lib/ModalDiag.svelte';
	import { browser } from '$app/environment';

	export let pageName: string;
	export let storeName: string;
	export let localKeys: string[];

	// get the list of localStorage keys
	function getLocalKey() {
		let rKeyList: string[] = [];
		const re = new RegExp(`^${pageName}_`);
		if (browser) {
			const keyList = Object.keys(window.localStorage).filter((k) => re.test(k));
			//console.log(keyList);
			rKeyList = keyList.map((k) => k.replace(re, ''));
		}
		//console.log(rKeyList);
		return rKeyList;
	}
	localKeys = getLocalKey();
	function modifInput(iname: string) {
		storeName = iname;
	}
	// last modification date
	type tLocalDate = Record<string, string>;
	let localDate: tLocalDate = {};
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
	localDate = getLocalDate(localKeys);
	// delete checkbox
	type tLocalDel = Record<string, boolean>;
	let localDel: tLocalDel = {};
	function getInitDel(iKeys: string[]): tLocalDel {
		let rLocalDel: tLocalDel = {};
		for (const k of iKeys) {
			rLocalDel[k] = false;
		}
		return rLocalDel;
	}
	localDel = getInitDel(localKeys);
	// global delete
	let globalDel = false;
	function setGlobalDel(iGlobalDel: boolean) {
		for (const k of localKeys) {
			localDel[k] = iGlobalDel;
		}
	}
	$: setGlobalDel(globalDel);
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
		localKeys = getLocalKey();
	}
	let modalDelConfirm = false;
</script>

<div class="deleteKeys">
	<button
		on:click={() => {
			modalDelConfirm = true;
		}}>Delete</button
	>
	<ModalDiag bind:modalOpen={modalDelConfirm} okName="Confirm" okFunc={actionDel}>
		<p class="diagTitle">Do you really want to delete the following localStorage keys?</p>
		{#each localKeys as kname}
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
				<td><input type="checkbox" bind:checked={globalDel} /></td>
				<td class="instruction">delete all</td>
				<td />
			</tr>
		</thead>
		<tbody>
			{#each localKeys as kname}
				<tr>
					<td><input type="checkbox" bind:checked={localDel[kname]} /></td>
					<td><button on:click={() => modifInput(kname)}>{kname}</button></td>
					<td>{localDate[kname]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss';
	@use '$lib/style/styling.scss';

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
