// designList.ts

import type { tAllPageDef } from 'geometrix';
import {
	gearWheelWheelDef,
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
	surfaceDef,
	circlesDef,
	rectangleDef,
	dummyPoleStaticDef
} from 'designix';

const designList: tAllPageDef = {
	'gear/gear_wheel_wheel': gearWheelWheelDef,
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
	'heliostat/surface': surfaceDef,
	'dummy/circles': circlesDef,
	'dummy/rectangle': rectangleDef,
	'dummy/pole_static': dummyPoleStaticDef
};

export { designList };
