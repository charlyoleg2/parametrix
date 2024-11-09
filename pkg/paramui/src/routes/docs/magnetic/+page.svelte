<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { base } from '$app/paths';
	import { math } from 'mathlifier';
	import { onMount, onDestroy } from 'svelte';
	//import type { ChartTypeRegistry } from 'chart.js';
	import {
		Chart as ChartJS,
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Colors,
		Legend
	} from 'chart.js';

	ChartJS.register(
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Colors,
		Legend
	);

	// constants
	const mu0 = 1.25663706212 * 10 ** -6;
	// inputs
	let permeability = $state(5000);
	let torusRadius = $state(15); // mm
	let sectionArea = $state(100); // mm2
	let turnNb = $state(4000);
	let current = $state(1.5); // A
	let percentL2 = $state(30);
	let percentS2 = $state(200);
	let airgapG = $state(1);
	let permeaG = $state(5000);
	let airgapA = $state(10); // mm
	let airgapB = $state(10); // mm
	let shuttleX = $state(50); // percentage
	let airgapH = $state(0.2); // mm
	// calculation and outputs
	function fShuttleReluctance(posX: number, pHM: number): number {
		const areaLM = airgapAM * airgapBM; // m2
		const areaAirM = (posX * areaLM) / 100; // m2
		const areaShuttleM = ((100 - posX) * areaLM) / 100; // m2
		const reluct =
			torusLengthM / (permeability * mu0 * areaLM) +
			pHM / (mu0 * areaLM) +
			airgapGM / (mu0 * areaAirM + permeaG * mu0 * areaShuttleM);
		return reluct;
	}
	function fShuttleMagFlux(posX: number, pHM: number): number {
		const magFlux = magnetomotive / fShuttleReluctance(posX, pHM);
		return magFlux;
	}
	function fShuttleMagField(posX: number, pHM: number): number {
		const areaLM = airgapAM * airgapBM; // m2
		const magField = fShuttleMagFlux(posX, pHM) / areaLM;
		return magField;
	}
	function fShuttleEm(posX: number, pHM: number): number {
		const areaLM = airgapAM * airgapBM; // m2
		const areaAirM = (posX * areaLM) / 100; // m2
		const areaShuttleM = ((100 - posX) * areaLM) / 100; // m2
		//const reluct =
		//	torusLengthM / (permeability * mu0 * areaLM) +
		//	pHM / (mu0 * areaLM) +
		//	airgapGM / (mu0 * areaAirM + permeaG * mu0 * areaShuttleM);
		//const magFlux = magnetomotive / reluct;
		//const magFieldL = magFlux / areaLM;
		const magFieldL = fShuttleMagField(posX, pHM);
		//const tRG1 = airgapGM / (mu0 * areaAirM);
		//const tRG2 = airgapGM / (permeaG * mu0 * areaShuttleM);
		//const magFieldG1a = ((magFlux / areaAirM) * tRG2) / (tRG1 + tRG2);
		//const magFieldG2a = ((magFlux / areaShuttleM) * tRG1) / (tRG1 + tRG2);
		//const magmod = 0.0; // 0.5
		//const magFieldG1 = magmod * magFieldL + (1 - magmod) * magFieldG1a;
		//const magFieldG2 = magmod * magFieldL + (1 - magmod) * magFieldG2a;
		const magFieldG1 = magFieldL;
		const magFieldG2 = magFieldL;
		const magEm =
			(magFieldL ** 2 * torusLengthM * areaLM) / (2 * permeability * mu0) +
			(magFieldL ** 2 * pHM * areaLM) / (2 * mu0) +
			(magFieldG1 ** 2 * airgapGM * areaAirM) / (2 * mu0) +
			(magFieldG2 ** 2 * airgapGM * areaShuttleM) / (2 * permeaG * mu0);
		return magEm;
	}
	function fShuttleInductance(posX: number, pHM: number): number {
		const induct = turnNb ** 2 / fShuttleReluctance(posX, pHM);
		return induct;
	}
	function fShuttleForce(posX: number, pHM: number): number {
		const step = 0.1;
		let posX2 = posX;
		if (posX2 < 2 * step) {
			posX2 = 2 * step;
		}
		if (posX2 > 100 - 2 * step) {
			posX2 = 100 - 2 * step;
		}
		const rF = (fShuttleEm(posX2 + step, pHM) - fShuttleEm(posX2 - step, pHM)) / (2 * step);
		return rF;
	}
	let sectionAreaM = $derived(sectionArea / 1000000); // m2
	let torusLength = $derived(2 * Math.PI * torusRadius); // mm
	let torusLengthM = $derived(torusLength / 1000); // m
	let magnetomotive = $derived(turnNb * current);
	let torusReluctance = $derived(torusLengthM / (permeability * mu0 * sectionAreaM));
	let torusMagneticFlux = $derived(magnetomotive / torusReluctance);
	let torusMagneticField = $derived(torusMagneticFlux / sectionAreaM);
	let torusMagneticEnergy = $derived(
		(permeability * mu0 * sectionAreaM * turnNb ** 2 * current ** 2) / (2 * torusLengthM)
	);
	let torusInductance = $derived(turnNb ** 2 / torusReluctance);
	let swellingL2 = $derived((torusLength * percentL2) / 100);
	let swellingL1 = $derived(torusLength - swellingL2);
	let swellingL1M = $derived(swellingL1 / 1000);
	let swellingS1 = $derived(sectionArea);
	let swellingS1M = $derived(swellingS1 / 1000000);
	let swellingL2M = $derived(swellingL2 / 1000);
	let swellingS2 = $derived((swellingS1 * percentS2) / 100);
	let swellingS2M = $derived(swellingS2 / 1000000);
	let swellingReluctance = $derived(
		(swellingL1M * swellingS2M + swellingL2M * swellingS1M) /
			(permeability * mu0 * swellingS1M * swellingS2M)
	);
	let swellingMagneticFlux = $derived(magnetomotive / swellingReluctance);
	let swellingMagneticField1 = $derived(swellingMagneticFlux / swellingS1M);
	let swellingMagneticField2 = $derived(swellingMagneticFlux / swellingS2M);
	let swellingMagneticEnergy = $derived(
		(swellingMagneticField1 ** 2 * swellingL1M * swellingS1M) / (2 * permeability * mu0) +
			(swellingMagneticField2 ** 2 * swellingL2M * swellingS2M) / (2 * permeability * mu0)
	);
	let swellingInductance = $derived(
		(permeability * mu0 * turnNb ** 2 * swellingS1M * swellingS2M) /
			(swellingL1M * swellingS2M + swellingL2M * swellingS1M)
	);
	let airgapGM = $derived(airgapG / 1000);
	let airgapReluctance = $derived(
		(torusLengthM + permeability * airgapGM) / (permeability * mu0 * sectionAreaM)
	);
	let airgapMagneticFlux = $derived(magnetomotive / airgapReluctance);
	let airgapMagneticField = $derived(airgapMagneticFlux / sectionAreaM);
	let airgapMagneticEnergy = $derived(
		(airgapMagneticField ** 2 * torusLengthM * sectionAreaM) / (2 * permeability * mu0) +
			(airgapMagneticField ** 2 * airgapGM * sectionAreaM) / (2 * mu0)
	);
	let airgapInductance = $derived(turnNb ** 2 / airgapReluctance);
	let airgapAM = $derived(airgapA / 1000); // m
	let airgapBM = $derived(airgapB / 1000); // m
	let sectionAreaLM = $derived(airgapAM * airgapBM); // m2
	let sectionAreaL = $derived(sectionAreaLM * 1000000); // mm2
	let sectionAreaAirM = $derived((shuttleX * sectionAreaLM) / 100); // m2
	let sectionAreaAir = $derived(sectionAreaAirM * 1000000); // mm2
	let sectionAreaShuttleM = $derived(((100 - shuttleX) * sectionAreaLM) / 100); // m2
	let sectionAreaShuttle = $derived(sectionAreaShuttleM * 1000000); // mm2
	//shuttleReluctance =
	//	torusLengthM / (permeability * mu0 * airgapAM * airgapBM) +
	//	airgapGM / (mu0 * sectionAreaAirM + permeaG * mu0 * sectionAreaShuttleM);
	let shuttleReluctance = $derived(fShuttleReluctance(shuttleX, 0));
	//shuttleMagneticFlux = magnetomotive / shuttleReluctance;
	let shuttleMagneticFlux = $derived(fShuttleMagFlux(shuttleX, 0));
	//shuttleMagneticFieldL = shuttleMagneticFlux / sectionAreaLM;
	let shuttleMagneticFieldL = $derived(fShuttleMagField(shuttleX, 0));
	// RG1 = airgapGM / (mu0 * sectionAreaAirM);
	// RG2 = airgapGM / (permeaG * mu0 * sectionAreaShuttleM);
	//shuttleMagneticFieldG1 = ((shuttleMagneticFlux / sectionAreaAirM) * RG2) / (RG1 + RG2);
	let shuttleMagneticFieldG1 = $derived(shuttleMagneticFieldL);
	//shuttleMagneticFieldG2 = ((shuttleMagneticFlux / sectionAreaShuttleM) * RG1) / (RG1 + RG2);
	let shuttleMagneticFieldG2 = $derived(shuttleMagneticFieldL);
	//	shuttleMagneticEnergy =
	//		(shuttleMagneticFieldL ** 2 * torusLengthM * sectionAreaLM) / (2 * permeability * mu0) +
	//		(shuttleMagneticFieldG1 ** 2 * airgapGM * sectionAreaAirM) / (2 * mu0) +
	//		(shuttleMagneticFieldG2 ** 2 * airgapGM * sectionAreaShuttleM) / (2 * permeaG * mu0);
	let shuttleMagneticEnergy = $derived(fShuttleEm(shuttleX, 0));
	//shuttleInductance = turnNb ** 2 / shuttleReluctance;
	let shuttleInductance = $derived(fShuttleInductance(shuttleX, 0));
	let shuttleForce = $derived(fShuttleForce(shuttleX, 0));
	let airgapHM = $derived(airgapH / 1000); // m
	let shuttlerReluctance = $derived(fShuttleReluctance(shuttleX, airgapHM));
	let shuttlerMagneticFlux = $derived(fShuttleMagFlux(shuttleX, airgapHM));
	let shuttlerMagneticFieldL = $derived(fShuttleMagField(shuttleX, airgapHM));
	let shuttlerEm = $derived(fShuttleEm(shuttleX, airgapHM));
	let shuttlerInductance = $derived((2 * shuttlerEm) / current ** 2);
	let shuttlerForce = $derived(fShuttleForce(shuttleX, airgapHM));
	// charts
	let chartReluctance: ChartJS | null = null;
	let chartMagFlux: ChartJS | null = null;
	let chartMagField: ChartJS | null = null;
	let chartMagEnergy: ChartJS | null = null;
	let chartInductance: ChartJS | null = null;
	let chartForce: ChartJS | null = null;
	const stepNb = 20;
	const chartData = {
		shuttle_position: [...Array(stepNb).keys()],
		reluctance: [...Array(stepNb).keys()],
		magnetic_flux: [...Array(stepNb).keys()],
		magnetic_field: [...Array(stepNb).keys()],
		magnetic_energy: [...Array(stepNb).keys()],
		inductance: [...Array(stepNb).keys()],
		force_x: [...Array(stepNb).keys()]
	};
	function upChartData() {
		for (let i = 0; i < stepNb; i++) {
			const posX = (i * 100) / stepNb;
			chartData.shuttle_position[i] = posX;
			chartData.reluctance[i] = fShuttleReluctance(posX, airgapHM);
			chartData.magnetic_flux[i] = fShuttleMagFlux(posX, airgapHM);
			chartData.magnetic_field[i] = fShuttleMagField(posX, airgapHM);
			chartData.magnetic_energy[i] = fShuttleEm(posX, airgapHM);
			chartData.inductance[i] = (2 * fShuttleEm(posX, airgapHM)) / current ** 2;
			//chartData.inductance[i] = turnNb ** 2 / fShuttleReluctance(posX, airgapHM);
			chartData.force_x[i] = fShuttleForce(posX, airgapHM);
		}
	}
	function updateCharts() {
		upChartData();
		if (chartReluctance) {
			chartReluctance.data.datasets[0].data = chartData.reluctance;
			chartReluctance.update();
		}
		if (chartMagFlux) {
			chartMagFlux.data.datasets[0].data = chartData.magnetic_flux;
			chartMagFlux.update();
		}
		if (chartMagField) {
			chartMagField.data.datasets[0].data = chartData.magnetic_field;
			chartMagField.update();
		}
		if (chartMagEnergy) {
			chartMagEnergy.data.datasets[0].data = chartData.magnetic_energy;
			chartMagEnergy.update();
		}
		if (chartInductance) {
			chartInductance.data.datasets[0].data = chartData.inductance;
			chartInductance.update();
		}
		if (chartForce) {
			chartForce.data.datasets[0].data = chartData.force_x;
			chartForce.update();
		}
	}
	onMount(() => {
		upChartData();
		chartReluctance = new ChartJS(document.getElementById('cReluctance') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'reluctance', data: chartData.reluctance }]
			}
		});
		chartMagFlux = new ChartJS(document.getElementById('cMagFlux') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'magnetic flux', data: chartData.magnetic_flux }]
			}
		});
		chartMagField = new ChartJS(document.getElementById('cMagField') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'magnetic field', data: chartData.magnetic_field }]
			}
		});
		chartMagEnergy = new ChartJS(document.getElementById('cMagEnergie') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'magnetic energy', data: chartData.magnetic_energy }]
			}
		});
		chartInductance = new ChartJS(document.getElementById('cInductance') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'inductance', data: chartData.inductance }]
			}
		});
		chartForce = new ChartJS(document.getElementById('cForce') as HTMLCanvasElement, {
			type: 'line',
			data: {
				labels: chartData.shuttle_position,
				datasets: [{ label: 'Force Fx', data: chartData.force_x }]
			}
		});
	});
	onDestroy(() => {
		if (chartReluctance) {
			chartReluctance.destroy();
			chartReluctance = null;
			//delete chartReluctance;
		}
		if (chartMagFlux) {
			chartMagFlux.destroy();
			chartMagFlux = null;
		}
		if (chartMagField) {
			chartMagField.destroy();
			chartMagField = null;
		}
		if (chartMagEnergy) {
			chartMagEnergy.destroy();
			chartMagEnergy = null;
		}
		if (chartInductance) {
			chartInductance.destroy();
			chartInductance = null;
		}
		if (chartForce) {
			chartForce.destroy();
			chartForce = null;
		}
	});
