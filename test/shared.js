/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License */
'use strict'

const Seneca = require('seneca')

module.exports = {
  make_seneca: () => {
    // TODO hide logs of expected errors
    var seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('doc')
        .use('joi')
        .use('entity')
        .use('user')
        .use('..', {})
    return seneca
  },
}
