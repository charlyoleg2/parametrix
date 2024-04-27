Geomui
======


Presentation
------------

*Geomui* is the svelte library of [parametrix](https://charlyoleg2.github.io/parametrix/).
The top-level component is *OneDesign*. It expose the parameters and the rendering of a *design*.


SVG files
---------

The svg-files, that describe the parameters, are expected to be copied in the directory *static/pgdsvg*. Per convention, each *design-library* should provide its svg-files in the directory *dist/pgdsvg*.


Requirements
------------

- [node](https://nodejs.org) > 20.10.0
- [npm](https://docs.npmjs.com/cli) > 10.5.0


Getting started
---------------

```bash
git clone https://github.com/charlyoleg2/parametrix
cd parametrix
npm install
npm run ci
npm run preview
```
