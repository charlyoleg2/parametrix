#!/usr/bin/env node
// designix-cli.ts

import type { tAllPageDef } from 'geometrix';
//import type { tPackage } from 'geomcli';
import { geom_cli } from 'geomcli';
import packag from '../package.json';
import {
	gearWheelDef,
	gearBarDef,
	gearRingDef,
	gearEpicycloidDef,
	heliostatDef,
	heliostat_2Def,
	baseDef,
	poleStaticDef,
	vaxisDef,
	ringDef,
	vaxisHolderDef,
	ringGuidanceDef,
	vaxisGuidanceDef,
	rakeDef,
	rakeStopperDef,
	haxisGuidanceDef,
	spiderDef,
	swingDef,
	rodDef,
	trapezeDef,
	surfaceDef
} from 'designix';

const designList: tAllPageDef = {
	'gear/gear_wheel': gearWheelDef,
	'gear/gear_bar': gearBarDef,
	'gear/gear_ring': gearRingDef,
	'gear/gear_epicycloid': gearEpicycloidDef,
	'heliostat/heliostat': heliostatDef,
	'heliostat/heliostat_2': heliostat_2Def,
	'heliostat/base': baseDef,
	'heliostat/pole_static': poleStaticDef,
	'heliostat/vaxis': vaxisDef,
	'heliostat/ring': ringDef,
	'heliostat/vaxis_holder': vaxisHolderDef,
	'heliostat/ring_guidance': ringGuidanceDef,
	'heliostat/vaxis_guidance': vaxisGuidanceDef,
	'heliostat/rake': rakeDef,
	'heliostat/rake_stopper': rakeStopperDef,
	'heliostat/haxis_guidance': haxisGuidanceDef,
	'heliostat/spider': spiderDef,
	'heliostat/swing': swingDef,
	'heliostat/rod': rodDef,
	'heliostat/trapeze': trapezeDef,
	'heliostat/surface': surfaceDef
};

//console.log('designix-cli says hello');
await geom_cli(process.argv, designList, packag, 'output');
//console.log('designix-cli says bye');