</script>

<h1>Magnetic circuit</h1>
<article>
	This page provides an overview of magnetic circuits for modelizing the reluctance motor.
</article>
<h2>The reluctance motor</h2>
<article>
	The force exercised by a electrical reluctance motor is due to the minimization of the magnetic
	energy of the magnetic circuit.
	<h4>Advantages of the reluctance motor:</h4>
	<ul>
		<li>no permanent magnet</li>
		<li>consists mostly of soft iron and wiring</li>
		<li>simple mechanics</li>
		<li>also efficient at high speed</li>
		<li>only limited by the electrical power source and electrical switching speed</li>
	</ul>
	<h4>Disadvantages of the reluctance motor:</h4>
	<ul>
		<li>Advanced electronics</li>
		<li>Requires current sensors and position sensor</li>
	</ul>
</article>
<h2>Magnetic circuits</h2>
<h3>Physical laws</h3>
<article class="splitable">
	<h4>Definitions:</h4>
	<ul>
		<li>{@html math('\\mathcal{F}')} : magnetomotive force (unit: {@html math('A')})</li>
		<li>
			{@html math('\\varPhi')} : magnetic flux (unit: {@html math('Wb')} or {@html math(
				'H.A'
			)} or {@html math('kg.m^2.s^{-2}.A^{-1}')})
		</li>
		<li>
			{@html math('\\mathcal{R}')} : reluctance (unit: {@html math('H^{-1}')} or {@html math(
				'kg^{-1}.m^{-2}.s^2.A^2'
			)})
		</li>
		<li>{@html math('N')} : number of wire loops</li>
		<li>{@html math('i')} : electric current in one wire loops (unit: {@html math('A')})</li>
		<li>{@html math('L')} : length of the magnetic circuit (unit: {@html math('m')})</li>
		<li>
			{@html math('S')} : area of a section of the magnetic circuit (unit: {@html math(
				'm^2'
			)})
		</li>
		<li>{@html math('H')} : magnetizing field (unit: {@html math('A.m^{-1}')})</li>
		<li>
			{@html math('B')} : magnetic flux density (unit: {@html math('T')} or {@html math(
				'kg.s^{-2}.A^{-1}'
			)})
		</li>
		<li>
			{@html math('\\mu')} : magnetic permeability (unit: {@html math('H.m^{-1}')} or {@html math(
				'kg.m.s^{-2}.A^{-2}'
			)})
		</li>
		<li>
			{@html math('\\mu_0')} : vacuum magnetic permeability : {@html math(
				'\\mu_0 = 1.256 \\times 10^{-6} H.m^{-1}'
			)}
		</li>
	</ul>
	<h4>Laws at macroscopic scale (from integral equations):</h4>
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = Ni')}</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}</li>
		<li>{@html math('\\mathcal{R} = \\frac{L}{\\mu S} = \\frac{L}{\\mu_r \\mu_0 S}')}</li>
	</ul>
	<h4>Laws at microscopic scale (from differential equations):</h4>
	<ul class="formula">
		<li>{@html math('H = \\frac{\\mathcal{F}}{L} = \\frac{\\varPhi}{\\mu S}')}</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\mu H = \\mu_r \\mu_0 H')}</li>
		<li>{@html math('\\mu = \\mu_r \\mu_0 = \\frac{B}{H}')}</li>
	</ul>
	<h4>Energy:</h4>
	<ul class="formula">
		<li>
			{@html math('u_m')} : magnetic energy density (unit: {@html math('J.m^{-3}')} or {@html math(
				'kg.m^{-1}.s^{-2}'
			)})
		</li>
		<li>
			{@html math(
				'u_m = \\frac{B H}{2} = \\frac{B^2}{2 \\mu} = \\frac{B^2}{2 \\mu_r \\mu_0}'
			)}
		</li>
		<li>
			{@html math('E_m')} : energy of a magnetic circuit (unit: {@html math('J')} or {@html math(
				'kg.m^2.s^{-2}'
			)})
		</li>
		<li>{@html math('E_m = \\int_V u_m')}</li>
	</ul>
	<h4>Electrical circuit:</h4>
	<ul class="formula">
		<li>
			{@html math('e')} : electromotive force of a turn (unit: {@html math('V')} or {@html math(
				'kg.m^2.s^{-3}.A^{-1}'
			)})
		</li>
		<li>
			{@html math('u')} : electromotive force of the winding (unit: {@html math('V')} or {@html math(
				'kg.m^2.s^{-3}.A^{-1}'
			)})
		</li>
		<li>
			{@html math('\\mathcal{L}')} : inductance of a solenoid (unit: {@html math('H')} or {@html math(
				'kg.m^2.s^{-2}.A^{-2}'
			)})
		</li>
		<li>{@html math('e = -\\frac{d \\varPhi}{d t}')}</li>
		<li>{@html math('u = N e = -N \\frac{d \\varPhi}{d t}')}</li>
		<li>
			if {@html math('\\mathcal{R}')} constant over time
			<ul class="formula">
				<li>{@html math('u = -\\frac{N^2}{\\mathcal{R}} \\frac{d i}{d t}')}</li>
				<li>Let's define {@html math('\\mathcal{L} = \\frac{N^2}{\\mathcal{R}}')}</li>
				<li>
					{@html math(
						'\\mathcal{L} = \\frac{N^2}{\\mathcal{R}} = \\frac{N \\varPhi}{i} = \\frac{\\mu N^2 S}{L}'
					)}
				</li>
				<li>{@html math('u = -\\mathcal{L} \\frac{d i}{d t}')}</li>
				<li>{@html math('N \\varPhi = \\mathcal{L} i')}</li>
				<li>
					{@html math(
						'E_m = \\int_{Time} i u = \\int_{Time} i \\mathcal{L} \\frac{d i}{d t} = \\frac{\\mathcal{L} i^2}{2}'
					)}
				</li>
			</ul>
		</li>
	</ul>
