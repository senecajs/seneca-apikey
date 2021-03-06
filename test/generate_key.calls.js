/* Copyright (c) 2020 Richard Rodger and other contributors, MIT License */
'use strict'

// TODO should come from seneca-msg-test to avoid version clash
const Joi = require('@hapi/joi')

var print_calls = true

var call = {}

const LN = require('seneca-msg-test').LN

module.exports = [
  LN({
    name: 'k01',
    print: print_calls,
    pattern: 'generate:key',
    params: {
      owner: 'foo',
      scope: 'bar',
    },
    out: {
      ok: true,
      key: Joi.string(),
    },
  }),

  LN({
    print: print_calls,
    pattern: 'role:entity,cmd:list',
    params: {
      base: 'sys',
      name: 'apikey',
    },
    out: [
      {
        owner: 'foo',
        tag: Joi.string().length(8),
        pass: Joi.string().length(128),
        salt: Joi.string().length(32),
        tn_gen: Joi.number().required(),
        tn_vfy_hi: Joi.number().required(),
        tn_vfy_lo: Joi.number().required(),
        n_pass_key: Joi.number().required(),
        n_fail_key: Joi.number().required(),
        id: Joi.string().regex(/^foo~/).length(12),
      },
    ],
    verify: (call) => {
      console.dir(call.result.out[0].data$())
    },
  }),

  LN({
    print: print_calls,
    pattern: 'verify:key',
    params: {
      owner: 'foo',
      scope: 'bar',
      key: 'not-a-key',
    },
    out: {
      ok: false,
    },
  }),

  LN({
    print: print_calls,
    pattern: 'verify:key',
    params: {
      owner: 'foo',
      scope: 'bar',
      key: '`k01:out.key`',
    },
    out: {
      ok: true,
    },
  }),

  LN({
    print: print_calls,
    pattern: 'verify:key',
    params: {
      owner: 'foo',
      scope: 'bar',
      key: '`k01:out.key`',
    },
    out: {
      ok: true,
    },
  }),

  LN({
    print: print_calls,
    pattern: 'verify:key',
    params: {
      owner: 'foo',
      scope: 'bar',
      key: '`$.k01.out.key.match(/^[^.]+/)[0]+".not-the-core"`',
    },
    out: {
      ok: false,
    },
  }),

  LN({
    print: print_calls,
    pattern: 'role:entity,cmd:list',
    params: {
      base: 'sys',
      name: 'apikey',
    },
    out: [
      {
        tn_gen: Joi.number().greater(0),
        n_pass_key: 2,
        n_fail_key: 1,
      },
    ],
    verify: (call) => {
      console.dir(call.result.out[0].data$())
      var k01 = call.result.out[0]

      // NOTE: very very small chance this can fail (incorrectly) if times were equal
      return k01.tn_vfy_lo < k01.tn_vfy_hi
    },
  }),

  /*
  // user not found
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      handle: 'not-a-user'
    },
    out: {
      ok: false,
      user: null
    }
  },

  (call.get_alice_active = {
    print: print_calls,
    pattern: 'get:user' + LN(),
    params: {
      q: {
        handle: 'alice',
        fields$: ['custom_field0'] // test retrieval of custom fields
      }
    },
    out: {
      user: { handle: 'alice', custom_field0: 'value0', active: true }
    }
  }),
  {
    print: print_calls,
    pattern: 'login:user' + LN(),
    params: {
      handle: 'alice',
      auto: true
    },
    out: {
      ok: true,
      user: { handle: 'alice', active: true }
    }
  },

  // do nothing
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      q: {
        handle: 'alice'
      }
    },
    out: {
      user: { handle: 'alice', active: true }
    }
  },

  call.get_alice_active,

  {
    print: print_calls,
    pattern: 'list:login' + LN(),
    params: {
      handle: 'alice'
    },
    out: {
      ok: true,
      items: Joi.array().length(1)
    }
  },

  // deactivate
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      q: {
        handle: 'alice'
      },
      active: false,
      fields: ['custom_field0'] // test retrieval of custom fields
    },
    out: {
      user: { handle: 'alice', custom_field0: 'value0', active: false }
    }
  },

  // confirm cannot login
  {
    print: print_calls,
    pattern: 'login:user' + LN(),
    params: {
      handle: 'alice',
      auto: true
    },
    out: {
      ok: false,
      why: 'user-not-active'
    }
  },

  // confirm no active logins
  {
    print: print_calls,
    pattern: 'list:login' + LN(),
    params: {
      handle: 'alice'
    },
    out: {
      ok: true,
      items: Joi.array().length(0)
    }
  },

  // idempotent
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      q: {
        handle: 'alice'
      },
      active: false,
      fields: ['custom_field0']
    },
    out: {
      user: { handle: 'alice', custom_field0: 'value0', active: false }
    }
  },

  // confirm not active
  {
    print: print_calls,
    pattern: 'get:user' + LN(),
    params: {
      q: {
        handle: 'alice',
        fields$: ['custom_field0']
      }
    },
    out: {
      user: { handle: 'alice', custom_field0: 'value0', active: false }
    }
  },

  // adjust back to active
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      q: {
        handle: 'alice'
      },
      active: true,
      fields: ['custom_field0']
    },
    out: {
      user: { handle: 'alice', custom_field0: 'value0', active: true }
    }
  },

  call.get_alice_active,

  // deactivate
  {
    print: print_calls,
    pattern: 'adjust:user' + LN(),
    params: {
      q: {
        handle: 'derek'
      },
      active: false
    },
    out: {
      user: { handle: 'derek', active: false }
    }
  },

  // login code for derek...
  {
    print: print_calls,
    name: 'dereklogin0',
    pattern: 'make:verify' + LN(),
    params: {
      handle: 'derek',
      kind: 'login',
      valid: true,
      unique: false,
      expire_point: new Date().getTime() + 10 * 60 * 1000
    },
    out: {
      ok: true,
      verify: {
        code: Joi.string(),
        once: true,
        used: false
      }
    }
  },

  // .. won't work, as not active

  {
    print: print_calls,
    pattern: 'login:user' + LN(),
    params: {
      handle: 'derek',
      verify: '`dereklogin0:out.verify.code`'
    },
    out: {
      ok: false,
      user_id: Joi.string(),
      why: 'user-not-active'
    }
  }
*/
]
