// designList.ts

import type { tAllPageDef } from 'geometrix';
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
	surfaceDef,
	circlesDef,
	rectangleDef,
	dummyPoleStaticDef
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
	'heliostat/surface': surfaceDef,
	'dummy/circles': circlesDef,
	'dummy/rectangle': rectangleDef,
	'dummy/pole_static': dummyPoleStaticDef
};

export { designList };
