<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { base } from '$app/paths';
	import { math } from 'mathlifier';

	// constants
	const mu0 = 1.25663706212 * 10 ** -6;
	// inputs
	let permeability = 5000;
	let torusRadius = 15; // mm
	let sectionArea = 100; // mm2
	let turnNb = 100;
	let current = 1.5; // A
	let percentL2 = 30;
	let percentS2 = 200;
	let airgapG = 1;
	let permeabilityG = 5000;
	let airgapA = 10; // mm
	let airgapB = 10; // mm
	let shuttleX = 50; // percentage
	let airgapH = 0.2; // mm
	// outputs
	let sectionAreaM = 10; // m2
	let torusLength = 10; // mm
	let torusLengthM = 10; // m
	let torusLengthStr = '10.0';
	let magnetomotive = 10;
	let magnetomotiveStr = '10.0';
	let torusReluctance = 10;
	let torusReluctanceStr = '10.0';
	let torusMagneticFlux = 10;
	let torusMagneticFluxStr = '10.0';
	let torusMagneticField = 10;
	let torusMagneticFieldStr = '10.0';
	let torusMagneticEnergy = 10;
	let torusMagneticEnergyStr = '10.0';
	let torusInductance = 10;
	let torusInductanceStr = '10.0';
	let swellingL1 = 10;
	let swellingL1M = 10;
	let swellingL1Str = '10.0';
	let swellingS1 = 10;
	let swellingS1M = 10;
	let swellingS1Str = '10.0';
	let swellingL2 = 10;
	let swellingL2M = 10;
	let swellingL2Str = '10.0';
	let swellingS2 = 10;
	let swellingS2M = 10;
	let swellingS2Str = '10.0';
	let swellingReluctance = 10;
	let swellingReluctanceStr = '10.0';
	let swellingMagneticFlux = 10;
	let swellingMagneticFluxStr = '10.0';
	let swellingMagneticField1 = 10;
	let swellingMagneticField1Str = '10.0';
	let swellingMagneticField2 = 10;
	let swellingMagneticField2Str = '10.0';
	let swellingMagneticEnergy = 10;
	let swellingMagneticEnergyStr = '10.0';
	let swellingInductance = 10;
	let swellingInductanceStr = '10.0';
	let airgapGM = 10;
	let airgapReluctance = 10;
	let airgapReluctanceStr = '10.0';
	let airgapMagneticFlux = 10;
	let airgapMagneticFluxStr = '10.0';
	let airgapMagneticField = 10;
	let airgapMagneticFieldStr = '10.0';
	let airgapMagneticEnergy = 10;
	let airgapMagneticEnergyStr = '10.0';
	let airgapInductance = 10;
	let airgapInductanceStr = '10.0';
	let sectionAreaL = 10;
	let sectionAreaLStr = "10";
	let sectionAreaAir = 10;
	let sectionAreaAirStr = "10";
	let sectionAreaShuttle = 10;
	let sectionAreaShuttleStr = "10";
	let shuttleReluctance = 10;
	let shuttleReluctanceStr = '10.0';
	let shuttleMagneticFlux = 10;
	let shuttleMagneticFluxStr = '10.0';
	let shuttleMagneticFieldL = 10;
	let shuttleMagneticFieldLStr = '10.0';
	let shuttleMagneticFieldG1 = 10;
	let shuttleMagneticFieldG1Str = '10.0';
	let shuttleMagneticFieldG2 = 10;
	let shuttleMagneticFieldG2Str = '10.0';
	let shuttleMagneticEnergy = 10;
	let shuttleMagneticEnergyStr = '10.0';
	let shuttleInductance = 10;
	let shuttleInductanceStr = '10.0';
	let shuttleForce = 10;
	let shuttleForceStr = '10.0';
	// calculations
	$: {
		torusLength = 2 * Math.PI * torusRadius;
		torusLengthStr = torusLength.toFixed(1);
	}
	$: torusLengthM = torusLength / 1000;
	$: sectionAreaM = sectionArea / 1000000;
	$: {
		magnetomotive = turnNb * current;
		magnetomotiveStr = magnetomotive.toFixed(1);
	}
	$: {
		torusReluctance = torusLengthM / (permeability * mu0 * sectionAreaM);
		torusReluctanceStr = torusReluctance.toExponential(3);
	}
	$: {
		torusMagneticFlux = magnetomotive / torusReluctance;
		torusMagneticFluxStr = torusMagneticFlux.toExponential(3);
	}
	$: {
		torusMagneticField = torusMagneticFlux / sectionAreaM;
		torusMagneticFieldStr = torusMagneticField.toExponential(3);
	}
	$: {
		torusMagneticEnergy =
			(permeability * mu0 * sectionAreaM * turnNb ** 2 * current ** 2) / (2 * torusLengthM);
		torusMagneticEnergyStr = torusMagneticEnergy.toExponential(3);
	}
	$: {
		torusInductance = turnNb ** 2 / torusReluctance;
		torusInductanceStr = torusInductance.toExponential(3);
	}
	$: {
		swellingL2 = (torusLength * percentL2) / 100;
		swellingL1 = torusLength - swellingL2;
		swellingL1Str = swellingL1.toFixed(1);
		swellingL2Str = swellingL2.toFixed(1);
	}
	$: {
		swellingS1 = sectionArea;
		swellingS2 = (swellingS1 * percentS2) / 100;
		swellingS1Str = swellingS1.toFixed(1);
		swellingS2Str = swellingS2.toFixed(1);
	}
	$: swellingL1M = swellingL1 / 1000;
	$: swellingS1M = swellingS1 / 1000000;
	$: swellingL2M = swellingL2 / 1000;
	$: swellingS2M = swellingS2 / 1000000;
	$: {
		swellingReluctance =
			(swellingL1M * swellingS2M + swellingL2M * swellingS1M) /
			(permeability * mu0 * swellingS1M * swellingS2M);
		swellingReluctanceStr = swellingReluctance.toExponential(3);
	}
	$: {
		swellingMagneticFlux = magnetomotive / swellingReluctance;
		swellingMagneticFluxStr = swellingMagneticFlux.toExponential(3);
	}
	$: {
		swellingMagneticField1 = swellingMagneticFlux / swellingS1M;
		swellingMagneticField1Str = swellingMagneticField1.toExponential(3);
	}
	$: {
		swellingMagneticField2 = swellingMagneticFlux / swellingS2M;
		swellingMagneticField2Str = swellingMagneticField2.toExponential(3);
	}
	$: {
		swellingMagneticEnergy =
			(swellingMagneticField1 ** 2 * swellingL1M * swellingS1M) / (2 * permeability * mu0) +
			(swellingMagneticField2 ** 2 * swellingL2M * swellingS2M) / (2 * permeability * mu0);
		swellingMagneticEnergyStr = swellingMagneticEnergy.toExponential(3);
	}
	$: {
		swellingInductance =
			(permeability * mu0 * turnNb ** 2 * swellingS1M * swellingS2M) /
			(swellingL1M * swellingS2M + swellingL2M * swellingS1M);
		swellingInductanceStr = swellingInductance.toExponential(3);
	}
	$: airgapGM = airgapG / 1000;
	$: {
		airgapReluctance =
			(torusLengthM + permeability * airgapGM) / (permeability * mu0 * sectionAreaM);
		airgapReluctanceStr = airgapReluctance.toExponential(3);
	}
	$: {
		airgapMagneticFlux = magnetomotive / airgapReluctance;
		airgapMagneticFluxStr = airgapMagneticFlux.toExponential(3);
	}
	$: {
		airgapMagneticField = airgapMagneticFlux / sectionAreaM;
		airgapMagneticFieldStr = airgapMagneticField.toExponential(3);
	}
	$: {
		airgapMagneticEnergy =
			(airgapMagneticField ** 2 * torusLengthM * sectionAreaM) / (2 * permeability * mu0) +
			(airgapMagneticField ** 2 * airgapGM * sectionAreaM) / (2 * mu0);
		airgapMagneticEnergyStr = airgapMagneticEnergy.toExponential(3);
	}
	$: {
		airgapInductance = turnNb ** 2 / airgapReluctance;
		airgapInductanceStr = airgapInductance.toExponential(3);
	}
