![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] plugin for providing API keys.

# @seneca/apikey
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Maintainability][codeclimate-badge]][codeclimate-url]
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/11602/branches/173763/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=11602&bid=173763)
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

* [generate_key](test/generate_key.calls.js)


<!--START:options-->


## Options

* `test` : boolean <i><small>false</small></i>
* `keysize` : number <i><small>32</small></i>
* `tagsize` : number <i><small>8</small></i>
* `rounds` : number <i><small>11</small></i>
* `salt.bytelen` : number <i><small>16</small></i>
* `salt.format` : string <i><small>"hex"</small></i>
* `pepper` : string <i><small>""</small></i>
* `generate_salt` : function <i><small>generate_salt</small></i>


Set plugin options when loading with:
```js


seneca.use('apikey', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->


<!--START:action-list-->


## Action Patterns

* [sys:apikey,generate:key](#-sysapikeygeneratekey-)
* [sys:apikey,verify:key](#-sysapikeyverifykey-)


<!--END:action-list-->


<!--START:action-desc-->


## Action Descriptions

### &laquo; `sys:apikey,generate:key` &raquo;

Generate a new API key.


#### Parameters


* _owner_ : string <i><small>"&nbsp;"</small></i>
* _scope_ : string <i><small>"default"</small></i>




#### Replies With


```
{
  ok: '`true` if successful',
  key: 'key string'
}
```


----------
### &laquo; `sys:apikey,verify:key` &raquo;

Verify an API key.


#### Parameters


* _owner_ : string <i><small>"&nbsp;"</small></i>
* _scope_ : string <i><small>"default"</small></i>
* _key_ : string <i><small>"&nbsp;"</small></i>




#### Replies With


```
{
  ok: '`true` if verified',
  why: 'explanation code'
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
