// drawingLayers.svelte.ts

//import type { tLayers } from 'geometrix';
import { initLayers } from 'geometrix';
//import { writable } from 'svelte/store';

const dLayers = $state(initLayers());

export { dLayers };
