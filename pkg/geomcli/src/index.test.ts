import { describe, it, expect } from 'vitest';
import { geom_cli } from './index';
import type { tAllPageDef } from 'geometrix';

import { heliostatDef, swingDef } from 'designix';

const designList: tAllPageDef = {
	'heliostat/heliostat': heliostatDef,
	'heliostat/swing': swingDef
};

const appPackage = {
	name: 'appAbc',
	version: '1.2.3',
	dependencies: {
		babaorum: '^2.3.4',
		petibonum: '^9.8.7'
	}
};

describe('geomcli index suit', () => {
	it('geom_cli', async () => {
		await expect(
			geom_cli(['node', 'dummy', 'list'], designList, appPackage)
		).resolves.toBeUndefined();
	});
});
