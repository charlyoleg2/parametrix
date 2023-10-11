<script lang="ts">
	import { base } from '$app/paths';

	// inputs
	let load_mass = 600; // kg
	let d1 = 1.5; //m
	let securityFactor = 4;
	let halfTurn = 120; // s
	let ringNb = 2;
	let wheelNb = 8;
	let wheelModule = 15;
	let wheelZ = 23;
	let wheelMargin = 10; // %
	let gearEfficiency = 20; // %
	let planet1Nb = 8;
	let epicyclic1Module = 2;
	let planet1Z = 23;
	let stage1Nb = 6;
	// calculations
	let torque1 = 10;
	let torque2 = 10;
	let torque3 = 10;
	let torque4 = 10;
	let speed4 = 10;
	let oneTurn = 10;
	let wheelDiameter = 10;
	let ringDiameter = 10;
	let ringZ = 10;
	let ratioRW = 10;
	let planet1Diameter = 10;
	let ring1Diameter = 10;
	let ring1Z = 10;
	let sun1Z = 10;
	let ratio1One = 10;
	let ratio1All = 10;

</script>

<h1>Motorized axis</h1>
<article>
	This page sizes the gears and motors for reaching the requirements of a motorized axis.
</article>
<h2>Parameter description</h2>
<article>
	<img src="{base}/torque_requirements.svg" alt="torque requirements" />
	<img src="{base}/axis_param_1.svg" alt="top-level axis parameters" />
	<img src="{base}/gear_ring_overview.svg" alt="gear-ring overview" />
	<img src="{base}/gear_module.svg" alt="gear module" />
	<img src="{base}/epicyclic_gearing.svg" alt="epicyclic gearing" />
