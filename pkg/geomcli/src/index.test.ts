import { describe, it, expect } from 'vitest';
import { geom_cli } from './index';
import type { tAllPageDef } from 'geometrix';

import { heliostatDef, swingDef } from 'designix';

const designList: tAllPageDef = {
	'heliostat/heliostat': heliostatDef,
	'heliostat/swing': swingDef
};

describe('geomcli index suit', () => {
	it('geom_cli', async () => {
		await expect(geom_cli(['node', 'dummy', 'list'], designList)).resolves.toBeUndefined();
	});
});
