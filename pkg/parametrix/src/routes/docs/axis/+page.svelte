<script lang="ts">
	import { base } from '$app/paths';

	// inputs
	let load_mass = 600; // kg
	let d1 = 1.5; //m
	let securityFactor = 4;
	let halfTurn = 120; // s
	let ringNb = 2;
	let wheelNb = 8;
	let wheelModule = 10;
	let wheelZ = 23;
	let wheelMargin = 10; // %
	let gearEffi = 80; // %
	let planet1Nb = 8;
	let epic1Module = 2;
	let planet1Z = 23;
	let stage1Nb = 6;
	let planet2Nb = 8;
	let epic2Module = 1;
	let planet2Z = 23;
	let stage2Nb = 6;
	let shutFor = 0.0003; // N
	// outputs
	let torque1 = 10;
	let torque2 = 10;
	let torque3 = 10;
	let torque4 = 10;
	let torque5 = 10;
	let speed3 = 10;
	let speed4 = 10;
	let speed5 = 10;
	let power2 = 10;
	let power3 = 10;
	let power4 = 10;
	let power5 = 10;
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
	let planet2Diameter = 10;
	let ring2Diameter = 10;
	let ring2Z = 10;
	let sun2Z = 10;
	let ratio2One = 10;
	let ratio2All = 10;
	// calculations
	$: torque1 = d1 * load_mass * 9.81;
	$: torque2 = torque1 * securityFactor;
	$: oneTurn = 2 * halfTurn;
	$: power2 = (torque2 * 2 * Math.PI) / oneTurn; // W
	$: wheelDiameter = wheelModule * (wheelZ + 2);
	function fRingZ(nb: number, wheelZ: number, margin: number): number {
		const angle = Math.PI / nb; //2 * Math.PI / (2 * nb);
		const tModule = 1; // not relevant for computing Zring
		const length = tModule * (wheelZ / 2 + 1) * (1 + margin / 100);
		const positionRadius = length / Math.sin(angle);
		const ringZ = Math.ceil(2 * positionRadius + wheelZ);
		return ringZ;
	}
	$: ringZ = fRingZ(wheelNb, wheelZ, wheelMargin);
	$: ringDiameter = wheelModule * (ringZ + 4);
	$: ratioRW = ringZ / wheelZ;
	$: torque3 = torque2 / (ringNb * wheelNb * ratioRW * (gearEffi / 100));
	$: speed3 = oneTurn / ratioRW; // s
	$: power3 = (torque3 * 2 * Math.PI) / speed3; // W
	$: planet1Diameter = epic1Module * (planet1Z + 2);
	$: ring1Z = fRingZ(planet1Nb, planet1Z, wheelMargin);
	$: sun1Z = ring1Z - 2 * planet1Z;
	$: ring1Diameter = epic1Module * (ring1Z + 4);
	$: ratio1One = (sun1Z + ring1Z) / sun1Z;
	$: ratio1All = ratio1One ** stage1Nb;
	$: torque4 = torque3 / (ratio1All * (gearEffi / 100) ** stage1Nb);
	$: speed4 = ratio1All / speed3; // Hz
	$: power4 = torque4 * 2 * Math.PI * speed4; // W
	$: planet2Diameter = epic2Module * (planet2Z + 2);
	$: ring2Z = fRingZ(planet2Nb, planet2Z, wheelMargin);
	$: sun2Z = ring2Z - 2 * planet2Z;
	$: ring2Diameter = epic2Module * (ring2Z + 4);
	$: ratio2One = (sun2Z + ring2Z) / sun2Z;
	$: ratio2All = ratio2One ** stage2Nb;
	$: torque5 = torque4 / (ratio2All * (gearEffi / 100) ** stage2Nb);
	$: speed5 = ratio2All * speed4; // Hz
	$: power5 = torque5 * 2 * Math.PI * speed5; // W
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
		<tr class="subtitle">
			<td></td>
			<td>Motorized axis requirements</td>
			<td></td>
			<td></td>
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
			<td>{torque1.toFixed(2)} N.m</td>
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
			<td>{torque2.toFixed(2)} N.m</td>
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
			<td>{oneTurn.toFixed(2)} s</td>
		</tr>
		<tr>
			<td></td>
			<td>Axis rotation speed (rpm)</td>
			<td>{(60 / oneTurn).toFixed(2)} rpm</td>
		</tr>
		<tr>
			<td></td>
			<td>Power at axis (W)</td>
			<td>{power2.toFixed(2)} W</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>Axis gear-rings and gear-wheels</td>
			<td></td>
			<td></td>
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
			<td>Diameter of gear-wheel (mm)</td>
			<td>{wheelDiameter.toFixed(2)} mm</td>
		</tr>
		<tr>
			<td></td>
			<td>Margin between gear-wheels (%)</td>
			<td><input type="number" bind:value={wheelMargin} min="0.1" max="20" step="0.1" /></td>
			<td><input type="range" bind:value={wheelMargin} min="0.1" max="20" step="0.1" /></td>
		</tr>
		<tr>
			<td>Dr</td>
			<td>Diameter of gear-ring (mm)</td>
			<td>{ringDiameter.toFixed(2)} mm</td>
		</tr>
		<tr>
			<td>Zr</td>
			<td>Number of teeth of gear-ring</td>
			<td>{ringZ}</td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio ring / gear-wheel</td>
			<td>1 : {ratioRW.toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Gear efficiency (%)</td>
			<td><input type="number" bind:value={gearEffi} min="1" max="100" step="0.5" /></td>
			<td><input type="range" bind:value={gearEffi} min="1" max="100" step="0.5" /></td>
		</tr>
		<tr>
			<td>Tw</td>
			<td>Torque of gear-wheel (N.m)</td>
			<td>{torque3.toFixed(2)} N.m</td>
		</tr>
		<tr>
			<td></td>
			<td>Gear-wheel rotation time (s)</td>
			<td>{speed3.toFixed(2)} s</td>
		</tr>
		<tr>
			<td></td>
			<td>Gear-wheel rotation speed (rpm)</td>
			<td>{(60 / speed3).toFixed(2)} rpm</td>
		</tr>
		<tr>
			<td></td>
			<td>Power at gearwheel (W)</td>
			<td>{power3.toFixed(2)} W</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>Reductor-1</td>
			<td></td>
			<td></td>
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
			<td><input type="number" bind:value={epic1Module} min="1" max="100" step="0.1" /></td>
			<td><input type="range" bind:value={epic1Module} min="1" max="100" step="0.1" /></td>
		</tr>
		<tr>
			<td>Zr1</td>
			<td>Number of teeth of planet-1</td>
			<td><input type="number" bind:value={planet1Z} min="17" max="40" step="1" /></td>
			<td><input type="range" bind:value={planet1Z} min="17" max="40" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Diameter of planet-1 (mm)</td>
			<td>{planet1Diameter.toFixed(2)} mm</td>
		</tr>
		<tr>
			<td>Dr1</td>
			<td>Diameter of ring of reductor-1 (mm)</td>
			<td>{ring1Diameter.toFixed(2)} mm</td>
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
			<td>Ratio of one stage of reductor-1</td>
			<td>1 : {ratio1One.toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of stages of reductor-1</td>
			<td><input type="number" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
			<td><input type="range" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio of reductor-1</td>
			<td>1 : {ratio1All.toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Efficiency of reductor-1</td>
			<td>{(100 * (gearEffi / 100) ** stage1Nb).toFixed(2)} %</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-1 input torque (N.m)</td>
			<td>{torque4.toFixed(2)} N.m</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-1 input rotation speed (Hz)</td>
			<td>{speed4.toFixed(2)} Hz</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-1 input rotation speed (rpm)</td>
			<td>{(60 * speed4).toFixed(2)} rpm</td>
		</tr>
		<tr>
			<td></td>
			<td>Power at reductor-1 input (W)</td>
			<td>{power4.toFixed(2)} W</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>From Reductor-1 input to axis</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio from reductor-1 input to axis</td>
			<td>1 : {(ratioRW * ratio1All).toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Efficiency from reductor-1 input to axis</td>
			<td>{(100 * (gearEffi / 100) ** (1 + stage1Nb)).toFixed(2)} %</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>Reductor-2</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Nr2</td>
			<td>Number of planets of reductor-2</td>
			<td><input type="number" bind:value={planet2Nb} min="1" max="24" step="1" /></td>
			<td><input type="range" bind:value={planet2Nb} min="1" max="24" step="1" /></td>
		</tr>
		<tr>
			<td>mr2</td>
			<td>Module of epicyclic of reductor-2 (mm)</td>
			<td><input type="number" bind:value={epic2Module} min="1" max="100" step="0.1" /></td>
			<td><input type="range" bind:value={epic2Module} min="1" max="100" step="0.1" /></td>
		</tr>
		<tr>
			<td>Zr2</td>
			<td>Number of teeth of planet-2</td>
			<td><input type="number" bind:value={planet2Z} min="17" max="40" step="1" /></td>
			<td><input type="range" bind:value={planet2Z} min="17" max="40" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Diameter of planet-2 (mm)</td>
			<td>{planet2Diameter.toFixed(2)} mm</td>
		</tr>
		<tr>
			<td>Dr2</td>
			<td>Diameter of ring of reductor-2 (mm)</td>
			<td>{ring2Diameter.toFixed(2)} mm</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of teeth of ring-2</td>
			<td>{ring2Z}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of teeth of sun-2</td>
			<td>{sun2Z}</td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio of one stage of reductor-2</td>
			<td>1 : {ratio2One.toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Number of stages of reductor-2</td>
			<td><input type="number" bind:value={stage2Nb} min="1" max="10" step="1" /></td>
			<td><input type="range" bind:value={stage2Nb} min="1" max="10" step="1" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio of reductor-2</td>
			<td>1 : {ratio2All.toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Efficiency of reductor-2</td>
			<td>{(100 * (gearEffi / 100) ** stage2Nb).toFixed(2)} %</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-2 input torque (N.m)</td>
			<td>{torque5.toFixed(2)} N.m</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-2 input rotation speed (Hz)</td>
			<td>{speed5.toFixed(2)} Hz</td>
		</tr>
		<tr>
			<td></td>
			<td>Reductor-2 input rotation speed (rpm)</td>
			<td>{(60 * speed5).toFixed(2)} rpm</td>
		</tr>
		<tr>
			<td></td>
			<td>Power at reductor-2 input (W)</td>
			<td>{power5.toFixed(2)} W</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>From Reductor-2 input to axis</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td>Ratio from reductor-2 input to axis</td>
			<td>1 : {(ratioRW * ratio1All * ratio2All).toFixed(2)}</td>
		</tr>
		<tr>
			<td></td>
			<td>Efficiency from reductor-2 input to axis</td>
			<td>{(100 * (gearEffi / 100) ** (1 + stage1Nb + stage2Nb)).toFixed(2)} %</td>
		</tr>
		<tr class="subtitle">
			<td></td>
			<td>Electrical reluctance motor</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td>Force on one shuttle (N)</td>
			<td><input type="number" bind:value={shutFor} min="0.0001" max="2" step="0.0001" /></td>
			<td><input type="range" bind:value={shutFor} min="0.0001" max="2" step="0.0001" /></td>
		</tr>
		<tr>
			<td></td>
			<td>Shuttle diameter (mm)</td>
			<td>{((1000 * torque5) / shutFor).toFixed(2)} mm</td>
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
	article > table > tr.subtitle {
		background-color: colors.$table-head;
	}
</style>