</script>

<h1>Magnetic circuit</h1>
<article>
	In this page, we study several magnetic circuits in order to modelize the reluctance motor.
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
	<img src="{base}/regular_torus.svg" alt="regular torus" />
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
	</table>
	<table>
		<tr>
			<th>Symbol</th>
			<th>Parameter</th>
			<th>Value</th>
			<th></th>
		</tr>
		<tr>
			<td>{@html math('\\mu_r')}</td>
			<td>Relative permeability</td>
			<td><input type="number" bind:value={permeability} min="1" max="1000000" step="1" /></td
			>
			<td><input type="range" bind:value={permeability} min="1" max="1000000" step="1" /></td>
		</tr>
		<tr>
			<td>R</td>
			<td>Torus radius (mm)</td>
			<td><input type="number" bind:value={torusRadius} min="3" max="100" step="0.5" /></td>
			<td><input type="range" bind:value={torusRadius} min="3" max="100" step="0.5" /></td>
		</tr>
		<tr>
			<td>{@html math('S')}</td>
			<td>Torus section area ({@html math('mm^2')})</td>
			<td><input type="number" bind:value={sectionArea} min="1" max="1000" step="0.1" /></td>
			<td><input type="range" bind:value={sectionArea} min="1" max="1000" step="0.1" /></td>
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
			<td><input type="number" bind:value={current} min="0.01" max="20" step="0.01" /></td>
			<td><input type="range" bind:value={current} min="0.01" max="20" step="0.01" /></td>
		</tr>
		<tr>
			<td>{@html math('L')}</td>
			<td>Torus length (mm)</td>
			<td>{torusLengthStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{F}')}</td>
			<td>Magnetomotive force (A)</td>
			<td>{magnetomotiveStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{R}')}</td>
			<td>Reluctance ({@html math('H^{-1}')})</td>
			<td>{torusReluctanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\varPhi')}</td>
			<td>Magnetic flux ({@html math('H.A')})</td>
			<td>{torusMagneticFluxStr}</td>
		</tr>
		<tr>
			<td>{@html math('B')}</td>
			<td>Magnetic field ({@html math('T')})</td>
			<td>{torusMagneticFieldStr}</td>
		</tr>
		<tr>
			<td>{@html math('E_m')}</td>
			<td>Magnetic energy ({@html math('J')})</td>
			<td>{torusMagneticEnergyStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{L}')}</td>
			<td>Inductance ({@html math('H')})</td>
			<td>{torusInductanceStr}</td>
		</tr>
	</table>
</article>
<h3>Torus with swelling</h3>
<article class="splitable">
	<img src="{base}/torus_with_swelling.svg" alt="torus with swelling" />
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
			<td>{swellingL1Str}</td>
		</tr>
		<tr>
			<td>{@html math('S_1')}</td>
			<td>Area of S1 ({@html math('mm^2')})</td>
			<td>{swellingS1Str}</td>
		</tr>
		<tr>
			<td>{@html math('L_2')}</td>
			<td>Length of L2 ({@html math('mm')})</td>
			<td>{swellingL2Str}</td>
		</tr>
		<tr>
			<td>{@html math('S_2')}</td>
			<td>Area of S2 ({@html math('mm^2')})</td>
			<td>{swellingS2Str}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{F}')}</td>
			<td>Magnetomotive force (A)</td>
			<td>{magnetomotiveStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{R}')}</td>
			<td>Reluctance ({@html math('H^{-1}')})</td>
			<td>{swellingReluctanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\varPhi')}</td>
			<td>Magnetic flux ({@html math('H.A')})</td>
			<td>{swellingMagneticFluxStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_1')}</td>
			<td>Magnetic field ({@html math('T')})</td>
			<td>{swellingMagneticField1Str}</td>
		</tr>
		<tr>
			<td>{@html math('B_2')}</td>
			<td>Magnetic field ({@html math('T')})</td>
			<td>{swellingMagneticField2Str}</td>
		</tr>
		<tr>
			<td>{@html math('E_m')}</td>
			<td>Magnetic energy ({@html math('J')})</td>
			<td>{swellingMagneticEnergyStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{L}')}</td>
			<td>Inductance ({@html math('H')})</td>
			<td>{swellingInductanceStr}</td>
		</tr>
	</table>
</article>
<h3>Torus with air gap</h3>
<article class="splitable">
	<img src="{base}/torus_with_air_gap.svg" alt="torus with air gap" />
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
			<td>{magnetomotiveStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{R}')}</td>
			<td>Reluctance ({@html math('H^{-1}')})</td>
			<td>{airgapReluctanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\varPhi')}</td>
			<td>Magnetic flux ({@html math('H.A')})</td>
			<td>{airgapMagneticFluxStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_L')}</td>
			<td>Magnetic field ({@html math('T')})</td>
			<td>{airgapMagneticFieldStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_G')}</td>
			<td>Magnetic field ({@html math('T')})</td>
			<td>{airgapMagneticFieldStr}</td>
		</tr>
		<tr>
			<td>{@html math('E_m')}</td>
			<td>Magnetic energy ({@html math('J')})</td>
			<td>{airgapMagneticEnergyStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{L}')}</td>
			<td>Inductance ({@html math('H')})</td>
			<td>{airgapInductanceStr}</td>
		</tr>
	</table>
</article>
<h3>Torus with shuttle</h3>
<article class="splitable">
	<img src="{base}/torus_with_shuttle.svg" alt="torus with shuttle" />
	<img src="{base}/top_view_of_air_gap_and_shuttle.svg" alt="top view of air gap and shuttle" />
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
					{@html math('B_{G1} = \\frac{\\varPhi}{x B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G1}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{x B} \\frac{\\mathcal{R}_{G2}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
				</li>
				<li>
					{@html math('B_{G2} = \\frac{\\varPhi}{(A - x) B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G2}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{(A - x) B} \\frac{\\mathcal{R}_{G1}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
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
		<li>{@html math('F_x = \\frac{\\partial E_m}{\\partial x}')}</li>
	</ul>
	<table class="jump">
		<tr>
			<th>Symbol</th>
			<th>Parameter</th>
			<th>Value</th>
			<th></th>
		</tr>
		<tr>
			<td>{@html math('\\mu_r')}</td>
			<td>Relative permeability of the shuttle</td>
			<td><input type="number" bind:value={permeabilityG} min="1" max="1000000" step="1" /></td>
			<td><input type="range" bind:value={permeabilityG} min="1" max="1000000" step="1" /></td>
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
			<td><input type="number" bind:value={shuttleX} min="0.1" max="100" step="0.1" /></td>
			<td><input type="range" bind:value={shuttleX} min="0.1" max="100" step="0.1" /></td>
		</tr>
		<tr>
			<td>{@html math('S')}</td>
			<td>Torus section area ({@html math('mm^2')})</td>
			<td>{sectionAreaLStr}</td>
		</tr>
		<tr>
			<td>{@html math('S_{air}')}</td>
			<td>Air area ({@html math('mm^2')})</td>
			<td>{sectionAreaAirStr}</td>
		</tr>
		<tr>
			<td>{@html math('S_{shuttle}')}</td>
			<td>Shuttle area ({@html math('mm^2')})</td>
			<td>{sectionAreaShuttleStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{F}')}</td>
			<td>Magnetomotive force (A)</td>
			<td>{magnetomotiveStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{R}')}</td>
			<td>Reluctance ({@html math('H^{-1}')})</td>
			<td>{shuttleReluctanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\varPhi')}</td>
			<td>Magnetic flux ({@html math('H.A')})</td>
			<td>{shuttleMagneticFluxStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_L')}</td>
			<td>Magnetic field in torus ({@html math('T')})</td>
			<td>{shuttleMagneticFieldLStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_{Gair}')}</td>
			<td>Magnetic field in air-gap ({@html math('T')})</td>
			<td>{shuttleMagneticFieldG1Str}</td>
		</tr>
		<tr>
			<td>{@html math('B_{Gshuttle}')}</td>
			<td>Magnetic field in shuttle ({@html math('T')})</td>
			<td>{shuttleMagneticFieldG2Str}</td>
		</tr>
		<tr>
			<td>{@html math('E_m')}</td>
			<td>Magnetic energy ({@html math('J')})</td>
			<td>{shuttleMagneticEnergyStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{L}')}</td>
			<td>Inductance ({@html math('H')})</td>
			<td>{shuttleInductanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('F_x')}</td>
			<td>Force ({@html math('N')})</td>
			<td>{shuttleForceStr}</td>
		</tr>
	</table>
</article>
<h3>Torus with realistic shuttle</h3>
<article class="splitable">
	<img src="{base}/torus_with_realistic_shuttle.svg" alt="torus with a realistic shuttle" />
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
					{@html math('B_{G1} = \\frac{\\varPhi}{x B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G1}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{x B} \\frac{\\mathcal{R}_{G2}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
				</li>
				<li>
					{@html math('B_{G2} = \\frac{\\varPhi}{(A - x) B}')}
					{@html math(
						'\\frac{\\frac{1}{\\mathcal{R}_{G2}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}'
					)}
					{@html math(
						'= \\frac{\\varPhi}{(A - x) B} \\frac{\\mathcal{R}_{G1}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}'
					)}
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
		<li>{@html math('F_x = \\frac{\\partial E_m}{\\partial x}')}</li>
	</ul>
	<table class="jump">
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
			<td>{@html math('S')}</td>
			<td>Torus section area ({@html math('mm^2')})</td>
			<td>{sectionAreaLStr}</td>
		</tr>
		<tr>
			<td>{@html math('S_{air}')}</td>
			<td>Air area ({@html math('mm^2')})</td>
			<td>{sectionAreaAirStr}</td>
		</tr>
		<tr>
			<td>{@html math('S_{shuttle}')}</td>
			<td>Shuttle area ({@html math('mm^2')})</td>
			<td>{sectionAreaShuttleStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{F}')}</td>
			<td>Magnetomotive force (A)</td>
			<td>{magnetomotiveStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{R}')}</td>
			<td>Reluctance ({@html math('H^{-1}')})</td>
			<td>{shuttleReluctanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\varPhi')}</td>
			<td>Magnetic flux ({@html math('H.A')})</td>
			<td>{shuttleMagneticFluxStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_L')}</td>
			<td>Magnetic field in torus ({@html math('T')})</td>
			<td>{shuttleMagneticFieldLStr}</td>
		</tr>
		<tr>
			<td>{@html math('B_{Gair}')}</td>
			<td>Magnetic field in air-gap ({@html math('T')})</td>
			<td>{shuttleMagneticFieldG1Str}</td>
		</tr>
		<tr>
			<td>{@html math('B_{Gshuttle}')}</td>
			<td>Magnetic field in shuttle ({@html math('T')})</td>
			<td>{shuttleMagneticFieldG2Str}</td>
		</tr>
		<tr>
			<td>{@html math('E_m')}</td>
			<td>Magnetic energy ({@html math('J')})</td>
			<td>{shuttleMagneticEnergyStr}</td>
		</tr>
		<tr>
			<td>{@html math('\\mathcal{L}')}</td>
			<td>Inductance ({@html math('H')})</td>
			<td>{shuttleInductanceStr}</td>
		</tr>
		<tr>
			<td>{@html math('F_x')}</td>
			<td>Force ({@html math('N')})</td>
			<td>{shuttleForceStr}</td>
		</tr>
	</table>
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
		margin-bottom: 2rem;
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
		margin-top: 10rem;
	}
</style>
