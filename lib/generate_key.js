/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'


const Util = require('util')
const Crypto = require('crypto')

const Nid = require('nid')


module.exports = (ctx) => {
  const intern = ctx.intern
  const options = ctx.options

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
    
    var core = (await Util.promisify(Crypto.randomBytes)(options.keysize))
        .toString('base64')
    var tag = make_tag()

    var key = tag+'.'+core
    
    var hashres = await intern.make_hash(seneca, tag, version, core, scope, owner)
    console.log('HASH', hashres)
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
      salt: hashres.salt
    })

    out.ok = true
    out.key = key
    
    return out
  }
}
