#!/usr/bin/env node
// designix-script-js index.js

import { make_heliostat_2 } from './make_heliostat_2.js';
import { make_pole_static } from './make_pole_static.js';
import { make_rake_stopper } from './make_rake_stopper.js';
import { make_swing } from './make_swing.js';
import { make_surface } from './make_surface.js';

//const outDir = ''; // empty outDir means don't write file
const outDir = 'output';

console.log('start of designix-script-ts');
await make_heliostat_2(outDir, true);
await make_pole_static(outDir, true);
await make_rake_stopper(outDir, true);
await make_swing(outDir, true);
await make_surface(outDir, true);
console.log('end of designix-script-ts');