</article>
<h3>Regular torus</h3>
<article class="splitable">
	<img src="{base}/puisvg/regular_torus.svg" alt="regular torus" />
	<ul class="formula">
		<li>{@html math('L = 2 \\pi R')} (length of the torus)</li>
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>{@html math('\\mathcal{R} = \\frac{L}{\\mu S}')}</li>
		<li>
			{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu S N i}{L}')}
		</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\frac{\\mu N i}{L}')}</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_V u_m')}
			{@html math('= \\int_V \\frac{B^2}{2 \\mu}')}
			{@html math('= \\frac{B^2}{2 \\mu} L S')}
			{@html math('= \\frac{\\mu S N^2 i^2}{2 L}')}
			{@html math('= \\frac{\\mathcal{L} i^2}{2}')}
		</li>
		<li>
			{@html math('\\mathcal{L} = \\frac{\\mu S N^2}{L} = \\frac{\\mu_r \\mu_0 S N^2}{L}')}
		</li>
	</ul>
	<table class="jump">
		<tbody>
			<tr>
				<th>Material</th>
				<th>Relative permeability</th>
			</tr>
			<tr>
				<td>Air</td>
				<td>1</td>
			</tr>
			<tr>
				<td>Iron 99.95</td>
				<td>200 000</td>
			</tr>
			<tr>
				<td>Iron 99.8</td>
				<td>5000</td>
			</tr>
			<tr>
				<td>Soft iron</td>
				<td>5000</td>
			</tr>
			<tr>
				<td>Cobalt</td>
				<td>250</td>
			</tr>
			<tr>
				<td>Nickel</td>
				<td>600</td>
			</tr>
			<tr>
				<td>Cobalt-iron</td>
				<td>18000</td>
			</tr>
			<tr>
				<td>Mu-matierial</td>
				<td>50 000</td>
			</tr>
			<tr>
				<td>Permalloy (nickel-iron)</td>
				<td>1000 000</td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<tr>
				<th>Symbol</th>
				<th>Parameter</th>
				<th>Value</th>
				<th></th>
			</tr>
			<tr>
				<td>{@html math('\\mu_r')}</td>
				<td>Relative permeability</td>
				<td
					><input
						type="number"
						bind:value={permeability}
						min="1"
						max="1000000"
						step="1"
					/></td
				>
				<td
					><input
						type="range"
						bind:value={permeability}
						min="1"
						max="1000000"
						step="1"
					/></td
				>
			</tr>
			<tr>
				<td>R</td>
				<td>Torus radius (mm)</td>
				<td
					><input
						type="number"
						bind:value={torusRadius}
						min="3"
						max="100"
						step="0.5"
					/></td
				>
				<td><input type="range" bind:value={torusRadius} min="3" max="100" step="0.5" /></td
				>
			</tr>
			<tr>
				<td>{@html math('S')}</td>
				<td>Torus section area ({@html math('mm^2')})</td>
				<td
					><input
						type="number"
						bind:value={sectionArea}
						min="1"
						max="1000"
						step="0.1"
					/></td
				>
				<td
					><input
						type="range"
						bind:value={sectionArea}
						min="1"
						max="1000"
						step="0.1"
					/></td
				>
			</tr>
			<tr>
				<td>{@html math('N')}</td>
				<td>Number of turns</td>
				<td><input type="number" bind:value={turnNb} min="1" max="10000" step="1" /></td>
				<td><input type="range" bind:value={turnNb} min="1" max="10000" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('i')}</td>
				<td>Current in the winding (A)</td>
				<td><input type="number" bind:value={current} min="0.01" max="20" step="0.01" /></td
				>
				<td><input type="range" bind:value={current} min="0.01" max="20" step="0.01" /></td>
			</tr>
			<tr>
				<td>{@html math('L')}</td>
				<td>Torus length (mm)</td>
				<td>{torusLength.toFixed(1)} mm</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{F}')}</td>
				<td>Magnetomotive force (A)</td>
				<td>{magnetomotive.toExponential(3)} A</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{R}')}</td>
				<td>Reluctance ({@html math('H^{-1}')})</td>
				<td>{torusReluctance.toExponential(3)} {@html math('H^{-1}')}</td>
			</tr>
			<tr>
				<td>{@html math('\\varPhi')}</td>
				<td>Magnetic flux ({@html math('H.A')})</td>
				<td>{torusMagneticFlux.toExponential(3)} H.A</td>
			</tr>
			<tr>
				<td>{@html math('B')}</td>
				<td>Magnetic field ({@html math('T')})</td>
				<td>{torusMagneticField.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('E_m')}</td>
				<td>Magnetic energy ({@html math('J')})</td>
				<td>{torusMagneticEnergy.toExponential(3)} J</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{L}')}</td>
				<td>Inductance ({@html math('H')})</td>
				<td>{torusInductance.toExponential(3)} H</td>
			</tr>
		</tbody>
	</table>
