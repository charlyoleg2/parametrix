// designList.ts

import type { tDesignList } from './designListType';
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

const designList: tDesignList = {
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
	'heliostat/surface': surfaceDef,
	}

export { designList };
