// version_details.ts

type tDependencies = Record<string, string>; // package-name: package-version
interface tPackage {
	name: string;
	version: string;
	dependencies: tDependencies;
}

function version_details(appPackage: tPackage): string {
	let rStr = 'version details:\n';
	rStr += `${appPackage.name} : ${appPackage.version}\n`;
	rStr += 'dependencies:';
	const depList = Object.keys(appPackage.dependencies);
	for (const [idx, depN] of depList.entries()) {
		const depK = depN;
		rStr += `\n${idx} : ${depN} : ${appPackage.dependencies[depK]}`;
	}
	return rStr;
}

export type { tPackage };
export { version_details };
