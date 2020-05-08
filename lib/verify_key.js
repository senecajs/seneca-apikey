/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'


module.exports = (ctx) => {
  const intern = ctx.intern
  // const options = ctx.options

  var version = ctx.hash_version
  
  return async function verify_key(msg) {
    var seneca = this

    // unique identifier for owner
    var owner = msg.owner
    
    // text string naming application dependent scope
    var scope = msg.scope

    var [tag, key] = msg.key.split('.')

    var out = { ok: false }
    
    var key_id = intern.make_key_id(owner, tag)
    var apikey = await seneca.entity('sys/apikey').load$(key_id)

    if(null == apikey) {
      out.why = 'not-found'
      return out
    }

    console.log(apikey.data$())

    
    var hashres =
        await intern.verify_hash(seneca, apikey, tag, version, key, scope, owner)
    console.log('HASH', hashres)

    if(!hashres.ok) {
      out.why = hashres.why
      return out
    }

    out.ok = true
    
    return out
  }
}