</article>
<h3>Torus with swelling</h3>
<article class="splitable">
	<img src="{base}/puisvg/torus_with_swelling.svg" alt="torus with swelling" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			{@html math(
				'\\mathcal{R} = \\mathcal{R}_1 + \\mathcal{R}_2 = \\frac{L_1}{\\mu S_1} + \\frac{L_2}{\\mu S_2}'
			)}
			{@html math('= \\frac{L_1 S_2 + L_2 S_1}{\\mu S_1 S_2}')}
		</li>
		<li>
			{@html math(
				'\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu S_1 S_2 N i}{L_1 S_2 + L_2 S_1}'
			)}
		</li>
		<li>
			<ul class="formula">
				<li>
					{@html math(
						'B_1 = \\frac{\\varPhi}{S_1} = \\frac{\\mu S_2 N i}{L_1 S_2 + L_2 S_1}'
					)}
				</li>
				<li>
					{@html math(
						'B_2 = \\frac{\\varPhi}{S_2} = \\frac{\\mu S_1 N i}{L_1 S_2 + L_2 S_1}'
					)}
				</li>
			</ul>
		</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_V \\frac{B^2}{2 \\mu}')}
			{@html math('= \\int_{V_1} \\frac{B_1^2}{2 \\mu} + \\int_{V_2} \\frac{B_2^2}{2 \\mu}')}
			{@html math('= \\frac{B_1^2}{2 \\mu} L_1 S_1 + \\frac{B_2^2}{2 \\mu} L_2 S_2')}
			{@html math('= \\frac{\\mu N^2 i^2}{2}\\frac{S_1 S_2}{L_1 S_2 + L_2 S_1}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{\\mu N^2 S_1 S_2}{L_1 S_2 + L_2 S_1}')}</li>
	</ul>
	<table class="jump">
		<tbody>
			<tr>
				<th>Symbol</th>
				<th>Parameter</th>
				<th>Value</th>
				<th></th>
			</tr>
			<tr>
				<td>{@html math('L_2')}</td>
				<td>Percentage of torus with L2 (%)</td>
				<td><input type="number" bind:value={percentL2} min="0" max="100" step="1" /></td>
				<td><input type="range" bind:value={percentL2} min="0" max="100" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('S_2')}</td>
				<td>Percentage of S2 compare to S1 (%)</td>
				<td><input type="number" bind:value={percentS2} min="1" max="400" step="1" /></td>
				<td><input type="range" bind:value={percentS2} min="1" max="400" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('L_1')}</td>
				<td>Length of L1 ({@html math('mm')})</td>
				<td>{swellingL1.toFixed(1)} mm</td>
			</tr>
			<tr>
				<td>{@html math('S_1')}</td>
				<td>Area of S1 ({@html math('mm^2')})</td>
				<td>{swellingS1.toFixed(1)} {@html math('mm^2')}</td>
			</tr>
			<tr>
				<td>{@html math('L_2')}</td>
				<td>Length of L2 ({@html math('mm')})</td>
				<td>{swellingL2.toFixed(1)} mm</td>
			</tr>
			<tr>
				<td>{@html math('S_2')}</td>
				<td>Area of S2 ({@html math('mm^2')})</td>
				<td>{swellingS2.toFixed(1)} {@html math('mm^2')}</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{F}')}</td>
				<td>Magnetomotive force (A)</td>
				<td>{magnetomotive.toExponential(3)} A</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{R}')}</td>
				<td>Reluctance ({@html math('H^{-1}')})</td>
				<td>{swellingReluctance.toExponential(3)} {@html math('H^{-1}')}</td>
			</tr>
			<tr>
				<td>{@html math('\\varPhi')}</td>
				<td>Magnetic flux ({@html math('H.A')})</td>
				<td>{swellingMagneticFlux.toExponential(3)} H.A</td>
			</tr>
			<tr>
				<td>{@html math('B_1')}</td>
				<td>Magnetic field ({@html math('T')})</td>
				<td>{swellingMagneticField1.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('B_2')}</td>
				<td>Magnetic field ({@html math('T')})</td>
				<td>{swellingMagneticField2.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('E_m')}</td>
				<td>Magnetic energy ({@html math('J')})</td>
				<td>{swellingMagneticEnergy.toExponential(3)} J</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{L}')}</td>
				<td>Inductance ({@html math('H')})</td>
				<td>{swellingInductance.toExponential(3)} H</td>
			</tr>
		</tbody>
	</table>
