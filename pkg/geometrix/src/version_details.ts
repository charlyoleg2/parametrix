// version_details.ts

/**
 * For cli-app and ui-app
 */
type tDependencies = Record<string, string>; // package-name: package-version

/**
 * For cli-app and ui-app
 */
interface tPackage {
	name: string;
	version: string;
	dependencies: tDependencies;
}

/**
 * For cli-app and ui-app
 */
function version_details(appPackage: tPackage): string[] {
	//const lb = html ? '<br>' : '\n'; // line-break
	const rStr: string[] = [];
	rStr.push('version details:');
	rStr.push(`${appPackage.name} : ${appPackage.version}`);
	rStr.push('dependencies:');
	const depList = Object.keys(appPackage.dependencies);
	for (const [idx, depN] of depList.entries()) {
		const depK = depN;
		rStr.push(`${idx + 1} : ${depN} : ${appPackage.dependencies[depK]}`);
	}
	return rStr;
}

export type { tDependencies, tPackage };
export { version_details };
