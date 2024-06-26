// designList.ts

import type { tAllPageDef } from 'geometrix';
import {
	gearWheelWheelDef,
	simplifiedGearWheelDef,
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
	'gear/gear_wheel_wheel': gearWheelWheelDef,
	'gear/simplified_gear_wheel': simplifiedGearWheelDef,
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

export { designList };