</article>
<h3>Torus with air gap</h3>
<article class="splitable">
	<img src="{base}/puisvg/torus_with_air_gap.svg" alt="torus with air gap" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			{@html math(
				'\\mathcal{R} = \\mathcal{R}_L + \\mathcal{R}_G = \\frac{L}{\\mu_r \\mu_0 S} + \\frac{G}{\\mu_0 S}'
			)}
			{@html math('= \\frac{L + \\mu_r G}{\\mu_r \\mu_0 S}')}
		</li>
		<li>
			{@html math(
				'\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu_r \\mu_0 S N i}{L + \\mu_r G}'
			)}
		</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\frac{\\mu_r \\mu_0 N i}{L + \\mu_r G}')}</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_V \\frac{B^2}{2 \\mu}')}
			{@html math(
				'= \\int_{V_1} \\frac{B^2}{2 \\mu_r \\mu_0} + \\int_{V_2} \\frac{B^2}{2 \\mu_0}'
			)}
			{@html math('= \\frac{B^2}{2 \\mu_r \\mu_0} L S + \\frac{B^2}{2 \\mu_0} G S')}
			{@html math('= \\frac{B^2 S}{2 \\mu_r \\mu0}(L + \\mu_r G)')}
			{@html math('= \\frac{\\mu_r \\mu_0 S N^2 i^2}{2 (L + \\mu_r G)}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{\\mu_r \\mu_0 S N^2}{L + \\mu_r G}')}</li>
	</ul>
	<table class="jump">
		<tbody>
			<tr>
				<th>Symbol</th>
				<th>Parameter</th>
				<th>Value</th>
				<th></th>
			</tr>
			<tr>
				<td>{@html math('G')}</td>
				<td>The thickness of air-gap ({@html math('m')})</td>
				<td><input type="number" bind:value={airgapG} min="0" max="20" step="0.01" /></td>
				<td><input type="range" bind:value={airgapG} min="0" max="20" step="0.01" /></td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{F}')}</td>
				<td>Magnetomotive force (A)</td>
				<td>{magnetomotive.toExponential(3)} A</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{R}')}</td>
				<td>Reluctance ({@html math('H^{-1}')})</td>
				<td>{airgapReluctance.toExponential(3)} {@html math('H^{-1}')}</td>
			</tr>
			<tr>
				<td>{@html math('\\varPhi')}</td>
				<td>Magnetic flux ({@html math('H.A')})</td>
				<td>{airgapMagneticFlux.toExponential(3)} H.A</td>
			</tr>
			<tr>
				<td>{@html math('B_L')}</td>
				<td>Magnetic field ({@html math('T')})</td>
				<td>{airgapMagneticField.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('B_G')}</td>
				<td>Magnetic field ({@html math('T')})</td>
				<td>{airgapMagneticField.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('E_m')}</td>
				<td>Magnetic energy ({@html math('J')})</td>
				<td>{airgapMagneticEnergy.toExponential(3)} J</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{L}')}</td>
				<td>Inductance ({@html math('H')})</td>
				<td>{airgapInductance.toExponential(3)} H</td>
			</tr>
		</tbody>
	</table>
