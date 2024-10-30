<script lang="ts">
	import { run } from 'svelte/legacy';

	/* eslint-disable svelte/no-at-html-tags */
	import { base } from '$app/paths';
	import { math } from 'mathlifier';

	// inputs
	let load_mass = $state(600); // kg
	let d1 = $state(0.5); //m
	let securityFactor = $state(4);
	let halfTurn = $state(120); // s
	let ringNb = $state(2);
	let wheelNb = $state(8);
	let wheelModule = $state(10);
	let wheelZ = $state(23);
	let wheelMargin = $state(10); // %
	let gearEffi = $state(80); // %
	let planet1Nb = $state(8);
	let epic1Module = $state(2);
	let planet1Z = $state(23);
	let stage1Nb = $state(3);
	let planet2Nb = $state(8);
	let epic2Module = $state(1);
	let planet2Z = $state(23);
	let stage2Nb = $state(6);
	let shutFor = $state(0.3); //0.0003; // N
	// outputs
	let torque1 = $derived(d1 * load_mass * 9.81);
	let torque2 = $derived(torque1 * securityFactor);
	let torque3 = $state(10);
	let torque4 = $state(10);
	let torque5 = $state(10);
	let speed3 = $state(10);
	let speed4 = $state(10);
	let speed5 = $state(10);
	let power2 = $state(10);
	let power3 = $state(10);
	let power4 = $state(10);
	let power5 = $state(10);
	let oneTurn = $state(10);
	let wheelDiameter = $state(10);
	let ringDiameter = $state(10);
	let ringZ = $state(10);
	let ratioRW = $state(10);
	let planet1Diameter = $state(10);
	let ring1Diameter = $state(10);
	let ring1Z = $state(10);
	let sun1Z = $state(10);
	let ratio1One = $state(10);
	let ratio1All = $state(10);
	let planet2Diameter = $state(10);
	let ring2Diameter = $state(10);
	let ring2Z = $state(10);
	let sun2Z = $state(10);
	let ratio2One = $state(10);
	let ratio2All = $state(10);
	// calculations
	run(() => {
		oneTurn = 2 * halfTurn;
	});
	run(() => {
		power2 = (torque2 * 2 * Math.PI) / oneTurn;
	}); // W
	run(() => {
		wheelDiameter = wheelModule * (wheelZ + 2);
	});
	function fRingZ(nb: number, wheelZ: number, margin: number): number {
		const angle = Math.PI / nb; //2 * Math.PI / (2 * nb);
		const tModule = 1; // not relevant for computing Zring
		const length = tModule * (wheelZ / 2 + 1) * (1 + margin / 100);
		const positionRadius = length / Math.sin(angle);
		const ringZ = Math.ceil(2 * positionRadius + wheelZ);
		return ringZ;
	}
	run(() => {
		ringZ = fRingZ(wheelNb, wheelZ, wheelMargin);
	});
	run(() => {
		ringDiameter = wheelModule * (ringZ + 4);
	});
	run(() => {
		ratioRW = ringZ / wheelZ;
	});
	run(() => {
		torque3 = torque2 / (ringNb * wheelNb * ratioRW * (gearEffi / 100));
	});
	run(() => {
		speed3 = oneTurn / ratioRW;
	}); // s
	run(() => {
		power3 = (torque3 * 2 * Math.PI) / speed3;
	}); // W
	run(() => {
		planet1Diameter = epic1Module * (planet1Z + 2);
	});
	run(() => {
		ring1Z = fRingZ(planet1Nb, planet1Z, wheelMargin);
	});
	run(() => {
		sun1Z = ring1Z - 2 * planet1Z;
	});
	run(() => {
		ring1Diameter = epic1Module * (ring1Z + 4);
	});
	run(() => {
		ratio1One = (sun1Z + ring1Z) / sun1Z;
	});
	run(() => {
		ratio1All = ratio1One ** stage1Nb;
	});
	run(() => {
		torque4 = torque3 / (ratio1All * (gearEffi / 100) ** stage1Nb);
	});
	run(() => {
		speed4 = ratio1All / speed3;
	}); // Hz
	run(() => {
		power4 = torque4 * 2 * Math.PI * speed4;
	}); // W
	run(() => {
		planet2Diameter = epic2Module * (planet2Z + 2);
	});
	run(() => {
		ring2Z = fRingZ(planet2Nb, planet2Z, wheelMargin);
	});
	run(() => {
		sun2Z = ring2Z - 2 * planet2Z;
	});
	run(() => {
		ring2Diameter = epic2Module * (ring2Z + 4);
	});
	run(() => {
		ratio2One = (sun2Z + ring2Z) / sun2Z;
	});
	run(() => {
		ratio2All = ratio2One ** stage2Nb;
	});
	run(() => {
		torque5 = torque4 / (ratio2All * (gearEffi / 100) ** stage2Nb);
	});
	run(() => {
		speed5 = ratio2All * speed4;
	}); // Hz
	run(() => {
		power5 = torque5 * 2 * Math.PI * speed5;
	}); // W
