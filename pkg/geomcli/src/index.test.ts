import { describe, it, expect } from 'vitest';
import { write_geom } from './index';

describe('geomcli index suit', () => {
	it('write_geom', () => {
		expect(write_geom()).toBeUndefined();
	});
});
