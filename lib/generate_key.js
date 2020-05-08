/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License. */
'use strict'

module.exports = ctx => {
  // const intern = ctx.intern

  return async function generate_key(msg) {
    //var seneca = this

    var xorkey = 'xorkey'
    
    var out = { ok: true, xorkey: xorkey }

    return out
  }
}
