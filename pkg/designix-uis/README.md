Designix-uis
============


Presentation
------------

*designix-uis* is the mini-server package for enabling the local installation of the web-ui *designix-ui*.

Usually, this mini-server package designix-uis is part of a mono-repo containing an other package for the web-ui and potentially an *universal* library backing the web-ui.


Requirements
------------

- [node](https://nodejs.org) > 22.0.0
- [npm](https://docs.npmjs.com/cli) > 11.0.0


Installation
------------

```bash
npm i -D designix-uis
```


Usage
-----

```bash
npx designix-uis
npx designix-uis --help
```


Usage without installation
--------------------------

```bash
npx designix-uis
npx --package=designix-uis designix-uis
npx --package=designix-uis designix-uis --help
```

