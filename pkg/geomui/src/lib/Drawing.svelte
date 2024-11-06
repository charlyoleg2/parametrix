<script lang="ts">
	import TimeControl from './TimeControl.svelte';
	import ZoomControl from './ZoomControl.svelte';
	import LabelCheckbox from './LabelCheckbox.svelte';
	import type { tCanvasAdjust, tLayers, Figure, tSimTime } from 'geometrix';
	import {
		colors,
		canvas2point,
		adjustCenter,
		adjustRect,
		adjustScale,
		adjustTranslate
	} from 'geometrix';
	import { sDraw } from './stateDrawing.svelte';
	import { onMount } from 'svelte';

	// props
	interface Props {
		pDefSim: tSimTime;
		pFig: Figure;
		simTime?: number;
	}
	let { pDefSim, pFig, simTime = $bindable(0) }: Props = $props();

	// const
	const canvas_size_min = 400;
	const canvas_size_max = 1200;

	// state
	let windowWidth: number = $state(canvas_size_min); // TODO5: $state is not needed, but otherwise svelte complains
	// those internal states are bound: no need of $state
	let domInit = 0;
	let canvasFull: HTMLCanvasElement;
	let canvasZoom: HTMLCanvasElement;

	// Canavas Figures
	let cAdjust: tCanvasAdjust;
	function canvasRedrawFull(iFig: Figure, iLayers: tLayers) {
		if (canvasFull) {
			const ctx1 = canvasFull.getContext('2d')!;
			ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
			try {
				cAdjust = iFig.getAdjustFull(ctx1.canvas.width, ctx1.canvas.height);
				iFig.draw(ctx1, cAdjust, iLayers);
			} catch (emsg) {
				//rGeome.logstr += emsg;
				console.log(emsg);
			}
			// extra drawing
			//point(5, 5).draw(ctx1, cAdjust, 'green');
			//point(5, 15).draw(ctx1, cAdjust, 'blue', 'rectangle');
		}
	}
	function canvasRedrawZoom(iFig: Figure, iZAdjust: tCanvasAdjust, iLayers: tLayers) {
		if (canvasZoom) {
			const ctx2 = canvasZoom.getContext('2d')!;
			ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
			try {
				if (iZAdjust === undefined || iZAdjust.init === 0) {
					iZAdjust = iFig.getAdjustZoom(ctx2.canvas.width, ctx2.canvas.height);
					//console.log(`dbg047: init iZAdjust: ${iZAdjust.xMin} ${iZAdjust.yMin}`);
				}
				iFig.draw(ctx2, iZAdjust, iLayers);
			} catch (emsg) {
				//rGeome.logstr += emsg;
				console.log(emsg);
			}
		}
	}
	function canvasSetSize() {
		//console.log(`windowWidth: ${windowWidth}`);
		const ctxF = canvasFull.getContext('2d')!;
		const ctxZ = canvasZoom.getContext('2d')!;
		const canvas_size = Math.min(Math.max(0.4 * windowWidth, canvas_size_min), canvas_size_max);
		ctxF.canvas.width = canvas_size;
		ctxF.canvas.height = canvas_size;
		ctxZ.canvas.width = canvas_size;
		ctxZ.canvas.height = canvas_size;
	}
	function canvasResize() {
		canvasSetSize();
		canvasRedrawFull(pFig, sDraw.dLayers);
		canvasRedrawZoom(pFig, sDraw.zAdjust, sDraw.dLayers);
	}
	function geomRedraw(iFig: Figure, iZAdjust: tCanvasAdjust, iLayers: tLayers) {
		canvasRedrawFull(iFig, iLayers);
		canvasRedrawZoom(iFig, iZAdjust, iLayers);
	}
	onMount(() => {
		// initial drawing
		canvasSetSize();
		geomRedraw(pFig, sDraw.zAdjust, sDraw.dLayers);
		//paramChange();
		domInit = 1;
	});
	// reactivity on pFig, zAdjust and dLayers
	$effect(() => {
		if (domInit === 1) {
			geomRedraw(pFig, sDraw.zAdjust, sDraw.dLayers);
		}
	});
	// Zoom stories
	function zoomClick(action: string) {
		//console.log(`dbg094: ${action}`);
		switch (action) {
			case 'zoomInit':
				sDraw.zAdjust.init = 0;
				break;
			case 'zoomIn':
				sDraw.zAdjust = adjustScale(0.7, sDraw.zAdjust);
				break;
			case 'zoomOut':
				sDraw.zAdjust = adjustScale(1.3, sDraw.zAdjust);
				break;
			case 'moveLeft':
				sDraw.zAdjust.xMin += -0.2 * sDraw.zAdjust.xyDiff;
				break;
			case 'moveRight':
				sDraw.zAdjust.xMin += 0.2 * sDraw.zAdjust.xyDiff;
				break;
			case 'moveUp':
				sDraw.zAdjust.yMin += 0.2 * sDraw.zAdjust.xyDiff;
				break;
			case 'moveDown':
				sDraw.zAdjust.yMin += -0.2 * sDraw.zAdjust.xyDiff;
				break;
			default:
				console.log(`ERR423: ${action} has no case!`);
		}
		canvasRedrawZoom(pFig, sDraw.zAdjust, sDraw.dLayers);
	}
	// zoom functions on the canvasFull
	interface tMouse {
		timestamp: number;
		offsetX: number;
		offsetY: number;
	}
	const mouseDelayMax = 3000; // only action if mouse-up occurs less than 3000 ms after mouse-down
	const mouseDiffClick = 10; // if diffX and diffY are smaller than 10 pixel then it's a click
	const mouseDiffRatioSelect = 3; // The selection must be more or less a square
	let mouseF: tMouse = { timestamp: 0, offsetX: 0, offsetY: 0 };
	function cFullMouseDn(eve: MouseEvent) {
		//console.log(`dbg131: cFullMouseDn ${eve.offsetX} ${eve.offsetY} ${eve.button}`);
		// left click
		if (eve.button === 0) {
			mouseF.timestamp = Date.now();
			mouseF.offsetX = eve.offsetX;
			mouseF.offsetY = eve.offsetY;
			//const ctx1 = canvasFull.getContext('2d') as CanvasRenderingContext2D;
			//const [px, py] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
			//point(px, py).draw(ctx1, cAdjust, colors.mouse, 'rectangle');
		}
	}
	function cFullMouseUp(eve: MouseEvent) {
		//console.log(`dbg139: cFullMouseUp ${eve.offsetX} ${eve.offsetY} ${eve.button}`);
		// left click
		if (eve.button === 0) {
			//const ctx1 = canvasFull.getContext('2d') as CanvasRenderingContext2D;
			//const [px, py] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
			//point(px, py).draw(ctx1, cAdjust, colors.mouse, 'circle');
			if (Date.now() - mouseF.timestamp < mouseDelayMax) {
				const diffX = Math.abs(mouseF.offsetX - eve.offsetX);
				const diffY = Math.abs(mouseF.offsetY - eve.offsetY);
				if (diffX < mouseDiffClick && diffY < mouseDiffClick) {
					//console.log(`dbg160: a click at ${eve.offsetX} ${eve.offsetY}`);
					const [px, py] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
					sDraw.zAdjust = adjustCenter(px, py, sDraw.zAdjust);
					geomRedraw(pFig, sDraw.zAdjust, sDraw.dLayers);
				}
				if (diffX > mouseDiffClick && diffY > mouseDiffClick) {
					const diffRatio1 = diffX / diffY;
					const diffRatio2 = 1.0 / diffRatio1;
					if (diffRatio1 < mouseDiffRatioSelect && diffRatio2 < mouseDiffRatioSelect) {
						//console.log(`dbg160: a selection at ${eve.offsetX} ${eve.offsetY}`);
						const [p1x, p1y] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
						const [p2x, p2y] = canvas2point(mouseF.offsetX, mouseF.offsetY, cAdjust);
						sDraw.zAdjust = adjustRect(
							p1x,
							p1y,
							p2x,
							p2y,
							canvas_size_min,
							canvas_size_min
						);
						geomRedraw(pFig, sDraw.zAdjust, sDraw.dLayers);
					}
				}
			} else {
				console.log(`Warn205: ignore ${eve.offsetX} ${eve.offsetY} because too slow`);
			}
		}
	}
	// just drawing a rectangle to help zooming
	function cFullMouseMove(eve: MouseEvent) {
		//console.log(`dbg179: cFullMouseMove ${eve.offsetX} ${eve.offsetY} ${eve.buttons}`);
		if (canvasFull) {
			const ctx1 = canvasFull.getContext('2d')!;
			// left click
			if (eve.buttons === 1) {
				const diffX = eve.offsetX - mouseF.offsetX;
				const diffY = eve.offsetY - mouseF.offsetY;
				canvasRedrawFull(pFig, sDraw.dLayers);
				//const ctx1 = canvasFull.getContext('2d') as CanvasRenderingContext2D;
				ctx1.beginPath();
				ctx1.rect(mouseF.offsetX, mouseF.offsetY, diffX, diffY);
				ctx1.strokeStyle = colors.mouse;
				ctx1.stroke();
			}
			// mouse position
			if (sDraw.dLayers.ruler) {
				const [p1x, p1y] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
				ctx1.clearRect(5, 5, 200, 25);
				ctx1.font = '15px Arial';
				ctx1.fillStyle = colors.ruler;
				ctx1.fillText(`x: ${p1x.toFixed(4)} y: ${p1y.toFixed(4)}`, 5, 20);
			}
		}
	}
	// translate Zoom drawing
	let mouseZx: number;
	let mouseZy: number;
	let mouseZadjust: tCanvasAdjust;
	function cZoomMouseDn(eve: MouseEvent) {
		//console.log(`dbg231: cZoomMouseDn ${eve.offsetX} ${eve.offsetY} ${eve.button}`);
		// left click
		if (eve.button === 0) {
			const [p1x, p1y] = canvas2point(eve.offsetX, eve.offsetY, sDraw.zAdjust);
			mouseZx = p1x; // point
			mouseZy = p1y;
			mouseZadjust = structuredClone(sDraw.zAdjust); // deepCopy
			//const ctx2 = canvasZoom.getContext('2d') as CanvasRenderingContext2D;
			//const [px, py] = canvas2point(eve.offsetX, eve.offsetY, cAdjust);
			//point(px, py).draw(ctx2, cAdjust, colors.mouse, 'rectangle');
		}
	}
	function cZoomMouseMove(eve: MouseEvent) {
		//console.log(`dbg202: cZoomMouseMove ${eve.offsetX} ${eve.offsetY} ${eve.buttons}`);
		// left click
		if (eve.buttons === 1) {
			const [p2x, p2y] = canvas2point(eve.offsetX, eve.offsetY, mouseZadjust);
			sDraw.zAdjust = adjustTranslate(mouseZx, mouseZy, p2x, p2y, mouseZadjust);
			canvasRedrawZoom(pFig, sDraw.zAdjust, sDraw.dLayers);
		} else {
			// mouse position
			if (sDraw.dLayers.ruler && canvasZoom) {
				const ctx2 = canvasZoom.getContext('2d')!;
				const [p2x, p2y] = canvas2point(eve.offsetX, eve.offsetY, sDraw.zAdjust);
				ctx2.clearRect(5, 5, 200, 25);
				ctx2.font = '15px Arial';
				ctx2.fillStyle = colors.ruler;
				ctx2.fillText(`x: ${p2x.toFixed(4)} y: ${p2y.toFixed(4)}`, 5, 20);
			}
		}
	}
	function cZoomWheel(eve: WheelEvent) {
		eve.preventDefault();
		if (eve.deltaY > 0) {
			sDraw.zAdjust = adjustScale(0.7, sDraw.zAdjust);
		} else {
			sDraw.zAdjust = adjustScale(1.3, sDraw.zAdjust);
		}
		canvasRedrawZoom(pFig, sDraw.zAdjust, sDraw.dLayers);
	}
