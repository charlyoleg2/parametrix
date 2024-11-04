// stateDrawing.svelte.ts

import type { tLayers, tCanvasAdjust } from 'geometrix';
import { initLayers, adjustZero } from 'geometrix';

interface tStateDrawing {
	dLayers: tLayers;
	zAdjust: tCanvasAdjust;
}

const sDraw: tStateDrawing = $state({
	dLayers: initLayers(),
	zAdjust: adjustZero()
});

export { sDraw };