</script>

<h1>Motorized axis</h1>
<article>
	This page sizes the gears and motors for reaching the requirements of a motorized axis.
</article>
<h2>Parameter description</h2>
<article>
	<img src="{base}/puisvg/torque_requirements.svg" alt="torque requirements" />
	<img src="{base}/puisvg/axis_param_1.svg" alt="top-level axis parameters" />
	<img src="{base}/puisvg/gear_ring_overview.svg" alt="gear-ring overview" />
	<img src="{base}/puisvg/gear_module.svg" alt="gear module" />
	<img src="{base}/puisvg/epicyclic_gearing.svg" alt="epicyclic gearing" />
</article>
<h2>Numerical application</h2>
<article>
	<table>
		<tbody>
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
				<td>{@html math('T_1')}</td>
				<td>Load torque (N.m)</td>
				<td>{torque1.toFixed(2)} N.m</td>
				<td>{@html math('T_1 = 9.81 * M * D_1')}</td>
			</tr>
			<tr>
				<td>{@html math('F_s')}</td>
				<td>Security factor</td>
				<td
					><input
						type="number"
						bind:value={securityFactor}
						min="1"
						max="10"
						step="0.1"
					/></td
				>
				<td
					><input
						type="range"
						bind:value={securityFactor}
						min="1"
						max="10"
						step="0.1"
					/></td
				>
			</tr>
			<tr>
				<td>{@html math('T_2')}</td>
				<td>Given torque (N.m)</td>
				<td>{torque2.toFixed(2)} N.m</td>
				<td>{@html math('T_2 = T_1 * F_s')}</td>
			</tr>
			<tr>
				<td>{@html math('t_{ht}')}</td>
				<td>Time for half turn (s)</td>
				<td><input type="number" bind:value={halfTurn} min="1" max="720" step="1" /></td>
				<td><input type="range" bind:value={halfTurn} min="1" max="720" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('t_{ot}')}</td>
				<td>Time for one turn (s)</td>
				<td>{oneTurn.toFixed(2)} s</td>
				<td>{@html math('t_{ot} = 2 * t_{ht}')}</td>
			</tr>
			<tr>
				<td>{@html math('s_2')}</td>
				<td>Axis rotation speed (rpm)</td>
				<td>{(60 / oneTurn).toFixed(2)} rpm</td>
				<td>{@html math('s_2 = \\frac{60}{t_{ot}}')}</td>
			</tr>
			<tr>
				<td>{@html math('P_2')}</td>
				<td>Power at axis (W)</td>
				<td>{power2.toFixed(2)} W</td>
				<td>{@html math('P_2 = \\frac{T_2 * 2 * \\pi}{t_{ot}}')}</td>
			</tr>
			<tr class="subtitle">
				<td></td>
				<td>Axis gear-rings and gear-wheels</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>{@html math('N_r')}</td>
				<td>Number of gear-rings</td>
				<td><input type="number" bind:value={ringNb} min="1" max="4" step="1" /></td>
				<td><input type="range" bind:value={ringNb} min="1" max="4" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('N_w')}</td>
				<td>Number of gear-wheels</td>
				<td><input type="number" bind:value={wheelNb} min="1" max="24" step="1" /></td>
				<td><input type="range" bind:value={wheelNb} min="1" max="24" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('m_w')}</td>
				<td>Module of gear-wheel (mm)</td>
				<td
					><input
						type="number"
						bind:value={wheelModule}
						min="1"
						max="100"
						step="0.1"
					/></td
				>
				<td><input type="range" bind:value={wheelModule} min="1" max="100" step="0.1" /></td
				>
			</tr>
			<tr>
				<td>{@html math('Z_w')}</td>
				<td>Number of teeth of gear-wheel</td>
				<td><input type="number" bind:value={wheelZ} min="17" max="40" step="1" /></td>
				<td><input type="range" bind:value={wheelZ} min="17" max="40" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('D_w')}</td>
				<td>Diameter of gear-wheel (mm)</td>
				<td>{wheelDiameter.toFixed(2)} mm</td>
				<td>{@html math('D_w = (Z_w + 2) * m_w')}</td>
			</tr>
			<tr>
				<td>{@html math('Margin_w')}</td>
				<td>Margin between gear-wheels (%)</td>
				<td
					><input
						type="number"
						bind:value={wheelMargin}
						min="0.1"
						max="20"
						step="0.1"
					/></td
				>
				<td
					><input
						type="range"
						bind:value={wheelMargin}
						min="0.1"
						max="20"
						step="0.1"
					/></td
				>
			</tr>
			<tr>
				<td>{@html math('D_r')}</td>
				<td>Diameter of gear-ring (mm)</td>
				<td>{ringDiameter.toFixed(2)} mm</td>
				<td>{@html math('D_r = (Z_r + 4) * m_w')}</td>
			</tr>
			<tr>
				<td>{@html math('Z_r')}</td>
				<td>Number of teeth of gear-ring</td>
				<td>{ringZ}</td>
				<td>{@html math('Z_r = f(N_w, Z_w, Margin_w)')}</td>
			</tr>
			<tr>
				<td>{@html math('R_{r/w}')}</td>
				<td>Ratio ring / gear-wheel</td>
				<td>1 : {ratioRW.toFixed(2)}</td>
				<td>{@html math('R_{r/w} = \\frac{Z_w}{Z_r}')}</td>
			</tr>
			<tr>
				<td>{@html math('E')}</td>
				<td>Gear efficiency (%)</td>
				<td><input type="number" bind:value={gearEffi} min="1" max="100" step="0.5" /></td>
				<td><input type="range" bind:value={gearEffi} min="1" max="100" step="0.5" /></td>
			</tr>
			<tr>
				<td>{@html math('T_3')}</td>
				<td>Torque of gear-wheel (N.m)</td>
				<td>{torque3.toFixed(2)} N.m</td>
				<td>{@html math('T_3 = \\frac{T_2 * R_{r/w}}{N_r * N_w * E}')}</td>
			</tr>
			<tr>
				<td>{@html math('t_3')}</td>
				<td>Gear-wheel rotation time (s)</td>
				<td>{speed3.toFixed(2)} s</td>
				<td>{@html math('t_3 = t_{ot} * R_{r/w}')}</td>
			</tr>
			<tr>
				<td>{@html math('s_3')}</td>
				<td>Gear-wheel rotation speed (rpm)</td>
				<td>{(60 / speed3).toFixed(2)} rpm</td>
				<td>{@html math('s_3 = \\frac{60}{t_3}')}</td>
			</tr>
			<tr>
				<td>{@html math('P_3')}</td>
				<td>Power at gear-wheel (W)</td>
				<td>{power3.toFixed(2)} W</td>
				<td>{@html math('P_3 = \\frac{T_3 * 2 * \\pi}{t_3}')}</td>
			</tr>
			<tr class="subtitle">
				<td></td>
				<td>Reductor-1</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>{@html math('N_{r1p}')}</td>
				<td>Number of planets of reductor-1</td>
				<td><input type="number" bind:value={planet1Nb} min="1" max="24" step="1" /></td>
				<td><input type="range" bind:value={planet1Nb} min="1" max="24" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('m_{r1}')}</td>
				<td>Module of epicyclic of reductor-1 (mm)</td>
				<td
					><input
						type="number"
						bind:value={epic1Module}
						min="1"
						max="100"
						step="0.1"
					/></td
				>
				<td><input type="range" bind:value={epic1Module} min="1" max="100" step="0.1" /></td
				>
			</tr>
			<tr>
				<td>{@html math('Z_{r1p}')}</td>
				<td>Number of teeth of planet-1</td>
				<td><input type="number" bind:value={planet1Z} min="17" max="40" step="1" /></td>
				<td><input type="range" bind:value={planet1Z} min="17" max="40" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('D_{r1p}')}</td>
				<td>Diameter of planet-1 (mm)</td>
				<td>{planet1Diameter.toFixed(2)} mm</td>
				<td>{@html math('D_{r1p} = (Z_{r1p} + 2) * m_{r1}')}</td>
			</tr>
			<tr>
				<td>{@html math('D_{r1r}')}</td>
				<td>Diameter of ring of reductor-1 (mm)</td>
				<td>{ring1Diameter.toFixed(2)} mm</td>
				<td>{@html math('D_{r1r} = (Z_{r1r} + 4) * m_{r1}')}</td>
			</tr>
			<tr>
				<td>{@html math('Z_{r1r}')}</td>
				<td>Number of teeth of ring-1</td>
				<td>{ring1Z}</td>
				<td>{@html math('Z_{r1r} = f(N_{r1p}, Z_{r1p}, Margin_w)')}</td>
			</tr>
			<tr>
				<td>{@html math('Z_{r1s}')}</td>
				<td>Number of teeth of sun-1</td>
				<td>{sun1Z}</td>
				<td>{@html math('Z_{r1s} = Z_{r1r} - 2 * Z_{r1p}')}</td>
			</tr>
			<tr>
				<td>{@html math('R_{r1-1}')}</td>
				<td>Ratio of one stage of reductor-1</td>
				<td>1 : {ratio1One.toFixed(2)}</td>
				<td>{@html math('R_{r1-1} = \\frac{Z_{r1s}}{Z_{r1s} * Z_{r1r}}')}</td>
			</tr>
			<tr>
				<td>{@html math('N_{r1}')}</td>
				<td>Number of stages of reductor-1</td>
				<td><input type="number" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
				<td><input type="range" bind:value={stage1Nb} min="1" max="10" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('R_{r1}')}</td>
				<td>Ratio of reductor-1</td>
				<td>1 : {ratio1All.toFixed(2)}</td>
				<td>{@html math('R_{r1} = {R_{r1-1}}^{N_{r1}}')}</td>
			</tr>
			<tr>
				<td>{@html math('E_{r1}')}</td>
				<td>Efficiency of reductor-1</td>
				<td>{(100 * (gearEffi / 100) ** stage1Nb).toFixed(2)} %</td>
				<td>{@html math('E_{r1} = E^{N_{r1}}')}</td>
			</tr>
			<tr>
				<td>{@html math('T_4')}</td>
				<td>Reductor-1 input torque (N.m)</td>
				<td>{torque4.toFixed(2)} N.m</td>
				<td>{@html math('T_4 = T_3 * R_{r1} * E_{r1}')}</td>
			</tr>
			<tr>
				<td>{@html math('f_4')}</td>
				<td>Reductor-1 input rotation speed (Hz)</td>
				<td>{speed4.toFixed(2)} Hz</td>
				<td>{@html math('f_4 = \\frac{1}{t_3 * R_{r1}}')}</td>
			</tr>
			<tr>
				<td>{@html math('s_4')}</td>
				<td>Reductor-1 input rotation speed (rpm)</td>
				<td>{(60 * speed4).toFixed(2)} rpm</td>
				<td>{@html math('s_4 = 60 * f_4')}</td>
			</tr>
			<tr>
				<td>{@html math('P_4')}</td>
				<td>Power at reductor-1 input (W)</td>
				<td>{power4.toFixed(2)} W</td>
				<td>{@html math('P_4 = T_4 * 2 * \\pi * f_4')}</td>
			</tr>
			<tr class="subtitle">
				<td></td>
				<td>From Reductor-1 input to axis</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>{@html math('R_{a/r1i}')}</td>
				<td>Ratio from reductor-1 input to axis</td>
				<td>1 : {(ratioRW * ratio1All).toFixed(2)}</td>
			</tr>
			<tr>
				<td>{@html math('E_{a/r1i}')}</td>
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
				<td>{@html math('N_{r2p}')}</td>
				<td>Number of planets of reductor-2</td>
				<td><input type="number" bind:value={planet2Nb} min="1" max="24" step="1" /></td>
				<td><input type="range" bind:value={planet2Nb} min="1" max="24" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('m_{r2}')}</td>
				<td>Module of epicyclic of reductor-2 (mm)</td>
				<td
					><input
						type="number"
						bind:value={epic2Module}
						min="1"
						max="100"
						step="0.1"
					/></td
				>
				<td><input type="range" bind:value={epic2Module} min="1" max="100" step="0.1" /></td
				>
			</tr>
			<tr>
				<td>{@html math('Z_{r2p}')}</td>
				<td>Number of teeth of planet-2</td>
				<td><input type="number" bind:value={planet2Z} min="17" max="40" step="1" /></td>
				<td><input type="range" bind:value={planet2Z} min="17" max="40" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('D_{r2p}')}</td>
				<td>Diameter of planet-2 (mm)</td>
				<td>{planet2Diameter.toFixed(2)} mm</td>
			</tr>
			<tr>
				<td>{@html math('D_{r2r}')}</td>
				<td>Diameter of ring of reductor-2 (mm)</td>
				<td>{ring2Diameter.toFixed(2)} mm</td>
			</tr>
			<tr>
				<td>{@html math('Z_{r2r}')}</td>
				<td>Number of teeth of ring-2</td>
				<td>{ring2Z}</td>
			</tr>
			<tr>
				<td>{@html math('Z_{r2s}')}</td>
				<td>Number of teeth of sun-2</td>
				<td>{sun2Z}</td>
			</tr>
			<tr>
				<td>{@html math('R_{r2}')}</td>
				<td>Ratio of one stage of reductor-2</td>
				<td>1 : {ratio2One.toFixed(2)}</td>
			</tr>
			<tr>
				<td>{@html math('N_{r2-1}')}</td>
				<td>Number of stages of reductor-2</td>
				<td><input type="number" bind:value={stage2Nb} min="1" max="10" step="1" /></td>
				<td><input type="range" bind:value={stage2Nb} min="1" max="10" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('N_{r2}')}</td>
				<td>Ratio of reductor-2</td>
				<td>1 : {ratio2All.toFixed(2)}</td>
			</tr>
			<tr>
				<td>{@html math('E_{r2}')}</td>
				<td>Efficiency of reductor-2</td>
				<td>{(100 * (gearEffi / 100) ** stage2Nb).toFixed(2)} %</td>
			</tr>
			<tr>
				<td>{@html math('T_5')}</td>
				<td>Reductor-2 input torque (N.m)</td>
				<td>{torque5.toFixed(2)} N.m</td>
			</tr>
			<tr>
				<td>{@html math('f_5')}</td>
				<td>Reductor-2 input rotation speed (Hz)</td>
				<td>{speed5.toFixed(2)} Hz</td>
			</tr>
			<tr>
				<td>{@html math('s_5')}</td>
				<td>Reductor-2 input rotation speed (rpm)</td>
				<td>{(60 * speed5).toFixed(2)} rpm</td>
			</tr>
			<tr>
				<td>{@html math('P_5')}</td>
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
				<td>{@html math('R_{a/r2i}')}</td>
				<td>Ratio from reductor-2 input to axis</td>
				<td>1 : {(ratioRW * ratio1All * ratio2All).toFixed(2)}</td>
			</tr>
			<tr>
				<td>{@html math('E_{a/r2i}')}</td>
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
				<td>{@html math('F_s')}</td>
				<td>Force on one shuttle (N)</td>
				<td
					><input
						type="number"
						bind:value={shutFor}
						min="0.0001"
						max="2"
						step="0.0001"
					/></td
				>
				<td
					><input
						type="range"
						bind:value={shutFor}
						min="0.0001"
						max="2"
						step="0.0001"
					/></td
				>
			</tr>
			<tr>
				<td>{@html math('D_s')}</td>
				<td>Shuttle diameter (mm)</td>
				<td>{((1000 * torque5) / shutFor).toFixed(2)} mm</td>
				<td>{@html math('D_s = \\frac{T_5}{F_s}')}</td>
			</tr>
		</tbody>
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
	article > table > tbody > tr.subtitle {
		background-color: colors.$table-head;
	}
</style>