</article>
<h2>Theory</h2>
<article></article>
<h2>Numerical application</h2>
<article>
	<table>
		<tr>
			<th>Symbol</th>
			<th>Parameter</th>
			<th>Value</th>
			<th></th>
		</tr>
		<tr>
			<td>M</td>
			<td>Mass of load (kg)</td>
			<td><input type="number" bind:value={load_mass} min="1" max="20000" step="1" /></td>
			<td><input type="range" bind:value={load_mass} min="1" max="20000" step="1" /></td>
		</tr>
		<tr>
			<td>D1</td>
			<td>Distance axis-load (m)</td>
			<td><input type="number" bind:value={d1} min="0.1" max="20" step="0.1" /></td>
			<td><input type="range" bind:value={d1} min="0.1" max="20" step="0.1" /></td>
		</tr>
		<tr>
			<td>T</td>
			<td>Load torque (N.m)</td>
			<td>{torque1}</td>
		</tr>
		<tr>
			<td></td>
			<td>Security factor</td>
			<td><input type="number" bind:value={securityFactor} min="1" max="10" step="0.1" /></td>
			<td><input type="range" bind:value={securityFactor} min="1" max="10" step="0.1" /></td>
		</tr>
		<tr>
			<td>T</td>
			<td>Given torque (N.m)</td>
			<td>{torque2}</td>
		</tr>
		<tr>
			<td></td>
			<td>Time for half turn (s)</td>
			<td><input type="number" bind:value={halfTurn} min="1" max="720" step="1" /></td>
			<td><input type="range" bind:value={halfTurn} min="1" max="720" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Time for one turn (s)</td>
			<td>{oneTurn}</td>
		</tr>
		<tr>
			<td>N1</td>
			<td>Number of gear-rings</td>
			<td><input type="number" bind:value={ringNb} min="1" max="4" step="1" /></td>
			<td><input type="range" bind:value={ringNb} min="1" max="4" step="1" /></td>
		</tr>
		<tr>
			<td>N2</td>
			<td>Number of gear-wheels</td>
			<td><input type="number" bind:value={wheelNb} min="1" max="24" step="1" /></td>
			<td><input type="range" bind:value={wheelNb} min="1" max="24" step="1" /></td>
		</tr>
		<tr>
			<td>mw</td>
			<td>Module of gear-wheel (mm)</td>
			<td><input type="number" bind:value={wheelModule} min="1" max="100" step="0.1" /></td>
			<td><input type="range" bind:value={wheelModule} min="1" max="100" step="0.1" /></td>
		</tr>
		<tr>
			<td>Zw</td>
			<td>Number of teeth of gear-wheel</td>
			<td><input type="number" bind:value={wheelZ} min="17" max="40" step="1" /></td>
			<td><input type="range" bind:value={wheelZ} min="17" max="40" step="1" /></td>
		</tr>
		<tr>
			<td>Dw</td>
			<td>Diameter of gear-wheel (m)</td>
			<td>{wheelDiameter}</td>
		</tr>
		<tr>
			<td></td>
			<td>Margin between gear-wheels (%)</td>
			<td><input type="number" bind:value={wheelMargin} min="0.1" max="20" step="0.1" /></td>
			<td><input type="range" bind:value={wheelMargin} min="0.1" max="20" step="0.1" /></td>
		</tr>
		<tr>
			<td>Dr</td>
			<td>Diameter of gear-ring (m)</td>
			<td>{ringDiameter}</td>
		</tr>
		<tr>
			<td>Zr</td>
			<td>Number of teeth of gear-ring (m)</td>
			<td>{ringZ}</td>
		</tr>
		<tr>
			<td></td>
			<td>Ration ring / gear-wheel</td>
			<td>1 : {ratioRW}</td>
		</tr>
		<tr>
			<td></td>
			<td>Gear efficiency (%)</td>
			<td><input type="number" bind:value={gearEfficiency} min="1" max="100" step="0.5" /></td>
			<td><input type="range" bind:value={gearEfficiency} min="1" max="100" step="0.5" /></td>
		</tr>
		<tr>
			<td>Tw</td>
			<td>Torque of gear-wheel (N.m)</td>
			<td>{torque3}</td>
		</tr>
		<tr>
			<td>Nr1</td>
			<td>Number of planets of reductor-1</td>
			<td><input type="number" bind:value={planet1Nb} min="1" max="24" step="1" /></td>
			<td><input type="range" bind:value={planet1Nb} min="1" max="24" step="1" /></td>
		</tr>
		<tr>
			<td>mr1</td>
			<td>Module of epicyclic of reductor-1 (mm)</td>
			<td><input type="number" bind:value={epicyclic1Module} min="1" max="100" step="0.1" /></td>
			<td><input type="range" bind:value={epicyclic1Module} min="1" max="100" step="0.1" /></td>
		</tr>
		<tr>
			<td>Zr1</td>
			<td>Number of teeth of planet-1</td>
			<td><input type="number" bind:value={planet1Z} min="17" max="40" step="1" /></td>
			<td><input type="range" bind:value={planet1Z} min="17" max="40" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Diameter of planet-1 (m)</td>
			<td>{planet1Diameter}</td>
		</tr>
		<tr>
			<td>Dr1</td>
			<td>Diameter of ring of reductor-1 (m)</td>
			<td>{ring1Diameter}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of teeth of ring-1</td>
			<td>{ring1Z}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of teeth of sun-1</td>
			<td>{sun1Z}</td>
		</tr>
		<tr>
			<td></td>
			<td>Ration of one stage of reductor-1</td>
			<td>1 : {ratio1One}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of stages of reductor-1</td>
			<td><input type="number" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
			<td><input type="range" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Ration of reductor-1</td>
			<td>1 : {ratio1All}</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-1 torque (N.m)</td>
			<td>{torque4}</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-1 speed (Hz)</td>
			<td>{speed4}</td>
		</tr>
	</table>
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	h2 {
		margin: 1rem;
		margin-top: 2rem;
		margin-bottom: 0.2rem;
	}
	article {
		margin: 1rem;
		margin-top: 0.2rem;
	}
</style>
