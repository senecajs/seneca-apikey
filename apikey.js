/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'

const Assert = require('assert')

//const Crypto = require('crypto')
//const Nid = require('nid')
//const Uuid = require('uuid')
//const Joi = require('@hapi/joi')

module.exports = apikey

module.exports.errors = {}

// TODO this might be a better way to provide docs?
// module.exports.doc = require('./apikey-doc')

const intern = (module.exports.intern = make_intern())

module.exports.defaults = {
  test: false,

  /*
  salt: {
    bytelen: 16,
    format: 'hex'
  },

  pepper: '',

  rounds: 11111,

  fields: {
    standard: ['handle', 'email', 'name', 'active']
  },

  onetime: {
    expire: 15 * 60 * 1000 // 15 minutes
  },

  password: {
    minlen: 8
  },

  handle: {
    minlen: 3,
    maxlen: 15,
    reserved: ['guest', 'visitor'],
    must_match: handle => handle.match(/^[a-z0-9_]+$/),

    // a function returning an array of strings
    must_not_contain: Nid.curses,

    sanitize: handle => handle.replace(/[^a-z0-9_]/g, '_'),

    downcase: true
  },

  limit: 111, // default result limit

  generate_salt: intern.generate_salt,
  ensure_handle: intern.ensure_handle,
  make_handle: intern.make_handle,
  make_token: intern.make_token
  */
}

function apikey(options) {
  var seneca = this
  var ctx = intern.make_ctx({}, options)

  seneca
    .fix('sys:apikey')

    .message('generate:key', intern.make_msg('generate_key', ctx))

/*
    .message('get:apikey', intern.make_msg('get_apikey', ctx))
    .message('list:apikey', intern.make_msg('list_apikey', ctx))
    .message('adjust:apikey', intern.make_msg('adjust_apikey', ctx))
    .message('update:apikey', intern.make_msg('update_apikey', ctx))
    .message('remove:apikey', intern.make_msg('remove_apikey', ctx))
    .message('login:apikey', intern.make_msg('login_apikey', ctx))
    .message('logout:apikey', intern.make_msg('logout_apikey', ctx))

    .message('list:login', intern.make_msg('list_login', ctx))

    .message('make:verify', intern.make_msg('make_verify', ctx))
    .message('list:verify', intern.make_msg('list_verify', ctx))

    .message('change:pass', intern.make_msg('change_pass', ctx))
    .message('change:handle', intern.make_msg('change_handle', ctx))
    .message('change:email', intern.make_msg('change_email', ctx))

    .message('check:handle', intern.make_msg('check_handle', ctx))
    .message('check:verify', intern.make_msg('check_verify', ctx))
    .message('check:exists', intern.make_msg('check_exists', ctx))

    .message('auth:apikey', intern.make_msg('auth_apikey', ctx))

    .message('hook:password,cmd:encrypt', intern.make_msg('cmd_encrypt', ctx))
    .message('hook:password,cmd:pass', intern.make_msg('cmd_pass', ctx))

    // TODO seneca.alias method?
    .message('change:password', intern.make_msg('change_pass', ctx))
*/
  
  return {
    exports: {
/*
      find_apikey: async function(seneca, msg, special_ctx) {
        var merged_ctx =
          null == special_ctx ? ctx : seneca.util.deep({}, ctx, special_ctx)
        return intern.find_apikey(seneca, msg, merged_ctx)
      }
*/
    }
  }
}

function make_intern() {
  return {
    SV: 1, // semantic version, used for data migration

    make_msg: function(msg_fn, ctx) {
      return require('./lib/' + msg_fn)(ctx)
    },

    make_ctx: function(initial_ctx, options) {
      Assert(initial_ctx)
      Assert(options)

      return Object.assign(
        {
          options,
          intern,

          // Standard entity canons
          sys_apikey: 'sys/apikey',
        },
        initial_ctx
      )
    },
  }
}

