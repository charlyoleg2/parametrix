// menuList.ts

import type { tMenuList } from './menuListType';
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
	surfaceDef,
	circlesDef,
	rectangleDef,
	voilaDef,
	verifyPoint1Def,
	verifyPoint2Def,
	verifyLine1Def,
	verifyLine2Def,
	verifyLine3Def,
	verifyVector1Def,
	verifyContour1Def,
	verifyContour2Def,
	verifyContour3Def,
	verifyContour4Def,
	verifyExports1Def
} from 'designix';

const apidocPath = '/docs/apidoc/';

const menuList: tMenuList = [
	{
		category: '',
		pages: [{ path: '/', page: null, svg: 'page_index.svg' }]
	},
	{
		category: 'Gears',
		pages: [
			{ path: '/gear/gear_wheel', page: gearWheelDef, svg: 'page_gearwheel.svg' },
			{ path: '/gear/gear_bar', page: gearBarDef, svg: 'page_gearbar.svg' },
			{ path: '/gear/gear_ring', page: gearRingDef, svg: 'page_gearring.svg' },
			{ path: '/gear/gear_epicycloid', page: gearEpicycloidDef, svg: 'page_epicycloid.svg' }
		]
	},
	{
		category: 'Heliostat',
		pages: [
			{ path: '/heliostat/heliostat', page: heliostatDef, svg: 'page_heliostat.svg' },
			{ path: '/heliostat/heliostat_2', page: heliostat_2Def, svg: 'page_heliostat.svg' },
			{ path: '/heliostat/base', page: baseDef, svg: 'page_base.svg' },
			{ path: '/heliostat/pole_static', page: poleStaticDef, svg: 'page_pole_static.svg' },
			{ path: '/heliostat/vaxis', page: vaxisDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/ring', page: ringDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/vaxis_holder', page: vaxisHolderDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/ring_guidance', page: ringGuidanceDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/vaxis_guidance', page: vaxisGuidanceDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/rake', page: rakeDef, svg: 'page_rake.svg' },
			{ path: '/heliostat/rake_stopper', page: rakeStopperDef, svg: 'page_rake.svg' },
			{ path: '/heliostat/haxis_guidance', page: haxisGuidanceDef, svg: 'page_vaxis.svg' },
			{ path: '/heliostat/spider', page: spiderDef, svg: 'page_spider.svg' },
			{ path: '/heliostat/swing', page: swingDef, svg: 'page_swing.svg' },
			{ path: '/heliostat/rod', page: rodDef, svg: 'page_rod.svg' },
			{ path: '/heliostat/trapeze', page: trapezeDef, svg: 'page_trapeze.svg' },
			{ path: '/heliostat/surface', page: surfaceDef, svg: 'page_surface.svg' }
		]
	},
	{
		category: 'Junk designs',
		pages: [
			{ path: '/junk/circles', page: circlesDef, svg: 'page_circles.svg' },
			{ path: '/junk/rectangle', page: rectangleDef, svg: 'page_rectangle.svg' },
			{ path: '/junk/voila', page: voilaDef, svg: 'page_rectangle.svg' }
		]
	},
	{
		category: 'Geometrix verification',
		pages: [
			{ path: '/dev/verify_point', page: verifyPoint1Def, svg: 'page_verify_point.svg' },
			{ path: '/dev/verify_point_2', page: verifyPoint2Def, svg: 'page_verify_point.svg' },
			{ path: '/dev/verify_line', page: verifyLine1Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_line_2', page: verifyLine2Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_line_3', page: verifyLine3Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_vector', page: verifyVector1Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_contour_1', page: verifyContour1Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_contour_2', page: verifyContour2Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_contour_3', page: verifyContour3Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_contour_4', page: verifyContour4Def, svg: 'page_verify_line.svg' },
			{ path: '/dev/verify_exports_1', page: verifyExports1Def, svg: 'page_verify_line.svg' }
		]
	},
	{
		category: 'Dynamic design import',
		pages: [{ path: '/import', page: null, svg: 'page_about.svg' }]
	},
	{
		category: 'Docs',
		pages: [
			{ path: apidocPath, page: null, svg: 'page_about.svg' },
			{ path: '/docs/readme', page: null, svg: 'page_readme.svg' },
			{ path: '/docs/concept', page: null, svg: 'page_concept.svg' },
			{ path: '/docs/geom-dev', page: null, svg: 'page_geom.svg' },
			{ path: '/docs/geom-user', page: null, svg: 'page_geom.svg' },
			{ path: '/docs/geom-tutorial', page: null, svg: 'page_geom.svg' },
			{ path: '/docs/ui', page: null, svg: 'page_ui.svg' },
			{ path: '/docs/lists', page: null, svg: 'page_geom.svg' },
			{ path: '/docs/prez', page: null, svg: 'page_concept.svg' },
			{ path: '/docs/prez-fr', page: null, svg: 'page_concept.svg' },
			{ path: '/docs/js-app', page: null, svg: 'page_jsapp.svg' },
			{ path: '/docs/motors', page: null, svg: 'page_gears.svg' },
			{ path: '/docs/gears', page: null, svg: 'page_gears.svg' },
			{ path: '/docs/involute', page: null, svg: 'page_gears.svg' },
			{ path: '/docs/magnetic', page: null, svg: 'page_magnetic.svg' },
			{ path: '/docs/axis', page: null, svg: 'page_axis.svg' },
			{ path: '/docs/cad-ecosystem', page: null, svg: 'page_concept.svg' }
		]
	},
	{
		category: '',
		pages: [{ path: '/about', page: null, svg: 'page_about.svg' }]
	}
];

export { apidocPath, menuList };
