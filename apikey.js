/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'

const Assert = require('assert')
const Util = require('util')
const Crypto = require('crypto')

const intern = (apikey.intern = make_intern())

module.exports = apikey

module.exports.errors = {}
module.exports.doc = require('./apikey-doc')

module.exports.defaults = {
  test: false,
  keysize: 32, // does not include tag
  tagsize: 8,

  // Balance security and speed
  rounds: 11,

  salt: {
    bytelen: 16,
    format: 'hex',
  },

  pepper: '',

  generate_salt: intern.generate_salt,
}

function apikey(options) {
  var seneca = this
  var ctx = intern.make_ctx({}, options)

  // TODO: generate owner id from db id
  // TODO: publish keys, accept keys

  seneca
    .fix('sys:apikey')
    .message('generate:key', intern.make_msg('generate_key', ctx))
    .message('verify:key', intern.make_msg('verify_key', ctx))
}

function make_intern() {
  return {
    make_msg: function (msg_fn, ctx) {
      Assert(msg_fn)
      Assert(ctx)

      return require('./lib/' + msg_fn)(ctx)
    },

    make_ctx: function (initial_ctx, options) {
      Assert(initial_ctx)
      Assert(options)

      return Object.assign(
        {
          options,
          intern,

          // Standard entity canons
          sys_apikey: 'sys/apikey',

          // Internal version, not encoded in key
          hash_version: '001',

          // Base64 padding length
          base64padlen: intern.calculate_base64padlen(options.keysize),
        },
        initial_ctx
      )
    },

    make_hash: async function (spec) {
      Assert(spec)

      var start = process.hrtime()

      spec.salt = spec.salt || spec.options.generate_salt(spec.options)

      var out = {
        ok: true,
        pass: intern.runhash({
          src: intern.make_key_src(spec),
          rounds: spec.options.rounds,
        }),
        salt: spec.salt,
      }

      var dur = process.hrtime(start)
      out.tn_gen = dur[0] * 1e9 + dur[1]

      return out
    },

    verify_hash: async function (spec) {
      Assert(spec)

      var start = process.hrtime()

      var hash = intern.runhash({
        src: intern.make_key_src(spec),
        rounds: spec.options.rounds,
      })

      var out = {
        ok: hash === spec.pass,
      }

      out.why = out.ok ? void 0 : 'no-match'

      var dur = process.hrtime(start)
      out.tn_vfy = dur[0] * 1e9 + dur[1]

      return out
    },

    runhash: function (spec) {
      var out = spec.src

      for (var i = 0; i < spec.rounds; i++) {
        var shasum = Crypto.createHash('sha512')
        shasum.update(out, 'utf8')
        out = shasum.digest('hex')
      }

      return out
    },

    make_key_src: function (spec) {
      var fullcore =
        '~' +
        spec.tag +
        '~' +
        spec.version +
        '~' +
        spec.core +
        '~' +
        spec.scope +
        '~' +
        spec.owner +
        '~'

      // NOTE: remain compatible with @seneca/user
      return spec.options.pepper + fullcore + spec.salt
    },

    make_key_id: function (owner, tag) {
      return owner + '~' + tag
    },

    generate_salt: function (options) {
      return Crypto.randomBytes(options.salt.bytelen).toString(
        options.salt.format
      )
    },

    // base64 padding is removed, string is URL-safed
    generate_core: async function (keysize, base64padlen) {
      var core = (await Util.promisify(Crypto.randomBytes)(keysize)).toString(
        'base64'
      )
      var out = core.substring(0, core.length - base64padlen)
      out = out.replace(/\+/g, '-')
      out = out.replace(/\//g, '_')
      return out
    },

    /*
    // base64 padding is added, string is URL-unsafed
    parse_core: function(core, base64padlen) {
      var out = null == core ? '' : core
      out = out.replace('-','+')
      out = out.replace('_','/')
      out = out + '=='.substring(base64padlen)
      return out
    },
    */

    // NOTE: https://stackoverflow.com/questions/13378815/base64-length-calculation/13378842
    calculate_base64padlen: function (keysize) {
      var base64len = (4 * keysize) / 3
      var padlen = Math.round(3 * (Math.ceil(base64len) - base64len))
      return padlen
    },
  }
}
