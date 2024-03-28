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
```


Usage
-----

```bash
npx designix-cli --help
npx designix-cli
```

Usage without installation
--------------------------

```bash
npx designix-cli
npx --package=designix-cli designix-cli --help
npx --package=designix-cli designix-cli versions
npx --package=designix-cli designix-cli list-designs
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




