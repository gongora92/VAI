const joi = require('@hapi/joi')

module.exports = {
  schemas: {
    complexitySchema: joi.object({
      text:
        joi.string().max(1000).required() &&
        joi
          .string()
          .required()
          .custom((value, helper) => {
            return value.split(' ').length <= 100
              ? true
              : helper.message('Text must has less than 100 words')
          })
    }),
    wordSchema: joi.object({
      word: joi.string().required().pattern(/^\S*$/)
    }),
    getToken: joi.object({
      username: joi.string().required(),
      password: joi.string().required()
    })
  },
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body)
      if (result.error) return res.status(422).json(result.error)
      else next()
    }
  }
}
