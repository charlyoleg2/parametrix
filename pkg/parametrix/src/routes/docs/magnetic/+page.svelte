<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { base } from '$app/paths';
	import { math } from 'mathlifier';
</script>

<h1>Magnetic circuit</h1>
<article>
	In this page, we study several magnetic circuits in order to modelize the reluctance motor.
</article>
<h2>The reluctance motor</h2>
<article>
	The force exercised by a electrical reluctance motor is due to the minimization of the magnetic energy of the magnetic circuit.
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
		<li>{@html math('\\varPhi')} : magnetic flux (unit: {@html math('Wb')} or {@html math('H.A')} or {@html math('kg.m^2.s^{-2}.A^{-1}')})</li>
		<li>{@html math('\\mathcal{R}')} : reluctance (unit: {@html math('H^{-1}')} or {@html math('kg^{-1}.m^{-2}.s^2.A^2')})</li>
		<li>{@html math('N')} : number of wire loops</li>
		<li>{@html math('i')} : electric current in one wire loops (unit: {@html math('A')})</li>
		<li>{@html math('L')} : length of the magnetic circuit (unit: {@html math('m')})</li>
		<li>{@html math('S')} : area of a section of the magnetic circuit (unit: {@html math('m^2')})</li>
		<li>{@html math('H')} : magnetizing field (unit: {@html math('A.m^{-1}')})</li>
		<li>{@html math('B')} : magnetic flux density (unit: {@html math('T')} or {@html math('kg.s^{-2}.A^{-1}')})</li>
		<li>{@html math('\\mu')} : magnetic permeability (unit: {@html math('H.m^{-1}')} or {@html math('kg.m.s^{-2}.A^{-2}')})</li>
		<li>{@html math('\\mu_0')} : vacuum magnetic permeability : {@html math('\\mu_0 = 1.256 \\times 10^{-6} H.m^{-1}')}</li>
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
		<li>{@html math('u_m')} : magnetic energy density (unit: {@html math('J.m^{-3}')} or {@html math('kg.m^{-1}.s^{-2}')})</li>
		<li>{@html math('u_m = \\frac{B H}{2} = \\frac{B^2}{2 \\mu} = \\frac{B^2}{2 \\mu_r \\mu_0}')}</li>
		<li>{@html math('E_m')} : energy of a magnetic circuit (unit: {@html math('J')} or {@html math('kg.m^2.s^{-2}')})</li>
		<li>{@html math('E_m = \\int_V u_m')}</li>
	</ul>
	<h4>Electrical circuit:</h4>
	<ul class="formula">
		<li>{@html math('e')} : electromotive force of a turn (unit: {@html math('V')} or {@html math('kg.m^2.s^{-3}.A^{-1}')})</li>
		<li>{@html math('u')} : electromotive force of the winding (unit: {@html math('V')} or {@html math('kg.m^2.s^{-3}.A^{-1}')})</li>
		<li>{@html math('\\mathcal{L}')} : inductance of a solenoid (unit: {@html math('H')} or {@html math('kg.m^2.s^{-2}.A^{-2}')})</li>
		<li>{@html math('e = -\\frac{d \\varPhi}{d t}')}</li>
		<li>{@html math('u = N e = -N \\frac{d \\varPhi}{d t}')}</li>
		<li>if {@html math('\\mathcal{R}')} constant over time
			<ul class="formula">
				<li>{@html math('u = -\\frac{N^2}{\\mathcal{R}} \\frac{d i}{d t}')}</li>
				<li>Let's define {@html math('\\mathcal{L} = \\frac{N^2}{\\mathcal{R}}')}</li>
				<li>{@html math('\\mathcal{L} = \\frac{N^2}{\\mathcal{R}} = \\frac{N \\varPhi}{i} = \\frac{\\mu N^2 S}{L}')}</li>
				<li>{@html math('u = -\\mathcal{L} \\frac{d i}{d t}')}</li>
				<li>{@html math('N \\varPhi = \\mathcal{L} i')}</li>
				<li>{@html math('E_m = \\int_{Time} i u = \\int_{Time} i \\mathcal{L} \\frac{d i}{d t} = \\frac{\\mathcal{L} i^2}{2}')}</li>
		</ul>
	</ul>
