#!/usr/bin/env node
// designix-script-ts index.ts

import { make_heliostat_2 } from './make_heliostat_2';

console.log('start of designix-script-ts');
await make_heliostat_2();
console.log('end of designix-script-ts');
