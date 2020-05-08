![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] apikey management plugin.

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
the [Seneca framework](http://senecajs.org). It provides a set of
common apikey management actions (`register`, `login` etc.).


## Install

```sh
npm install seneca
npm install seneca-promisify // dependency
npm install seneca-entity // dependency
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

var out = await seneca.post('sys:apikey,register:apikey', {
  handle: 'alice'
})

console.log('APIKEY:', out.apikey)

out = await seneca.post('sys:apikey,login:apikey', {
  handle: 'alice',
  auto: true
})

console.log('LOGIN:', out.login)

```

### Detailed Examples

Because Seneca treats messages as first-class citizens, 90% of unit
testing can be implemented with message scenarios that also provide
detailed usage examples:

* [register_get](test/register_get.calls.js)
* [password](test/password.calls.js)
* [adjust](test/adjust.calls.js)
* [verify](test/verify.calls.js)
* [login](test/login.calls.js)
* [logout](test/logout.calls.js)
* [change](test/change.calls.js)
* [final](test/final.calls.js)


<!--START:action-list-->


## Action Patterns

* [adjust:apikey,sys:apikey](#-adjustapikeysysapikey-)
* [auth:apikey,sys:apikey](#-authapikeysysapikey-)
* [change:pass,sys:apikey](#-changepasssysapikey-)
* [change:handle,sys:apikey](#-changehandlesysapikey-)
* [change:email,sys:apikey](#-changeemailsysapikey-)
* [change:password,sys:apikey](#-changepasswordsysapikey-)
* [check:verify,sys:apikey](#-checkverifysysapikey-)
* [check:exists,sys:apikey](#-checkexistssysapikey-)
* [cmd:encrypt,hook:password,sys:apikey](#-cmdencrypthookpasswordsysapikey-)
* [cmd:pass,hook:password,sys:apikey](#-cmdpasshookpasswordsysapikey-)
* [get:apikey,sys:apikey](#-getapikeysysapikey-)
* [list:apikey,sys:apikey](#-listapikeysysapikey-)
* [list:login,sys:apikey](#-listloginsysapikey-)
* [list:verify,sys:apikey](#-listverifysysapikey-)
* [login:apikey,sys:apikey](#-loginapikeysysapikey-)
* [logout:apikey,sys:apikey](#-logoutapikeysysapikey-)
* [make:verify,sys:apikey](#-makeverifysysapikey-)
* [register:apikey,sys:apikey](#-registerapikeysysapikey-)
* [remove:apikey,sys:apikey](#-removeapikeysysapikey-)
* [sys:apikey,update:apikey](#-sysapikeyupdateapikey-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `adjust:apikey,sys:apikey` &raquo;

Adjust apikey status idempotently (activated, etc.).


#### Parameters


* _active_ : boolean <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `auth:apikey,sys:apikey` &raquo;

Authenticate a login using token


#### Parameters


* _token_ : string <i><small>{presence:required}</small></i>
* _apikey_fields_ : array <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if login is active',
  apikey: 'apikey entity',
  login: 'apikey entity'
}
```


----------
### &laquo; `change:pass,sys:apikey` &raquo;

Change apikey password.


#### Parameters


* _pass_ : string
* _repeat_ : string <i><small>{presence:optional}</small></i>
* _verify_ : string <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if changed',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `change:handle,sys:apikey` &raquo;

Change apikey handle.


#### Parameters


* _new_handle_ : string
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if changed',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `change:email,sys:apikey` &raquo;

Change apikey email.


#### Parameters


* _new_email_ : string
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if changed',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `change:password,sys:apikey` &raquo;

Change apikey password.


#### Parameters


* _pass_ : string
* _repeat_ : string <i><small>{presence:optional}</small></i>
* _verify_ : string <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if changed',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `check:verify,sys:apikey` &raquo;

Check a verfication entry.


#### Parameters


* _kind_ : string <i><small>{presence:optional}</small></i>
* _code_ : string <i><small>{presence:optional}</small></i>
* _now_ : number <i><small>{presence:optional}</small></i>
* _expiry_ : boolean <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if valid',
  why: 'string coded reason if not valid'
}
```


----------
### &laquo; `check:exists,sys:apikey` &raquo;

Check apikey exists.


#### Parameters


* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey exists',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `cmd:encrypt,hook:password,sys:apikey` &raquo;

Encrypt a plain text password string.




#### Examples



* `cmd:encrypt,hook:password,sys:apikey,pass:foofoobarbar`
  * Result: {ok:true, pass:_encrypted-string_, salt:_string_}
#### Parameters


* _salt_ : string <i><small>{presence:optional}</small></i>
* _pass_ : string <i><small>{presence:optional}</small></i>
* _password_ : string <i><small>{presence:optional}</small></i>
* _rounds_ : number <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if encryption succeeded',
  pass: 'encrypted password string',
  salt: 'salt value string'
}
```


----------
### &laquo; `cmd:pass,hook:password,sys:apikey` &raquo;

Validate a plain text password string.




#### Examples



* `cmd:pass,hook:password,sys:apikey,pass:goodpassword`
  * Result: {ok:true}
#### Parameters


* _salt_ : string
* _pass_ : string
* _proposed_ : string
* _rounds_ : number <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if password is valid',
  why: 'string coded reason if not valid'
}
```


----------
### &laquo; `get:apikey,sys:apikey` &raquo;

Get apikey details


#### Parameters


* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `list:apikey,sys:apikey` &raquo;

List apikeys


#### Parameters


* _active_ : boolean <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  items: 'apikey entity item list'
}
```


----------
### &laquo; `list:login,sys:apikey` &raquo;

List logins for a apikey


#### Parameters


* _active_ : boolean <i><small>{presence:optional}</small></i>
* _login_q_ : object <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  items: 'apikey entity item list'
}
```


----------
### &laquo; `list:verify,sys:apikey` &raquo;

Create a verification entry (multiple use cases).


#### Parameters


* _kind_ : string
* _code_ : string <i><small>{presence:optional}</small></i>
* _once_ : boolean <i><small>{presence:optional}</small></i>
* _valid_ : boolean <i><small>{presence:optional}</small></i>
* _custom_ : object <i><small>{presence:optional}</small></i>
* _expire_point_ : number <i><small>{presence:optional}</small></i>
* _expire_duration_ : number <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  verify: 'verify entity'
}
```


----------
### &laquo; `login:apikey,sys:apikey` &raquo;

Login apikey


#### Parameters


* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>
* _auto_ : boolean <i><small>{presence:optional}</small></i>
* _pass_ : string <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey logged in',
  apikey: 'apikey entity',
  login: 'login entity'
}
```


----------
### &laquo; `logout:apikey,sys:apikey` &raquo;

Login apikey


#### Parameters


* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>
* _token_ : string <i><small>{presence:optional}</small></i>
* _login_in_ : string <i><small>{presence:optional}</small></i>
* _login_q_ : object <i><small>{presence:optional,default:{}}</small></i>
* _load_logins_ : boolean <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey logged in',
  count: 'number of logouts'
}
```


----------
### &laquo; `make:verify,sys:apikey` &raquo;

Create a verification entry (multiple use cases).


#### Parameters


* _kind_ : string
* _code_ : string <i><small>{presence:optional}</small></i>
* _once_ : boolean <i><small>{presence:optional}</small></i>
* _valid_ : boolean <i><small>{presence:optional}</small></i>
* _custom_ : object <i><small>{presence:optional}</small></i>
* _expire_point_ : number <i><small>{presence:optional}</small></i>
* _expire_duration_ : number <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey found',
  verify: 'verify entity'
}
```


----------
### &laquo; `register:apikey,sys:apikey` &raquo;

Register a new apikey


#### Parameters


* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _apikey_ : object <i><small>{unknown:true}</small></i>
* _apikey_data_ : object <i><small>{unknown:true}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey registration succeeded',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `remove:apikey,sys:apikey` &raquo;

Remove a apikey


#### Parameters


* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey removed',
  apikey: 'apikey entity'
}
```


----------
### &laquo; `sys:apikey,update:apikey` &raquo;

Update a apikey


#### Parameters


* _apikey_ : object <i><small>{presence:optional}</small></i>
* _id_ : string <i><small>{presence:optional}</small></i>
* _apikey_id_ : string <i><small>{presence:optional}</small></i>
* _email_ : string <i><small>{presence:optional}</small></i>
* _handle_ : string <i><small>{presence:optional}</small></i>
* _nick_ : string <i><small>{presence:optional}</small></i>
* _q_ : object <i><small>{presence:optional}</small></i>
* _fields_ : array <i><small>{presence:optional}</small></i>




#### Replies With


```
{
  ok: '_true_ if apikey updated',
  apikey: 'apikey entity'
}
```


----------


<!--END:action-desc-->



## License

Copyright (c) 2010-2020, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.org/senecajs/seneca-apikey.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-apikey
[coveralls-badge]: https://coveralls.io/repos/github/senecajs/seneca-apikey/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-apikey?branch=master
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/404faaa89a95635ddfc0/maintainability
[codeclimate-url]: https://codeclimate.com/github/senecajs/seneca-apikey/maintainability
[npm-badge]: https://img.shields.io/npm/v/@seneca/apikey.svg
[npm-url]: https://npmjs.com/package/@seneca/apikey
[david-badge]: https://david-dm.org/senecajs/seneca-apikey.svg
[david-url]: https://david-dm.org/senecajs/seneca-apikey
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[Senecajs org]: https://github.com/senecajs/
