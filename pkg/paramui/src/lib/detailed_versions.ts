// detailes_versions.ts

import { version_details } from 'geometrix';
import appPackage from '../../package.json';

const detailed_versions = version_details(appPackage);

export { detailed_versions };
