designix-cli
============


Presentation
------------

*designix-cli* is a *command line interface* application for using *designix*.


Requirements
------------

- [node](https://nodejs.org) > 20.10.0
- [npm](https://docs.npmjs.com/cli) > 10.1.0


Installation
------------

```bash
npm i -D designix-cli
npx designix --help
```


Usage
-----

```bash
npx designix --help
```

Usage without installation
--------------------------

```bash
npx --package=designix-cli designix --help
npx --package=designix-cli designix versions
npx --package=designix-cli designix list-designs
```


Dev
---

```bash
git clone https://github.com/charlyoleg2/parametrix
cd parametrix
npm install
npm run ci
npm -w designix-cli run run
```




