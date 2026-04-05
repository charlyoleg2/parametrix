#!/usr/bin/env bash
# rewrite-jsr-json.sh

pkgList=("geometrix" "geomui" "geomcli" "designix" "designix-uis" "designix-cli")

echo "rewrite-jsr-json.sh says Hello!"
# Check if jq is installed
jq --version
if [ $? -ne 0 ]; then
	echo "ERR011: Error, not founding jq"
	echo "please, install jq"
	exit 5
fi
# Go through the packages
cnt=0
for iPkg in ${pkgList[@]}; do
	cnt=$((cnt+1))
	echo "${cnt} : Package: ${iPkg}"
	jq --tab '{
		name: ("@parametrix/" + .name),
		version: .version,
		license: "ISC",
		exports: .tsup.entry[0]
	}' pkg/${iPkg}/package.json > pkg/${iPkg}/jsr.json
done
# Finalization
echo "rewrite-jsr-json.sh says Bye!"
