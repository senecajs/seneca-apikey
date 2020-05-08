// NOTE: validation is not defined here as that would require calling code to
// use seneca-doc

// TODO surely seneca-doc.Joi would be better here ensuring no version clash?
const Joi = require('@hapi/joi')
//const Joi = require('seneca-doc').Joi

/*
const query_apikey = {
  id: Joi.string()
    .min(1)
    .optional(),
  apikey_id: Joi.string()
    .min(1)
    .optional(),
  email: Joi.string()
    .email()
    .optional(),
  handle: Joi.string()
    .min(1)
    .optional(),
  nick: Joi.string()
    .min(1)
    .optional(),
  q: Joi.object().optional(),
  fields: Joi.array()
    .items(Joi.string())
    .optional()
}

const apikey_data = {
  email: Joi.string()
    .email()
    .optional(),
  handle: Joi.string().optional(),
  nick: Joi.string().optional() // legacy
}
*/

module.exports = {
  generate_key: {
    desc: 'Generate a new API key.',
    reply_desc: {
      ok: '_true_ if successful',
      xorkey: 'Key string xor\'d with otp input'
    },
    validate: {
      // TODO check length
      otp: Joi.string()
    }
  },

  /*
  auth_apikey: {
    desc: 'Authenticate a login using token',
    reply_desc: {
      ok: '_true_ if login is active',
      apikey: 'apikey entity',
      login: 'apikey entity'
    },
    validate: Object.assign(
      {
        token: Joi.string().required(),
        apikey_fields: Joi.array()
          .items(Joi.string())
          .optional()
      },
      query_apikey
    )
  },

  register_apikey: {
    desc: 'Register a new apikey',
    reply_desc: {
      ok: '_true_ if apikey registration succeeded',
      apikey: 'apikey entity'
    },
    validate: {
      ...apikey_data,
      apikey: Joi.object({
        ...apikey_data
      }).unknown(),
      apikey_data: Joi.object({
        ...apikey_data
      }).unknown()
    }
  },

  get_apikey: {
    desc: 'Get apikey details',
    reply_desc: {
      ok: '_true_ if apikey found',
      apikey: 'apikey entity'
    },
    validate: query_apikey
  },

  remove_apikey: {
    desc: 'Remove a apikey',
    reply_desc: {
      ok: '_true_ if apikey removed',
      apikey: 'apikey entity'
    },
    validate: query_apikey
  },

  update_apikey: {
    desc: 'Update a apikey',
    reply_desc: {
      ok: '_true_ if apikey updated',
      apikey: 'apikey entity'
    },
    validate: Object.assign(
      {
        apikey: Joi.object().optional()
      },
      query_apikey
    )
  },

  list_apikey: {
    desc: 'List apikeys',
    reply_desc: {
      ok: '_true_ if apikey found',
      items: 'apikey entity item list'
    },
    validate: {
      active: Joi.boolean().optional(),
      q: Joi.object().optional()
    }
  },

  list_login: {
    desc: 'List logins for a apikey',
    reply_desc: {
      ok: '_true_ if apikey found',
      items: 'apikey entity item list'
    },
    validate: Object.assign(
      {
        active: Joi.boolean().optional(),
        login_q: Joi.object().optional()
      },
      query_apikey
    )
  },

  login_apikey: {
    desc: 'Login apikey',
    reply_desc: {
      ok: '_true_ if apikey logged in',
      apikey: 'apikey entity',
      login: 'login entity'
    },
    validate: {
      ...query_apikey,
      auto: Joi.boolean().optional(),
      pass: Joi.string().optional(),
      fields: Joi.array()
        .items(Joi.string())
        .optional()
    }
  },

  logout_apikey: {
    desc: 'Login apikey',
    reply_desc: {
      ok: '_true_ if apikey logged in',
      count: 'number of logouts'
    },
    validate: {
      ...query_apikey,
      token: Joi.string().optional(),
      login_in: Joi.string().optional(),
      login_q: Joi.object()
        .optional()
        .default({}),
      load_logins: Joi.boolean().optional()
    }
  },

  cmd_encrypt: {
    desc: 'Encrypt a plain text password string.',
    examples: {
      'pass:foofoobarbar':
        'Result: {ok:true, pass:_encrypted-string_, salt:_string_}'
    },
    reply_desc: {
      ok: '_true_ if encryption succeeded',
      pass: 'encrypted password string',
      salt: 'salt value string'
    },
    validate: {
      salt: Joi.string().optional(),
      pass: Joi.string()
        .min(1)
        .optional(),
      password: Joi.string()
        .min(1)
        .optional(),
      rounds: Joi.number().optional()
    }
  },

  check_exists: {
    desc: 'Check apikey exists.',
    reply_desc: {
      ok: '_true_ if apikey exists',
      apikey: 'apikey entity'
    },
    validate: query_apikey
  },

  make_verify: {
    desc: 'Create a verification entry (multiple use cases).',
    reply_desc: {
      ok: '_true_ if apikey found',
      verify: 'verify entity'
    },
    validate: Object.assign(
      {
        kind: Joi.string().min(1),
        code: Joi.string()
          .min(1)
          .optional(),
        once: Joi.boolean().optional(),
        valid: Joi.boolean().optional(),
        custom: Joi.object().optional(),
        expire_point: Joi.number().optional(),
        expire_duration: Joi.number().optional()
      },
      query_apikey
    )
  },

  change_handle: {
    desc: 'Change apikey handle.',
    reply_desc: {
      ok: '_true_ if changed',
      apikey: 'apikey entity'
    },
    validate: Object.assign(
      {
        new_handle: Joi.string().min(1)
      },
      query_apikey
    )
  },

  change_email: {
    desc: 'Change apikey email.',
    reply_desc: {
      ok: '_true_ if changed',
      apikey: 'apikey entity'
    },
    validate: Object.assign(
      {
        new_email: Joi.string()
          .email()
          .min(1)
      },
      query_apikey
    )
  },

  change_pass: {
    desc: 'Change apikey password.',
    reply_desc: {
      ok: '_true_ if changed',
      apikey: 'apikey entity'
    },
    validate: Object.assign(
      {
        pass: Joi.string().min(1),
        repeat: Joi.string()
          .min(1)
          .optional(),
        verify: Joi.string()
          .min(1)
          .optional()
      },
      query_apikey
    )
  },

  check_verify: {
    desc: 'Check a verfication entry.',
    reply_desc: {
      ok: '_true_ if valid',
      why: 'string coded reason if not valid'
    },
    validate: Object.assign(
      {
        kind: Joi.string().optional(),
        code: Joi.string().optional(),
        now: Joi.number().optional(),
        expiry: Joi.boolean().optional()
      },
      query_apikey
    )
  },

  cmd_pass: {
    desc: 'Validate a plain text password string.',
    examples: {
      'pass:goodpassword': 'Result: {ok:true}'
    },
    reply_desc: {
      ok: '_true_ if password is valid',
      why: 'string coded reason if not valid'
    },
    validate: {
      salt: Joi.string().min(1),
      pass: Joi.string().min(1),
      proposed: Joi.string().min(1),
      rounds: Joi.number().optional()
    }
  }

*/
}