/*
    
    apikey_exists: async function(seneca, msg, ctx) {
      ctx.fields = []
      var found = await intern.find_apikey(seneca, msg, ctx)
      return found.ok
    },

    find_apikey: async function(seneca, msg, ctx) {
      // Apikey may already be provided in parameters.
      var apikey = msg.apikey && msg.apikey.entity$ ? msg.apikey : null

      // apikey_q when q used for caller's query
      var msg_apikey_query = msg.apikey_q || msg.q || {}

      if (null == apikey) {
        msg = intern.fix_nick_handle(msg, ctx.options)

        var why = null

        // allow use of `q` (or `apikey_q`) to specify query,
        // or `apikey` prop (q has precedence)
        var q = Object.assign(
          {},
          msg.apikey || {},
          msg.apikey_data || {},
          msg_apikey_query
        )

        // can only use one convenience field - they are ordered by decreasing
        // precedence
        for (var cfI = 0; cfI < ctx.convenience_fields.length; cfI++) {
          var f = ctx.convenience_fields[cfI]
          if (null != msg[f]) {
            q[f] = msg[f]
            break
          }
        }

        // `apikey_id` is an alias for `id`
        if (null == q.id && null != q.apikey_id) {
          q.id = q.apikey_id
        }
        delete q.apikey_id

        // TODO waiting for fix: https://github.com/senecajs/seneca-entity/issues/57

        if (0 < Object.keys(seneca.util.clean(q)).length) {
          // Add additional fields to standard fields.
          var fields = Array.isArray(msg.fields) ? msg.fields : []
          q.fields$ = [
            ...new Set((q.fields$ || fields).concat(ctx.standard_apikey_fields))
          ]

          // These are the unique fields
          if (null == q.id && null == q.handle && null == q.email) {
            var apikeys = await seneca.entity(ctx.sys_apikey).list$(q)

            if (1 === apikeys.length) {
              apikey = intern.fix_nick_handle(apikeys[0], ctx.options)
            } else if (1 < apikeys.length) {
              // This is bad, as you could operate on another apikey
              why = 'multiple-matching-apikeys'
            }
          } else {
            // Use load$ to trigger entity cache
            apikey = await seneca.entity(ctx.sys_apikey).load$(q)
          }
        } else {
          why = 'no-apikey-query'
        }
      }

      var out = { ok: null != apikey, apikey: apikey || null }
      if (null == apikey) {
        out.why = why || 'apikey-not-found'
      }

      return out
    },

    // expects normalized apikey data
    build_pass_fields: async function(seneca, apikey_data, ctx) {
      var pass = apikey_data.pass
      var repeat = apikey_data.repeat // optional
      var salt = apikey_data.salt

      if ('string' === typeof repeat && repeat !== pass) {
        return { ok: false, why: 'repeat-password-mismatch' }
      }

      var res = await seneca.post('sys:apikey,hook:password,cmd:encrypt', {
        pass: pass,
        salt: salt,
        whence: 'build'
      })

      if (res.ok) {
        return {
          ok: true,
          fields: {
            pass: res.pass,
            salt: res.salt
          }
        }
      } else {
        return {
          ok: false,
          why: res.why,

          / * $lab:coverage:off$ * /
          details: res.details || {}
          / * $lab:coverage:on$ * /
        }
      }
    },

    generate_salt: function(options) {
      return Crypto.randomBytes(options.salt.bytelen).toString(
        options.salt.format
      )
    },

    // Automate migration of nick->handle. Removes nick.
    // Assume update value will be saved elsewhere in due course.
    fix_nick_handle: function(data, options) {
      Assert(options)

      if (null == data) {
        return data
      }

      var downcase = options.handle.downcase

      if (null != data.nick) {
        data.handle = null != data.handle ? data.handle : data.nick
        data.handle = downcase ? data.handle.toLowerCase() : data.handle
        delete data.nick
      }

      if (null != data.apikey && null != data.apikey.nick) {
        data.apikey.handle =
          null != data.apikey.handle ? data.apikey.handle : data.apikey.nick
        data.apikey.handle = downcase
          ? data.apikey.handle.toLowerCase()
          : data.apikey.handle
        delete data.apikey.nick
      }

      if (null != data.apikey_data && null != data.apikey_data.nick) {
        data.apikey_data.handle =
          null != data.apikey_data.handle
            ? data.apikey_data.handle
            : data.apikey_data.nick
        data.apikey_data.handle = downcase
          ? data.apikey_data.handle.toLowerCase()
          : data.apikey_data.handle
        delete data.apikey_data.nick
      }

      if (null != data.q && null != data.q.nick) {
        data.q.handle = null != data.q.handle ? data.q.handle : data.q.nick
        data.q.handle = downcase ? data.q.handle.toLowerCase() : data.q.handle
        delete data.q.nick
      }

      return data
    },

    // expects normalized apikey data
    ensure_handle: function(apikey_data, options) {
      var handle = apikey_data.handle

      if ('string' != typeof handle) {
        var email = apikey_data.email

        // NOTE: assumes email already validated in apikey_data
        if (null != email) {
          handle =
            email.split('@')[0].toLowerCase() +
            ('' + Math.random()).substring(2, 6)

          handle = options.handle
            .sanitize(handle)
            .substring(0, options.handle.maxlen)
        } else {
          handle = options.make_handle()
        }
      }

      handle = handle.substring(0, options.handle.maxlen)

      if (options.handle.downcase) {
        handle = handle.toLowerCase()
      }

      return handle
    },

    make_handle: Nid({ length: '12', alphabet: 'abcdefghijklmnopqrstuvwxyz' }),

    make_token: Uuid.v4, // Random! Don't leak things.

    make_login: async function(spec) {
      / * $lab:coverage:off$ * /
      var seneca = Assert(spec.seneca) || spec.seneca
      var apikey = Assert(spec.apikey) || spec.apikey
      var why = Assert(spec.why) || spec.why
      var ctx = Assert(spec.ctx) || spec.ctx
      var options = Assert(ctx.options) || ctx.options
      / * $lab:coverage:on$ * /

      var login_data = spec.login_data || {} // custom data fields
      var onetime = !!spec.onetime

      var full_login_data = {
        // custom data fields for login entry
        ...login_data,

        // token field should be indexed for quick lookups
        token: options.make_token(),

        // deliberately copied
        handle: apikey.handle,
        email: apikey.email,

        apikey_id: apikey.id,

        when: new Date().toISOString(),

        active: true,
        why: why,

        sv: intern.SV
      }

      if (onetime) {
        full_login_data.onetime_active = true
        ;(full_login_data.onetime_token = options.make_token()),
          (full_login_data.onetime_expiry = Date.now() + options.onetime.expire)
      }

      var login = await seneca
        .entity(ctx.sys_login)
        .data$(full_login_data)
        .save$()

      return login
    },

    load_apikey_fields: function(msg, ...rest) {
      / * $lab:coverage:off$ * /
      // Seventh Circle of Hell, aka node < 12
      rest.flat =
        'function' == typeof rest.flat
          ? rest.flat
          : function() {
              return this.reduce((a, y) => {
                return Array.isArray(y) ? a.concat(y) : (a.push(y), a)
              }, [])
            }.bind(rest)
      / * $lab:coverage:on$ * /

      var fields = rest
        .flat()
        .filter(f => 'string' === typeof f && 0 < f.length)
      msg.q = msg.q || {}
      msg.q.fields$ = msg.q.fields$ || []
      msg.q.fields$ = msg.q.fields$.concat(fields)
      msg.q.fields$ = [...new Set(msg.q.fields$)] // remove dups
      return msg
    },

    email_schema: Joi.string()
      .email()
      .required(),

    valid_email: async function(seneca, email, ctx) {
      var email_valid = intern.email_schema.validate(email)
      if (email_valid.error) {
        return { ok: false, email: email, why: 'email-invalid-format' }
      }

      var email_taken = await intern.find_apikey(seneca, { email: email }, ctx)

      return {
        ok: !email_taken.ok,
        email: email,
        why: email_taken.ok ? 'email-exists' : null
      }
    },

    valid_handle: async function(seneca, handle, ctx) {
      var options = ctx.options

      if ('string' != typeof handle) {
        return { ok: false, why: 'not-string', details: { handle: handle } }
      }

      handle = options.handle.downcase ? handle.toLowerCase() : handle

      if (ctx.handle.reserved[handle]) {
        return { ok: false, why: 'reserved', details: { handle: handle } }
      }

      var mnc = ctx.handle.must_not_contain()
      if (mnc[handle]) {
        return {
          ok: false,
          why: 'disallowed',
          details: { handle_base64: Buffer.from(handle).toString('base64') }
        }
      }

      if (!options.handle.must_match(handle)) {
        return { ok: false, why: 'invalid-chars', details: { handle: handle } }
      }

      if (handle.length < options.handle.minlen) {
        return {
          ok: false,
          why: 'handle-too-short',
          details: {
            handle: handle,
            handle_length: handle.length,
            minimum: options.handle.minlen
          }
        }
      }

      if (options.handle.maxlen < handle.length) {
        return {
          ok: false,
          why: 'handle-too-long',
          details: {
            handle: handle,
            handle_length: handle.length,
            maximum: options.handle.maxlen
          }
        }
      }

      var exists = await intern.apikey_exists(seneca, { handle: handle }, ctx)

      if (exists) {
        return {
          ok: false,
          why: 'handle-exists',
          details: { handle: handle }
        }
      }

      return { ok: true, handle: handle }
    },

    normalize_apikey_data: function(msg, ctx) {
      msg = intern.fix_nick_handle(msg, ctx.options)

      var msg_apikey = msg.apikey || {}
      var msg_apikey_data = msg.apikey_data || {}

      var top_data = {}
      var top_fields = ctx.convenience_fields.concat([
        'pass',
        'password',
        'repeat'
      ])
      top_fields.forEach(f => null == msg[f] || (top_data[f] = msg[f]))

      var apikey_data = Object.assign({}, msg_apikey, msg_apikey_data, top_data)

      // password -> pass
      if (null != apikey_data.password) {
        apikey_data.pass = apikey_data.pass || apikey_data.password
        delete apikey_data.password
      }

      // strip undefineds
      Object.keys(apikey_data).forEach(
        k => void 0 === apikey_data[k] && delete apikey_data[k]
      )

      return apikey_data
    }
*/
