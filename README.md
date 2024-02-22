Parametrix
==========


Presentation
------------

This is the monorepo that contains the following *javascript* packages:

1. geometrix: the core library of *parametrix*
2. designix: the first library of designs implemeted with *geometrix*
3. geomui: the *svelte* library for creating easily a web-ui for *geometrix-designs*
4. geomcli: the *nodejs* library for creating easily scripts and cli for *geometrix-designs*
5. designix-ui: a *sveltekit* app that showcases *geomui* in a minimalist way
6. designix-script-ts: a *nodejs* script that showcases the usage of *geomcli* in *tyepscript*
7. designix-script-js: a *nodejs* script that showcases the usage of *geomcli* in *javascript*
8. designix-cli: a *nodejs* cli that showcases the usage of *geomcli*
9. paramui: the main *parametrix* web-ui containing *designix* designs and various documentation

A public instance of *paramui* is available on that [github-page](https://charlyoleg2.github.io/parametrix/).
The *code source* is available on [github](https://github.com/charlyoleg2/parametrix).


Packages details
----------------

| id | package name         | lib or app | browser env | nodejs env | published                                     |
|----|----------------------|------------|-------------|------------|-----------------------------------------------|
| 1  | geometrix            | lib        | yes         | yes        | <https://www.npmjs.com/package/geometrix>     |
| 2  | designix             | lib        | yes         | yes        | <https://www.npmjs.com/package/designix>      |
| 3  | geomui               | lib        | yes         |            | <https://www.npmjs.com/package/geomui>        |
| 4  | geomcli              | lib        |             | yes        | <https://www.npmjs.com/package/geomcli>       |
| 5  | designix-script-ts   | app        |             | yes        |                                               |
| 6  | designix-script-js   | app        |             | yes        |                                               |
| 7  | designix-cli         | app        |             | yes        | <https://www.npmjs.com/package/designix-cli>  |
| 8  | designix-ui          | app        | yes         |            |                                               |
| 9  | designix-uis         | app        |             | yes        | <https://www.npmjs.com/package/designix-uis>  |
| 10 | parami-ui            | app        | yes         |            |                                               |


Prerequisite
------------

- [node](https://nodejs.org) version 20.10.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 10.2.4 or higher


Getting started
---------------

```bash
git clone https://github.com/charlyoleg2/parametrix
cd parametrix
npm i
npm run ci
npm run preview
```

Other useful commands:
```bash
npm run clean
npm run ls-pkg
npm -w geometrix run check
npm -w designix run build
npm -w paramui run dev
```


