// storePVal.svelte.ts

import type { tParamVal } from 'geometrix';
//import { writable } from 'svelte/store';

type tStorePVal = Record<string, tParamVal>;
const storePV: tStorePVal = $state({});

export type { tStorePVal };
export { storePV };
