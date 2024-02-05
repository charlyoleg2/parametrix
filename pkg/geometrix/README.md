Geometrix
=========


Presentation
------------

*Geometrix* is a *javascript* package for programmatic CAD. It helps to create figures composed of circles, strokes and arcs. Those figures can then be exported as [dxf](https://en.wikipedia.org/wiki/AutoCAD_DXF), [svg](https://www.w3.org/Graphics/SVG/) and a couple of other formats. Using *Parametrix*, those figures can also be displayed in an HTML canvas and simulated in 2D.

*Geometrix* has also features to round or widen corners of your figures.


Getting started
---------------

```bash
git clone https://github.com/charlyoleg2/parametrix
cd parametrix
npm -w geometrix install
npm -w geometrix ci
```

Dependencies
------------

*Geometrix* runtime depends only on [@zip.js/zip.js](https://www.npmjs.com/package/@zip.js/zip.js). All other functionalies (geometry, dxf-export, svg-export, canvas-stroke) are relying onlw on the standard *Math* library.


Documentation
-------------

The directory *docs_svg* contains diagrams used during the development of *geometrix*. The website *Paramui* contains the documentation of *geometrix*:

- [dev-docs](https://charlyoleg2.github.io/parametrix/docs/geom_dev)
- [user-docs](https://charlyoleg2.github.io/parametrix/docs/geom_user)
- [tutorial](https://charlyoleg2.github.io/parametrix/docs/geom_tutorial)

