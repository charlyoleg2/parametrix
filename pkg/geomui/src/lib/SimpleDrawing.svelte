<script lang="ts">
	//import { colors } from 'geometrix';
	import type { tCanvasAdjust, tLayers, Figure, tParamVal, tGeomFunc } from 'geometrix';
	import { copyLayers, mergeFaces } from 'geometrix';
	import { storePV } from './storePVal';
	import { dLayers } from './drawingLayers';
	import { onMount } from 'svelte';

	export let pageName: string;
	export let fgeom: tGeomFunc;
	export let selFace: string;
	export let zAdjust: tCanvasAdjust;
	export let simTime = 0;

	let canvasMini: HTMLCanvasElement;
	const canvas_size_mini = 200;

	// Canavas Figures
	let mAdjust: tCanvasAdjust;
	function canvasRedrawMini(aFigure: Figure, iLayers: tLayers) {
		const sLayers = copyLayers(iLayers);
		sLayers.ruler = false;
		const ctx1 = canvasMini.getContext('2d')!;
		ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
		try {
			if (zAdjust.init === 0) {
				// mini-full with zAdjust set to adjustZero()
				mAdjust = aFigure.getAdjustFull(ctx1.canvas.width, ctx1.canvas.height);
			} else {
				mAdjust = zAdjust;
			}
			aFigure.draw(ctx1, mAdjust, sLayers);
		} catch (emsg) {
			//rGeome.logstr += emsg;
			console.log(emsg);
		}
		// extra drawing
		//point(5, 5).draw(ctx1, mAdjust, 'green');
		//point(5, 15).draw(ctx1, mAdjust, 'blue', 'rectangle');
	}
	let domInit = 0;
	function geomRedraw(iSimTime: number, ipVal: tParamVal, iFace: string, iLayers: tLayers) {
		const FigList = fgeom(iSimTime, ipVal).fig;
		if (Object.keys(FigList).includes(iFace)) {
			const aFigure = FigList[iFace];
			canvasRedrawMini(aFigure, iLayers);
		} else {
			const aFigure = mergeFaces(FigList);
			canvasRedrawMini(aFigure, iLayers);
		}
	}
	onMount(() => {
		// initial drawing
		geomRedraw(simTime, $storePV[pageName], selFace, $dLayers);
		domInit = 1;
		//paramChange();
	});
	// reactivity on simTime and $storePV
	$: {
		if (domInit === 1) {
			geomRedraw(simTime, $storePV[pageName], selFace, $dLayers);
		}
	}
</script>

<canvas class="mini" width={canvas_size_mini} height={canvas_size_mini} bind:this={canvasMini} />

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

	canvas {
		background-color: colors.$pde-canvas;
	}
</style>
