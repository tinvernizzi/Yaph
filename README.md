YAPH
---

[![Build Status](https://travis-ci.org/tinvernizzi/Yaph.svg?branch=master)](https://travis-ci.org/tinvernizzi/Yaph)
[![Coverage Status](https://coveralls.io/repos/github/tinvernizzi/Yaph/badge.svg?branch=master)](https://coveralls.io/github/tinvernizzi/Yaph?branch=master)

YAPH is a web project, currently in progress.


Tech stack
---
* npm to handle javascript dependencies
* Babel transforms the ES6 JavaScript that we will be writing into ES5 JavaScript that current browsers can understand.
* Webpack bundles all your JavaScript together into a single file. This includes each JavaScript file that you write as well as your npm packages. A single .js file is easier to deploy and will usually download faster than multiple small files.
* We'll be using Express as our server.
* passport to handle authentication
* react to build the UI



Setup
---

```
npm install
```

You need to setup the environment variable FACEBOOK_ID and FACEBOOK_SECRET to use Facebook authentication.

Compile
---

```
npm run compile
```

Launch server
---

```
npm start
```