</article>
<h3>Regular torus</h3>
<article class="splitable">
	<img src="{base}/regular_torus.svg" alt="regular torus" />
	<ul class="formula">
		<li>{@html math('L = 2 \\pi R')} (length of the torus)</li>
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>{@html math('\\mathcal{R} = \\frac{L}{\\mu S}')}</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu S N i}{L}')}</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\frac{\\mu N i}{L}')}</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_V u_m')}
			{@html math('= \\int_V \\frac{B^2}{2 \\mu}')}
			{@html math('= \\frac{B^2}{2 \\mu} L S')}
			{@html math('= \\frac{\\mu S N^2 i^2}{2 L}')}
			{@html math('= \\frac{\\mathcal{L} i^2}{2}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{\\mu S N^2}{L} = \\frac{\\mu_r \\mu_0 S N^2}{L}')}</li>
	</ul>
</article>
<h3>Torus with swelling</h3>
<article class="splitable">
	<img src="{base}/torus_with_swelling.svg" alt="torus with swelling" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			{@html math('\\mathcal{R} = \\mathcal{R}_1 + \\mathcal{R}_2 = \\frac{L_1}{\\mu S_1} + \\frac{L_2}{\\mu S_2}')}
			{@html math('= \\frac{L_1 S_2 + L_2 S_1}{\\mu S_1 S_2}')}
		</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu S_1 S_2 N i}{L_1 S_2 + L_2 S_1}')}</li>
		<li>
			<ul class="formula">
				<li>{@html math('B_1 = \\frac{\\varPhi}{S_1} = \\frac{\\mu S_2 N i}{L_1 S_2 + L_2 S_1}')}</li>
				<li>{@html math('B_2 = \\frac{\\varPhi}{S_2} = \\frac{\\mu S_1 N i}{L_1 S_2 + L_2 S_1}')}</li>
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
</article>
<h3>Torus with air gap</h3>
<article class="splitable">
	<img src="{base}/torus_with_air_gap.svg" alt="torus with air gap" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			{@html math('\\mathcal{R} = \\mathcal{R}_L + \\mathcal{R}_G = \\frac{L}{\\mu_r \\mu_0 S} + \\frac{G}{\\mu_0 S}')}
			{@html math('= \\frac{L + \\mu_r G}{\\mu_r \\mu_0 S}')}
		</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu_r \\mu_0 S N i}{L + \\mu_r G}')}</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\frac{\\mu_r \\mu_0 N i}{L + \\mu_r G}')}</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_V \\frac{B^2}{2 \\mu}')}
			{@html math('= \\int_{V_1} \\frac{B^2}{2 \\mu_r \\mu_0} + \\int_{V_2} \\frac{B^2}{2 \\mu_0}')}
			{@html math('= \\frac{B^2}{2 \\mu_r \\mu_0} L S + \\frac{B^2}{2 \\mu_0} G S')}
			{@html math('= \\frac{B^2 S}{2 \\mu_r \\mu0}(L + \\mu_r G)')}
			{@html math('= \\frac{\\mu_r \\mu_0 S N^2 i^2}{2 (L + \\mu_r G)}')}
		</li>
		<li>{@html math('\\mathcal{L} = \\frac{\\mu_r \\mu_0 S N^2}{L + \\mu_r G}')}</li>
	</ul>
