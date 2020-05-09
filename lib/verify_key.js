/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'

const Assert = require('assert')


module.exports = (ctx) => {
  Assert(ctx)
  
  const intern = ctx.intern
  const options = ctx.options
  
  var version = ctx.hash_version
  
  return async function verify_key(msg) {
    var seneca = this

    // unique identifier for owner
    var owner = msg.owner
    
    // text string naming application dependent scope
    var scope = msg.scope

    var [tag, core] = msg.key.split('.')

    var out = { ok: false }
    
    var key_id = intern.make_key_id(owner, tag)
    var apikey = await seneca.entity('sys/apikey').load$(key_id)

    if(null == apikey) {
      out.why = 'not-found'
    }
    else {
      var hashres =
          await intern.verify_hash({
            seneca,
            options,
            pass: apikey.pass,
            salt: apikey.salt,
            tag,
            version,
            core,
            scope,
            owner
          })

      if(!hashres.ok) {
        out.why = hashres.why
      }
      else {
        out.ok = true
      }

      // Instrument.
      apikey.n_pass_key += out.ok ? 1 : 0
      apikey.n_fail_key += out.ok ? 0 : 1
    }
    
    if(apikey) {
      // Instrument.
      apikey.tn_vfy_hi =
        hashres.tn_vfy > apikey.tn_vfy_hi ? hashres.tn_vfy : apikey.tn_vfy_hi 
      apikey.tn_vfy_lo =
        hashres.tn_vfy < apikey.tn_vfy_lo ? hashres.tn_vfy : apikey.tn_vfy_lo 
      
      //console.log('VF', out.ok, apikey.data$())
      
      // Don't wait.
      apikey.save$()
    }
    
    return out
  }
}
