// stateParams.svelte.ts

import type { tParamVal } from 'geometrix';

type tStateParams = Record<string, tParamVal>;
const sParams: tStateParams = $state({});

export type { tStateParams };
export { sParams };