</article>
<h3>Torus with shuttle</h3>
<article class="splitable">
	<img src="{base}/torus_with_shuttle.svg" alt="torus with shuttle" />
	<img src="{base}/top_view_of_air_gap_and_shuttle.svg" alt="top view of air gap and shuttle" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			<ul class="formula">
				<li>{@html math('\\mathcal{R} = \\mathcal{R}_L + \\frac{1}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}')}</li>
				<li>{@html math('\\mathcal{R}_L = \\frac{L}{\\mu_r \\mu_0 A B}')}</li>
				<li>{@html math('\\mathcal{R}_{G1} = \\frac{G}{\\mu_0 x B}')}</li>
				<li>{@html math('\\mathcal{R}_{G2} = \\frac{G}{\\mu_r \\mu_0 (A - x) B}')}</li>
				<li>
					{@html math('\\mathcal{R} = \\frac{x L (1 - \\mu_r) + \\mu_r A (L + G)}{\\mu_r \\mu_0 A B (x (1 - \\mu_r) + \\mu_r A)}')}
				</li>
				<li>{@html math('\\mathcal{R}_{x=0} = \\frac{L + G}{\\mu_r \\mu_0 A B}')}</li>
				<li>{@html math('\\mathcal{R}_{x=A} = \\frac{L (1 + \\mu_r  G)}{\\mu_r \\mu_0 A B} > \\mathcal{R}_{x=0}')}</li>
			</ul>
		</li>
		<li>
			{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}
			{@html math('= \\frac{\\mu_r \\mu_0 A B N i (x (1 - \\mu_r) + \\mu_r A)}{x L (1 - \\mu_r) + \\mu_r A (L + G)}')}
		</li>
		<li>
			<ul class="formula">
				<li>
					{@html math('B_L = \\frac{\\varPhi}{A B}')}
					{@html math('= \\frac{\\mu_r \\mu_0 N i (x (1 - \\mu_r) + \\mu_r A)}{x L (1 - \\mu_r) + \\mu_r A (L + G)}')}
				</li>
				<li>
					{@html math('B_{G1} = \\frac{\\varPhi}{x B}')}
					{@html math('\\frac{\\frac{1}{\\mathcal{R}_{G1}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}')}
					{@html math('= \\frac{\\varPhi}{x B} \\frac{\\mathcal{R}_{G2}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}')}
				</li>
				<li>
					{@html math('B_{G2} = \\frac{\\varPhi}{(A - x) B}')}
					{@html math('\\frac{\\frac{1}{\\mathcal{R}_{G2}}}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}')}
					{@html math('= \\frac{\\varPhi}{(A - x) B} \\frac{\\mathcal{R}_{G1}}{\\mathcal{R}_{G2} + \\mathcal{R}_{G1}}')}
				</li>
			</ul>
		</li>
		<li>
			{@html math('E_m')}
			{@html math('= \\int_{V_L} \\frac{B_L^2}{2 \\mu_r \\mu_0}')}
			{@html math('+ \\int_{V_{G1}} \\frac{B_{G1}^2}{2 \\mu_0}')}
			{@html math('+ \\int_{V_{G2}} \\frac{B_{G2}^2}{2 \\mu_r \\mu_0}')}
		</li>
		<li>{@html math('\\mathcal{L} =')}</li>
	</ul>
</article>
<h3>Torus with realistic shuttle</h3>
<article class="splitable">
	<img src="{base}/torus_with_realistic_shuttle.svg" alt="torus with a realistic shuttle" />
	<ul class="formula">
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			<ul class="formula">
				<li>{@html math('\\mathcal{R} = \\mathcal{R}_L + \\mathcal{R}_H + \\frac{1}{\\frac{1}{\\mathcal{R}_{G1}} + \\frac{1}{\\mathcal{R}_{G2}}}')}</li>
				<li>{@html math('\\mathcal{R}_L = \\frac{L}{\\mu_r \\mu_0 A B}')}</li>
				<li>{@html math('\\mathcal{R}_{G1} = \\frac{G}{\\mu_0 x B}')}</li>
				<li>{@html math('\\mathcal{R}_{G2} = \\frac{G}{\\mu_r \\mu_0 (A - x) B}')}</li>
				<li>{@html math('\\mathcal{R}_H = \\frac{H}{ \\mu_0 A B}')}</li>
			</ul>
		</li>
		<li>
			{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}
		</li>
	</ul>
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
		margin-bottom: 0.2rem;
	}
	h2, h3 {
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
</style>
