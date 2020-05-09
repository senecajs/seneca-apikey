/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'

const Assert = require('assert')

const Nid = require('nid')


module.exports = (ctx) => {
  Assert(ctx)

  const intern = ctx.intern
  const options = ctx.options
  const base64padlen = ctx.base64padlen
  
  // Internal version, not encoded in key
  var version = ctx.hash_version

  var make_tag = Nid({length:options.tagsize})

  
  return async function generate_key(msg) {
    var seneca = this

    // unique identifier for owner
    var owner = msg.owner
    
    // text string naming application dependent scope
    var scope = msg.scope

    var out = { ok: false }
    
    var core = await intern.generate_core(options.keysize, base64padlen)

    var tag = make_tag()

    var key = tag+'.'+core
    
    var hashres = await intern.make_hash({
      seneca,
      options,
      tag,
      version,
      core,
      scope,
      owner
    })

    if(!hashres.ok) {
      out.why = hashres.why
      return out
    }

    var key_id = intern.make_key_id(owner, tag)

    await seneca.entity('sys/apikey').save$({
      id$: key_id,
      owner: owner,
      tag: tag,
      pass: hashres.pass,
      salt: hashres.salt,

      // Instrument hash times in nanoseconds
      tn_gen: hashres.tn_gen,
      tn_vfy_hi: 0, // verify high water mark
      tn_vfy_lo: Number.MAX_SAFE_INTEGER, // verify low water mark
      
      // Count passes and fails when verifying
      n_pass_key: 0,
      n_fail_key: 0,
    })

    out.ok = true
    out.key = key
    
    return out
  }
}
