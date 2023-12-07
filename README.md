Parametrix
==========


Presentation
------------

This is the monorepo that contains the following *javascript* packages:
- geometrix: the core library of *parametrix*
- designix: some designs implemeted with *geometrix*
- paramuilib: the *svelte* library to create easily a web-ui for some *geometrix-designs*
- demo-paramuilib: a *sveltekit* app that showcase *paramuilib*
- paramui: an enhanced web-ui for showcasing *designix*

A public instance of *Parametrix* is available on that [github-page](https://charlyoleg2.github.io/parametrix/).
The *code source* is available on [github](https://github.com/charlyoleg2/parametrix).


Prerequisite
------------

- [node](https://nodejs.org) version 18.13.0 or higher
- [npm](https://docs.npmjs.com/cli/v7/commands/npm) version 9.3.0 or higher


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


