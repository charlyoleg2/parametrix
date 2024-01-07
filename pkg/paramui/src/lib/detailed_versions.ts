// detailes_versions.ts

import { version_details } from 'geometrix';
//import appPackage from '../../../package.json';

const appPackage = {
	name: 'appAbc',
	version: '1.2.3',
	dependencies: {
		babaorum: '^2.3.4',
		petibonum: '^9.8.7'
	}
};

const detailed_versions = version_details(appPackage);

export { detailed_versions };
