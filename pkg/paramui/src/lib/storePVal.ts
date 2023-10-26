// storePVal.ts

import type { tParamVal } from 'geometrix';
import { writable } from 'svelte/store';

type tStorePVal = Record<string, tParamVal>;
const storePV = writable({} as tStorePVal);

export type { tStorePVal };
export { storePV };
