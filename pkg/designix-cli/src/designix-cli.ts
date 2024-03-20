#!/usr/bin/env node
// designix-cli.ts

import type { tAllPageDef } from 'geometrix';
//import type { tPackage } from 'geomcli';
import { geom_cli } from 'geomcli';
import packag from '../package.json';
import {
	gearWheelWheelDef,
	simplifiedGearWheelDef,
	heliostatDef,
	heliostat_2Def,
	baseDef,
	poleStaticDef,
	poleRotorDef,
	ringDef,
	poleHolderDef,
	ringGuidanceDef,
	rakeDef,
	rakeStopperDef,
	spiderDef,
	swingDef,
	rodDef,
	trapezeDef,
	surfaceDef
} from 'designix';

const designList: tAllPageDef = {
	'gear/gear_wheel_wheel': gearWheelWheelDef,
	'gear/simplified_gear_wheel': simplifiedGearWheelDef,
	'heliostat/heliostat': heliostatDef,
	'heliostat/heliostat_2': heliostat_2Def,
	'heliostat/base': baseDef,
	'heliostat/pole_static': poleStaticDef,
	'heliostat/pole_rotor': poleRotorDef,
	'heliostat/ring': ringDef,
	'heliostat/pole_holder': poleHolderDef,
	'heliostat/ring_guidance': ringGuidanceDef,
	'heliostat/rake': rakeDef,
	'heliostat/rake_stopper': rakeStopperDef,
	'heliostat/spider': spiderDef,
	'heliostat/swing': swingDef,
	'heliostat/rod': rodDef,
	'heliostat/trapeze': trapezeDef,
	'heliostat/surface': surfaceDef
};

//console.log('designix-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('designix-cli says bye');
