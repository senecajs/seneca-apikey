![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/apikey

[![npm version](https://img.shields.io/npm/v/@seneca/apikey.svg)](https://npmjs.com/package/@seneca/apikey)
[![build](https://github.com/senecajs/seneca-apikey/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-apikey/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-apikey/badge.svg)](https://snyk.io/test/github/senecajs/seneca-apikey)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-apikey/badge.svg?branch=master)](https://coveralls.io/github/senecajs/seneca-apikey?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/79f285a2bfb61305af0f/maintainability)](https://codeclimate.com/github/senecajs/seneca-apikey/maintainability)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/11602/branches/173763/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=11602&bid=173763)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Install

```sh
npm install seneca
npm install seneca-promisify // dependency
npm install seneca-entity // dependency
npm install @seneca/user // dependency
npm install @seneca/apikey
```
## Quick Example

Register an apikey and then create an automatic login for testing.

```js
const Seneca = require('seneca')

var seneca = Seneca().use('promisify').use('entity').use('apikey')

// TODO: complete quick example
```
## More Examples

Because Seneca treats messages as first-class citizens, 90% of unit
testing can be implemented with message scenarios that also provide
detailed usage examples:

- [generate_key](test/generate_key.calls.js)

<!--START:options-->

### Options

- `test` : boolean <i><small>false</small></i>
- `keysize` : number <i><small>32</small></i>
- `tagsize` : number <i><small>8</small></i>
- `rounds` : number <i><small>11</small></i>
- `salt.bytelen` : number <i><small>16</small></i>
- `salt.format` : string <i><small>"hex"</small></i>
- `pepper` : string <i><small>""</small></i>
- `generate_salt` : function <i><small>generate_salt</small></i>

Set plugin options when loading with:

```js
seneca.use('apikey', { name: value, ... })

```
<small>Note: <code>foo.bar</code> in the list above means
<code>{ foo: { bar: ... } }</code></small>

<!--END:options-->

<!--START:action-list-->

### Action Patterns

- [sys:apikey,generate:key](#-sysapikeygeneratekey-)
- [sys:apikey,verify:key](#-sysapikeyverifykey-)

<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

#### &laquo; `sys:apikey,generate:key` &raquo;

Generate a new API key.

##### Parameters

- _owner_ : string <i><small>"&nbsp;"</small></i>
- _scope_ : string <i><small>"default"</small></i>

##### Replies With

```js
{
  ok: '`true` if successful',
  key: 'key string'
}
```
---

#### &laquo; `sys:apikey,verify:key` &raquo;

Verify an API key.

##### Parameters

- _owner_ : string <i><small>"&nbsp;"</small></i>
- _scope_ : string <i><small>"default"</small></i>
- _key_ : string <i><small>"&nbsp;"</small></i>

##### Replies With

```js
{
  ok: '`true` if verified',
  why: 'explanation code'
}
```
---

<!--END:action-desc-->

## Motivation

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-apikey/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

## Background

### License

Copyright (c) 2010-2020, Richard Rodger and other contributors.
Licensed under [MIT][].

[mit]: ./LICENSE
[seneca.js]: https://www.npmjs.com/package/seneca
[senecajs org]: https://github.com/senecajs/
