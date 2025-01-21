<script lang="ts">
	import { onDestroy } from 'svelte';

	// props
	interface Props {
		tMax?: number;
		tStep?: number;
		tUpdate?: number;
		simTime?: number;
	}
	let { tMax = 10, tStep = 0.1, tUpdate = 500, simTime = $bindable(0) }: Props = $props();

	// internal state: no need of $state() because no UI update
	let intervalID: ReturnType<typeof setTimeout> | null = null;
	let speed = 0;
	let inc: number;
	const speedMax = 4;

	// actions
	function clearInterval2() {
		if (intervalID !== null) {
			clearInterval(intervalID);
			intervalID = null;
		}
	}
	function simRoutine() {
		if (inc < 0 && simTime <= 0) {
			simTime = tMax;
		} else if (inc > 0 && simTime >= tMax) {
			simTime = 0;
		} else {
			simTime += inc;
		}
	}
	function setInterval2() {
		const delay = tUpdate / 2 ** (Math.abs(speed) - 1);
		inc = speed < 0 ? -tStep : tStep;
		intervalID = setInterval(simRoutine, delay);
		//console.log(`dbg909: ${delay} ======`);
	}
	function simZero() {
		clearInterval2();
		simTime = 0;
		speed = 0;
	}
	function simDecrem() {
		clearInterval2();
		speed = 0;
		inc = -tStep;
		simRoutine();
		//console.log(`dbg059: ${simTime}`);
	}
	function simIncrem() {
		clearInterval2();
		speed = 0;
		inc = tStep;
		simRoutine();
		//console.log(`dbg069: ${simTime}`);
	}
	function simPlayBackward() {
		clearInterval2();
		speed = Math.max(speed - 1, -speedMax);
		setInterval2();
		//console.log(`dbg954: ${speed} ======`);
	}
	function simPlayForward() {
		clearInterval2();
		speed = Math.min(speed + 1, speedMax);
		setInterval2();
		//console.log(`dbg961: ${speed} ======`);
	}
	function simPause() {
		clearInterval2();
		speed = 0;
	}
	onDestroy(() => {
		clearInterval2();
	});
</script>

<nav>
	<button onclick={simZero}>0</button>
	<button onclick={simPlayBackward}>&lt-</button>
	<button onclick={simDecrem}>|&lt</button>
	<button onclick={simPause}>||</button>
	<button onclick={simIncrem}>&gt|</button>
	<button onclick={simPlayForward}>-&gt</button>
	<input type="range" bind:value={simTime} min="0" max={tMax} step={tStep} />
	<input type="number" bind:value={simTime} min="0" max={tMax} step={tStep} />
</nav>

<style lang="scss">
	@use './style/colors.scss';

	nav > button {
		height: 1.6rem;
		width: 1.6rem;
		color: colors.$timectrl-sign;
		font-size: 1rem; /* used to be 1.1rem */
		font-weight: 900;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.2rem;
		border-color: colors.$timectrl-sign;
		padding: 0;
		margin: 0;
		background-color: colors.$timectrl-bg;
	}
	nav > input[type='range'] {
		width: 8rem;
	}
	nav > input[type='number'] {
		width: 3rem;
		border-color: colors.$timectrl-sign;
		background-color: colors.$timectrl-bg;
	}
</style>
