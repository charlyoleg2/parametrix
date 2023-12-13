#!/usr/bin/env node
// designix-cli.ts

import type { tAllPageDef } from 'geometrix';
import { geom_cli } from 'geomcli';
import {
	gearWheelWheelDef,
	simplifiedGearWheelDef,
	heliostatDef,
	heliostat_2Def,
	baseDef,
	poleStaticDef,
	poleRotorDef,
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
	'heliostat/rake': rakeDef,
	'heliostat/rake_stopper': rakeStopperDef,
	'heliostat/spider': spiderDef,
	'heliostat/swing': swingDef,
	'heliostat/rod': rodDef,
	'heliostat/trapeze': trapezeDef,
	'heliostat/surface': surfaceDef
};

console.log('designix-cli says hello');
geom_cli(process.argv, designList, 'output');
console.log('designix-cli says bye');
