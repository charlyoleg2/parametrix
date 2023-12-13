Parametrix
==========


Presentation
------------

This is the monorepo that contains the following *javascript* packages:

1. geometrix: the core library of *parametrix*
2. designix: the first library of designs implemeted with *geometrix*
3. geomui: the *svelte* library for creating easily a web-ui for some *geometrix-designs*
4. geomcli: the *nodejs* library for creating easily scripts and cli for *geometrix-designs*
5. designix-ui: a *sveltekit* app that showcase *geomui* in a minimalist way
6. designix-script-ts: a *nodejs* script that showcase the usage of *geometrix-designs* in *tyepscript*
7. designix-script-js: a *nodejs* script that showcase the usage of *geometrix-designs* in *javascript*
8. designix-cli: a *nodejs* cli that showcase the usage of *geometrix-designs*
9. paramui: the main *parametrix* web-ui containing *designix* designs and various documentation

A public instance of *paramui* is available on that [github-page](https://charlyoleg2.github.io/parametrix/).
The *code source* is available on [github](https://github.com/charlyoleg2/parametrix).


Packages details
----------------

| id | package name        | lib or app | browser env | nodejs env |
|----|---------------------|------------|-------------|------------|
| 1  | geometrix           | lib        | yes         | yes        |
| 2  | designix            | lib        | yes         | yes        |
| 3  | geomui              | lib        | yes         |            |
| 4  | geomcli             | lib        |             | yes        |
| 5  | designix-ui         | app        | yes         |            |
| 6  | designix-script-ts  | app        |             | yes        |
| 7  | designix-script-js  | app        |             | yes        |
| 8  | designix-cli        | app        |             | yes        |
| 9  | parami-ui           | app        | yes         |            |


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


