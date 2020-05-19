module.exports = function (seneca, util) {
  var Joi = util.Joi

  return {
    generate_key: {
      desc: 'Generate a new API key.',
      reply_desc: {
        ok: '`true` if successful',
        key: 'key string',
      },
      validate: {
        owner: Joi.string().required(),
        scope: Joi.string().default('default'),
      },
    },

    verify_key: {
      desc: 'Verify an API key.',
      reply_desc: {
        ok: '`true` if verified',
        why: 'explanation code',
      },
      validate: {
        owner: Joi.string().required(),
        scope: Joi.string().default('default'),
        key: Joi.string().required(),
      },
    },
  }
}
