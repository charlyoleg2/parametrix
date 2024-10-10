Parametrix
==========


Presentation
------------

This is a monorepo that contains the following *javascript* packages:

1. geometrix: the core library of *parametrix*
2. designix: the first library of designs implemeted with *geometrix*
3. geomui: the *svelte* library for creating easily a web-ui for *geometrix-designs*
4. geomcli: the *nodejs* library for creating easily scripts and cli for *geometrix-designs*
5. designix-script-ts: a *nodejs* script that showcases the usage of *geomcli* in *tyepscript*
6. designix-script-js: a *nodejs* script that showcases the usage of *geomcli* in *javascript*
7. designix-cli: a *nodejs* cli that showcases the usage of *geomcli*
8. designix-ui: a *sveltekit* app that showcases *geomui* in a minimalist way
9. designix-uis: a mini-web-server for distributing *designix-ui* via *npm*
10. paramui: the main *parametrix* web-ui containing *designix* designs and various documentation

A public instance of *paramui* is available on that [github-page](https://charlyoleg2.github.io/parametrix/).
The *code source* is available on [github](https://github.com/charlyoleg2/parametrix).


Packages details
----------------

| id | package name         | lib or app | browser env | nodejs env | published                     |
|----|----------------------|------------|-------------|------------|-------------------------------|
| 1  | geometrix            | lib        | yes         | yes        | [geometrix][geometrix]        |
| 2  | designix             | lib        | yes         | yes        | [designix][designix]          |
| 3  | geomui               | lib        | yes         |            | [geomui][geomui]              |
| 4  | geomcli              | lib        |             | yes        | [geomcli][geomcli]            |
| 5  | designix-script-ts   | app        |             | yes        |                               |
| 6  | designix-script-js   | app        |             | yes        |                               |
| 7  | designix-cli         | app        |             | yes        | [designix-cli][designix-cli]  |
| 8  | designix-ui          | app        | yes         |            |                               |
| 9  | designix-uis         | app        |             | yes        | [designix-uis][designix-uis]  |
| 10 | parami-ui            | app        | yes         |            |                               |

[geometrix]: https://www.npmjs.com/package/geometrix
[geomui]: https://www.npmjs.com/package/geomui
[geomcli]: https://www.npmjs.com/package/geomcli
[designix]: https://www.npmjs.com/package/designix
[designix-cli]: https://www.npmjs.com/package/designix-cli
[designix-uis]: https://www.npmjs.com/package/designix-uis


Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.2.4 or higher


Starting a Parametrix project
-----------------------------

The helper script *create-parametrix* generates the boilerplate for bootstraping a *Parametrix* project. The boilerplate is functional. It uses the *Parametrix* libraries *geometrix*, *geomcli* and *geomui*.

```bash
npm create parametrix@latest
# or
# npm create parametrix@latest Sam08
cd parameBlabla
npm install
git init && git add -A && git commit -m "Initial commit" # optional
inkscape pkg/desiBlabla/src/myGroup1/svg/src_myBox.svg # optional
vim pkg/desiBlabla/src/myGroup1/myBox.ts # optional
npm run ci
npm run preview
npm run clean # optional
```


Develop the Parametrix core libraries
-------------------------------------

```bash
git clone https://github.com/charlyoleg2/parametrix
cd parametrix
npm i
npm run ci
npm run preview
```

Other useful commands:
```bash
npm run ci2
npm run clean
npm run ls-pkg
npm -w geometrix run check
npm -w designix run build
npm -w paramui run dev
```


Publish a new release
---------------------

```bash
npm run versions
git commit -am 'increment sub-package versions'
npm version patch
git push
git push origin v0.5.6
```
