// drawingLayers.ts

//import type { tLayers } from 'geometrix';
import { initLayers } from 'geometrix';
import { writable } from 'svelte/store';

const dLayers = writable(initLayers());

export { dLayers };
