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
	Advantages of the reluctance motor:
	<ul>
		<li>no permanent magnet</li>
		<li>consists mostly of soft iron and wiring</li>
		<li>simple mechanics</li>
		<li>also efficient at high speed</li>
		<li>only limited by the electrical power source and electrical switching speed</li>
	</ul>
	Disadvantages of the reluctance motor:
	<ul>
		<li>Advanced electronics</li>
		<li>Requires current sensors and position sensor</li>
	</ul>
</article>
<h2>Magnetic circuits</h2>
<h3>Physical laws</h3>
<article>
	Definitions:
	<ul>
		<li>{@html math('\\mathcal{F}')} : magnetomotive force (unit: {@html math('A')})</li>
		<li>{@html math('\\varPhi')} : magnetic flux (unit: {@html math('Wb')} or {@html math('H.A')} or {@html math('kg.m^2.s^{-2}.A^{-1}')})</li>
		<li>{@html math('\\mathcal{R}')} : reluctance (unit: {@html math('H^{-1}')} or {@html math('kg^{-1}.m^{-2}.s^2.A^2')})</li>
		<li>{@html math('N')} : number of wire loops</li>
		<li>{@html math('i')} : electric current in one wire loops (unit: {@html math('A')})</li>
		<li>{@html math('L')} : length of the magnetic circuit (unit: {@html math('m')})</li>
		<li>{@html math('S')} : area of a section of the magnetic circuit (unit: {@html math('m^2')})</li>
	</ul>
	Laws at macroscopic scale (from integral equations):
	<ul>
		<li>{@html math('\\mathcal{F} = Ni')}</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}}')}</li>
		<li>{@html math('\\mathcal{R} = \\frac{L}{\\mu S} = \\frac{L}{\\mu_r \\mu_0 S}')}</li>
	</ul>
	Laws at microscopic scale (from differential equations):
	<ul>
		<li>{@html math('H = \\frac{\\mathcal{F}}{L} = \\frac{\\varPhi}{\\mu S}')}</li>
		<li>{@html math('B = \\frac{\\varPhi}{S} = \\mu H = \\mu_r \\mu_0 H')}</li>
		<li>{@html math('\\mu = \\mu_r \\mu_0 = \\frac{B}{H}')}</li>
	</ul>
	Electrical circuit:
	<ul>
		<li>{@html math('u')} : electromotive force (unit: {@html math('V')} or {@html math('kg.m^2.s^{-3}.A^{-1}')}})</li>
		<li>{@html math('\\mathcal{L}')} : inductance of a solenoid (unit: {@html math('H')} or {@html math('kg.m^2.s^{-2}.A^{-2}')}})</li>
		<li>{@html math('u = -N \\frac{d \\varPhi}{d t}')}</li>
		<li>if {@html math('\\mathcal{L}')} constant over time
			<ul>
				<li>{@html math('u = -\\mathcal{L} \\frac{d i}{d t}')}</li>
				<li>{@html math('N \\varPhi = \\mathcal{L} i')}</li>
				<li>{@html math('\\mathcal{L} = \\frac{N \\varPhi}{i} = \\frac{N^2}{\\mathcal{R}} = \\frac{\\mu N^2 S}{L}')}</li>
		</ul>
	</ul>
	Energy:
	<ul>
		<li>{@html math('u_m')} : energy density (unit: {@html math('J.m^{-3}')} or {@html math('kg.m^{-1}.s^{-2}')}})</li>
		<li>{@html math('u_m = \\frac{B H}{2} = \\frac{B^2}{2 \\mu} = \\frac{B^2}{2 \\mu_r \\mu_0}')}</li>
		<li>{@html math('E_m')} : energy of a magnetic circuit (unit: {@html math('J')} or {@html math('kg.m^2.s^{-2}')}})</li>
		<li>{@html math('E_m = \\int_V u_m')}</li>
	</ul>
</article>
<h3>Regular torus</h3>
<article>
	<img src="{base}/regular_torus.svg" alt="regular torus" />
	<ul>
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
<article>
	<img src="{base}/torus_with_swelling.svg" alt="torus with swelling" />
	<ul>
		<li>{@html math('\\mathcal{F} = N i')}</li>
		<li>
			{@html math('\\mathcal{R} = \\mathcal{R}_1 + \\mathcal{R}_2 = \\frac{L_1}{\\mu S_1} + \\frac{L_2}{\\mu S_2}')}
			{@html math('= \\frac{L_1 S_2 + L_2 S_1}{\\mu S_1 S_2}')}
		</li>
		<li>{@html math('\\varPhi = \\frac{\\mathcal{F}}{\\mathcal{R}} = \\frac{\\mu S_1 S_2 N i}{L_1 S_2 + L_2 S_1}')}</li>
		<li>
			{@html math('B_1 = \\frac{\\varPhi}{S_1} = \\frac{\\mu S_2 N i}{L_1 S_2 + L_2 S_1}')}
			{@html math('B_2 = \\frac{\\varPhi}{S_2} = \\frac{\\mu S_1 N i}{L_1 S_2 + L_2 S_1}')}
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
<article>
	<img src="{base}/torus_with_air_gap.svg" alt="torus with air gap" />
</article>
<h3>Torus with shuttle</h3>
<article>
	<img src="{base}/torus_with_shuttle.svg" alt="torus with shuttle" />
	<img src="{base}/top_view_of_air_gap_and_shuttle.svg" alt="top view of air gap and shuttle" />
</article>
<h3>Torus with realistic shuttle</h3>
<article>
	<img src="{base}/torus_with_realistic_shuttle.svg" alt="torus with a realistic shuttle" />
</article>

<style lang="scss">
	@use '$lib/style/colors.scss';

	h1 {
		margin: 1rem;
	}
	article {
		margin: 1rem;
	}
</style>
