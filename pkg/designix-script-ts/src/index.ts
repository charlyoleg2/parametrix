#!/usr/bin/env node
// designix-script-ts index.ts

import { make_heliostat_2 } from './make_heliostat_2';
import { make_pole_static } from './make_pole_static';
import { make_rake_stopper } from './make_rake_stopper';

//const outDir = ''; // empty outDir means don't write file
const outDir = 'output';

console.log('start of designix-script-ts');
await make_heliostat_2(outDir, true);
await make_pole_static(outDir, true);
await make_rake_stopper(outDir, true);
console.log('end of designix-script-ts');
