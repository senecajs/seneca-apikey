![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] plugin for providing API keys.

# @seneca/apikey
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Maintainability][codeclimate-badge]][codeclimate-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter][gitter-badge]][gitter-url]


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Description

This module is a plugin for
the [Seneca framework](http://senecajs.org). It provides common
actions for supplying API keys to external clients.

API keys are generated and hashed to the same level as passwords.



## Install

```sh
npm install seneca
npm install seneca-promisify // dependency
npm install seneca-entity // dependency
npm install @seneca/user // dependency
npm install @seneca/apikey
```

### Quick example

Register a apikey and then create an automatic login for testing.

```js
const Seneca = require('seneca')

var seneca = Seneca()
  .use('promisify')
  .use('entity')
  .use('apikey')

// TODO: complete quick example

```

### Detailed Examples

Because Seneca treats messages as first-class citizens, 90% of unit
testing can be implemented with message scenarios that also provide
detailed usage examples:

* [register_get](test/register_get.calls.js)


<!--START:action-list-->


## Action Patterns

* [generate:key,sys:apikey](#-generatekeysysapikey-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `generate:key,sys:apikey` &raquo;

Generate a new API key.


#### Parameters


* _otp_ : string




#### Replies With


```
{
  ok: '_true_ if successful',
  xorkey: "Key string xor'd with otp input"
}
```


----------


<!--END:action-desc-->



## License

Copyright (c) 2010-2020, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.com/senecajs/seneca-apikey.svg?branch=master
[travis-url]: https://travis-ci.com/senecajs/seneca-apikey
[coveralls-badge]: https://coveralls.io/repos/github/senecajs/seneca-apikey/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-apikey?branch=master
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/79f285a2bfb61305af0f/maintainability
[codeclimate-url]: https://codeclimate.com/github/senecajs/seneca-apikey/maintainability
[npm-badge]: https://img.shields.io/npm/v/@seneca/apikey.svg
[npm-url]: https://npmjs.com/package/@seneca/apikey
[david-badge]: https://david-dm.org/senecajs/seneca-apikey.svg
[david-url]: https://david-dm.org/senecajs/seneca-apikey
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[Senecajs org]: https://github.com/senecajs/