</article>
<h3>Torus with shuttle</h3>
<article class="splitable">
	<img src="{base}/puisvg/torus_with_shuttle.svg" alt="torus with shuttle" />
	<img
		src="{base}/puisvg/top_view_of_air_gap_and_shuttle.svg"
		alt="top view of air gap and shuttle"
	/>
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			<ul class="formula">
				<li>
					{@html math(
						'\\mathcal{R} = \\mathcal{R}_L + \\frac{1}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
				</li>
				<li>{@html math('\\mathcal{R}_L = \\frac{L}{\\mu_r \\mu_0 A B}')}</li>
				<li>{@html math('\\mathcal{R}_{G1} = \\frac{G}{\\mu_0 x B}')}</li>
				<li>{@html math('\\mathcal{R}_{G2} = \\frac{G}{\\mu_r \\mu_0 (A - x) B}')}</li>
				<li>
					{@html math(
						'\\mathcal{R} = \\frac{x L (1 - \\mu_r) + \\mu_r A (L + G)}{\\mu_r \\mu_0 A B (x (1 - \\mu_r) + \\mu_r A)}'
					)}
				</li>
				<li>{@html math('\\mathcal{R}_{x=0} = \\frac{L + G}{\\mu_r \\mu_0 A B}')}</li>
				<li>
					{@html math(
						'\\mathcal{R}_{x=A} = \\frac{L (1 + \\mu_r  G)}{\\mu_r \\mu_0 A B} > \\mathcal{R}_{x=0}'
					)}
				</li>
			</ul>
		</li>
		<li>
			{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}
			{@html math(
				'= \\frac{\\mu_r \\mu_0 A B N i (x (1 - \\mu_r) + \\mu_r A)}{x L (1 - \\mu_r) + \\mu_r A (L + G)}'
			)}
		</li>
		<li>
			<ul class="formula">
				<li>
					{@html math('B_L = \\frac{\\varPhi}{A B}')}
					{@html math(
						'= \\frac{\\mu_r \\mu_0 N i (x (1 - \\mu_r) + \\mu_r A)}{x L (1 - \\mu_r) + \\mu_r A (L + G)}'
					)}
				</li>
				<li>
					<!--
					{@html math('B_{G1} = \\frac{\\varPhi}{x B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G1}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{x B} \\frac{\\mathcal{R}_{G2}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
					-->
					{@html math('B_{G1} \\simeq B_L')}
				</li>
				<li>
					<!--
					{@html math('B_{G2} = \\frac{\\varPhi}{(A - x) B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G2}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{(A - x) B} \\frac{\\mathcal{R}_{G1}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
					-->
					{@html math('B_{G2} \\simeq B_L')}
				</li>
			</ul>
		</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_{V_L} \\frac{B_L^2}{2 \\mu_r \\mu_0}')}
			{@html math('+ \\int_{V_{G1}} \\frac{B_{G1}^2}{2 \\mu_0}')}
			{@html math('+ \\int_{V_{G2}} \\frac{B_{G2}^2}{2 \\mu_r \\mu_0}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{N^2}{\\mathcal{R}}')}</li>
		<li>{@html math('F_x = - \\frac{\\partial E_m}{\\partial x}')}</li>
	</ul>
	<table class="jump">
		<tbody>
			<tr>
				<th>Symbol</th>
				<th>Parameter</th>
				<th>Value</th>
				<th></th>
			</tr>
			<tr>
				<td>{@html math('\\mu_r')}</td>
				<td>Relative permeability of the shuttle</td>
				<td><input type="number" bind:value={permeaG} min="1" max="1000000" step="1" /></td>
				<td><input type="range" bind:value={permeaG} min="1" max="1000000" step="1" /></td>
			</tr>
			<tr>
				<td>{@html math('A')}</td>
				<td>Length of the air-gap ({@html math('mm')})</td>
				<td><input type="number" bind:value={airgapA} min="0.1" max="100" step="0.1" /></td>
				<td><input type="range" bind:value={airgapA} min="0.1" max="100" step="0.1" /></td>
			</tr>
			<tr>
				<td>{@html math('B')}</td>
				<td>Width of the air-gap ({@html math('mm')})</td>
				<td><input type="number" bind:value={airgapB} min="0.1" max="100" step="0.1" /></td>
				<td><input type="range" bind:value={airgapB} min="0.1" max="100" step="0.1" /></td>
			</tr>
			<tr>
				<td>{@html math('x')}</td>
				<td>Shuttle position (%)</td>
				<td><input type="number" bind:value={shuttleX} min="0" max="100" step="0.1" /></td>
				<td><input type="range" bind:value={shuttleX} min="0" max="100" step="0.1" /></td>
			</tr>
			<tr>
				<td>{@html math('S')}</td>
				<td>Torus section area ({@html math('mm^2')})</td>
				<td>{sectionAreaL.toFixed(1)} {@html math('mm^2')}</td>
			</tr>
			<tr>
				<td>{@html math('S_{air}')}</td>
				<td>Air area ({@html math('mm^2')})</td>
				<td>{sectionAreaAir.toFixed(1)} {@html math('mm^2')}</td>
			</tr>
			<tr>
				<td>{@html math('S_{shuttle}')}</td>
				<td>Shuttle area ({@html math('mm^2')})</td>
				<td>{sectionAreaShuttle.toFixed(1)} {@html math('mm^2')}</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{F}')}</td>
				<td>Magnetomotive force (A)</td>
				<td>{magnetomotive.toExponential(3)} A</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{R}')}</td>
				<td>Reluctance ({@html math('H^{-1}')})</td>
				<td>{shuttleReluctance.toExponential(3)} {@html math('H^{-1}')}</td>
			</tr>
			<tr>
				<td>{@html math('\\varPhi')}</td>
				<td>Magnetic flux ({@html math('H.A')})</td>
				<td>{shuttleMagneticFlux.toExponential(3)} H.A</td>
			</tr>
			<tr>
				<td>{@html math('B_L')}</td>
				<td>Magnetic field in torus ({@html math('T')})</td>
				<td>{shuttleMagneticFieldL.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('B_{Gair}')}</td>
				<td>Magnetic field in air-gap ({@html math('T')})</td>
				<td>{shuttleMagneticFieldG1.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('B_{Gshuttle}')}</td>
				<td>Magnetic field in shuttle ({@html math('T')})</td>
				<td>{shuttleMagneticFieldG2.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('E_m')}</td>
				<td>Magnetic energy ({@html math('J')})</td>
				<td>{shuttleMagneticEnergy.toExponential(3)} J</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{L}')}</td>
				<td>Inductance ({@html math('H')})</td>
				<td>{shuttleInductance.toExponential(3)} H</td>
			</tr>
			<tr>
				<td>{@html math('F_x')}</td>
				<td>Force ({@html math('N')})</td>
				<td>{shuttleForce.toExponential(3)} N</td>
			</tr>
		</tbody>
	</table>
</article>
<h3>Torus with realistic shuttle</h3>
<article class="splitable">
	<img
		src="{base}/puisvg/torus_with_realistic_shuttle.svg"
		alt="torus with a realistic shuttle"
	/>
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			<ul class="formula">
				<li>
					{@html math(
						'\\mathcal{R} = \\mathcal{R}_L + \\mathcal{R}_H + \\frac{1}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
				</li>
				<li>{@html math('\\mathcal{R}_L = \\frac{L}{\\mu_r \\mu_0 A B}')}</li>
				<li>{@html math('\\mathcal{R}_{G1} = \\frac{G}{\\mu_0 x B}')}</li>
				<li>{@html math('\\mathcal{R}_{G2} = \\frac{G}{\\mu_r \\mu_0 (A - x) B}')}</li>
				<li>{@html math('\\mathcal{R}_H = \\frac{H}{ \\mu_0 A B}')}</li>
			</ul>
		</li>
		<li>
			{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}
		</li>
		<li>
			<ul class="formula">
				<li>
					{@html math('B_L = B_H = \\frac{\\varPhi}{A B}')}
				</li>
				<li>
					<!--
					{@html math('B_{G1} = \\frac{\\varPhi}{x B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G1}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{x B} \\frac{\\mathcal{R}_{G2}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
					-->
					{@html math('B_{G1} \\simeq B_L')}
				</li>
				<li>
					<!--
					{@html math('B_{G2} = \\frac{\\varPhi}{(A - x) B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G2}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{(A - x) B} \\frac{\\mathcal{R}_{G1}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
					-->
					{@html math('B_{G2} \\simeq B_L')}
				</li>
			</ul>
		</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_{V_L} \\frac{B_L^2}{2 \\mu_r \\mu_0}')}
			{@html math('+ \\int_{V_{G1}} \\frac{B_{G1}^2}{2 \\mu_0}')}
			{@html math('+ \\int_{V_{G2}} \\frac{B_{G2}^2}{2 \\mu_r \\mu_0}')}
			{@html math('+ \\int_{V_H} \\frac{B_H^2}{2 \\mu_0}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{N^2}{\\mathcal{R}}')}</li>
		<li>{@html math('F_x = - \\frac{\\partial E_m}{\\partial x}')}</li>
	</ul>
	<table class="jump">
		<tbody>
			<tr>
				<th>Symbol</th>
				<th>Parameter</th>
				<th>Value</th>
				<th></th>
			</tr>
			<tr>
				<td>{@html math('H')}</td>
				<td>Thickness of slack ({@html math('mm')})</td>
				<td><input type="number" bind:value={airgapH} min="0" max="1" step="0.01" /></td>
				<td><input type="range" bind:value={airgapH} min="0" max="1" step="0.01" /></td>
			</tr>
			<tr>
				<td>{@html math('x')}</td>
				<td>Shuttle position (%)</td>
				<td><input type="number" bind:value={shuttleX} min="0" max="100" step="0.1" /></td>
				<td><input type="range" bind:value={shuttleX} min="0" max="100" step="0.1" /></td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{F}')}</td>
				<td>Magnetomotive force (A)</td>
				<td>{magnetomotive.toExponential(3)} A</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{R}')}</td>
				<td>Reluctance ({@html math('H^{-1}')})</td>
				<td>{shuttlerReluctance.toExponential(3)} {@html math('H^{-1}')}</td>
			</tr>
			<tr>
				<td>{@html math('\\varPhi')}</td>
				<td>Magnetic flux ({@html math('H.A')})</td>
				<td>{shuttlerMagneticFlux.toExponential(3)} H.A</td>
			</tr>
			<tr>
				<td>{@html math('B_L')}</td>
				<td>Magnetic field in torus ({@html math('T')})</td>
				<td>{shuttlerMagneticFieldL.toExponential(3)} T</td>
			</tr>
			<tr>
				<td>{@html math('E_m')}</td>
				<td>Magnetic energy ({@html math('J')})</td>
				<td>{shuttlerEm.toExponential(3)} J</td>
			</tr>
			<tr>
				<td>{@html math('\\mathcal{L}')}</td>
				<td>Inductance ({@html math('H')})</td>
				<td>{shuttlerInductance.toExponential(3)} H</td>
			</tr>
			<tr>
				<td>{@html math('F_x')}</td>
				<td>Force ({@html math('N')})</td>
				<td>{shuttlerForce.toExponential(3)} N</td>
			</tr>
		</tbody><tbody> </tbody>
	</table>
</article>
<h3>Torus with realistic shuttle in charts</h3>
<article>
	<button onclick={updateCharts}>Update charts</button>
	<div class="flexy">
		<div class="charty"><canvas id="cReluctance"></canvas></div>
		<div class="charty"><canvas id="cMagFlux"></canvas></div>
		<div class="charty"><canvas id="cMagField"></canvas></div>
		<div class="charty"><canvas id="cMagEnergie"></canvas></div>
		<div class="charty"><canvas id="cInductance"></canvas></div>
		<div class="charty"><canvas id="cForce"></canvas></div>
	</div>
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	h2,
	h3 {
		margin: 1rem;
		margin-top: 2rem;
		margin-bottom: 0.2rem;
	}
	article {
		margin: 1rem;
		margin-top: 0.2rem;
	}
	article.splitable {
		column-width: 40rem;
		column-gap: 2rem;
	}
	article > h4 {
		margin-top: 2rem;
		margin-bottom: 0.2rem;
	}
	ul {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
		margin-left: 0.2rem;
		padding-left: 1rem;
	}
	ul.formula > li {
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
	}
	table {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
	table.jump {
		margin-top: 5rem;
	}
	article > div > div.charty {
		width: 30%;
	}
	article > div.flexy {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem 3rem;
	}
</style>