</script>

<svelte:window bind:innerWidth={windowWidth} onresize={canvasResize} />
<section>
	<LabelCheckbox />
	<div class="rack">
		<canvas
			class="full"
			width={canvas_size_min}
			height={canvas_size_min}
			bind:this={canvasFull}
			onmousedown={cFullMouseDn}
			onmouseup={cFullMouseUp}
			onmousemove={cFullMouseMove}
		></canvas>
		<TimeControl
			tMax={pDefSim.tMax}
			tStep={pDefSim.tStep}
			tUpdate={pDefSim.tUpdate}
			bind:simTime
		/>
	</div>
	<div class="rack">
		<canvas
			class="zoom"
			width={canvas_size_min}
			height={canvas_size_min}
			bind:this={canvasZoom}
			onmousedown={cZoomMouseDn}
			onmousemove={cZoomMouseMove}
			onwheel={cZoomWheel}
		></canvas>
		<ZoomControl {zoomClick} />
	</div>
</section>

<style lang="scss">
	@use './style/colors.scss';
	@use './style/styling.scss';

	section > div.rack {
		display: inline-block;
		margin: 0 1rem 0;
		text-align: center;
	}
	section > div.rack > canvas {
		//display: block;
		background-color: colors.$pde-canvas;
		margin: 0.2rem;
	}
</style>
