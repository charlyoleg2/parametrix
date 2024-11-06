<script lang="ts">
	import type { tCanvasAdjust, tLayers, Figure } from 'geometrix';
	import { copyLayers } from 'geometrix';
	import { sDraw } from './stateDrawing.svelte';

	// props
	interface Props {
		pFig: Figure;
		zAdjust: tCanvasAdjust;
	}
	let { pFig, zAdjust }: Props = $props();

	// const
	const canvas_size_mini = 200;
	const scaleFactor = 0.6;

	// internal state: no need of reactivity with $state()
	let canvasMini: HTMLCanvasElement;

	// Canavas Figures
	function canvasRedrawMini(aFigure: Figure, iZAdjust: tCanvasAdjust, iLayers: tLayers) {
		const sLayers = copyLayers(iLayers);
		sLayers.ruler = false;
		let mAdjust: tCanvasAdjust;
		if (canvasMini) {
			const ctx1 = canvasMini.getContext('2d')!;
			ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
			try {
				if (iZAdjust.init === 0) {
					// mini-full with zAdjust set to adjustZero()
					mAdjust = aFigure.getAdjustFull(ctx1.canvas.width, ctx1.canvas.height);
				} else {
					mAdjust = iZAdjust;
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
	}
	// reactivity
	$effect(() => {
		canvasRedrawMini(pFig, zAdjust, sDraw.dLayers);
	});
	// actions
	function clickQuater(eve: MouseEvent) {
		const mouseX = eve.offsetX;
		const mouseY = eve.offsetY;
		const ctx1 = canvasMini.getContext('2d')!;
		const quaterX = ctx1.canvas.width / 2;
		const quaterY = ctx1.canvas.height / 2;
		if (eve.button === 0) {
			// pressing the main button
			let quaterID = 1;
			if (mouseX > quaterX) {
				quaterID += 1 * scaleFactor;
			}
			if (mouseY > quaterY) {
				quaterID += 2 * scaleFactor;
			}
			ctx1.canvas.width = quaterID * canvas_size_mini;
			ctx1.canvas.height = quaterID * canvas_size_mini;
			canvasRedrawMini(pFig, zAdjust, sDraw.dLayers);
		}
	}
</script>

<canvas
	class="mini"
	width={canvas_size_mini}
	height={canvas_size_mini}
	bind:this={canvasMini}
	onclick={clickQuater}
></canvas>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

	canvas {
		background-color: colors.$pde-canvas;
	}
</style>
