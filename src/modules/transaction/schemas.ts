import Joi from 'joi'

export const addTransaction = Joi.object().keys({
  value: Joi.number().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .regex(/^(OUTPUT|INPUT)$/)
    .required(),
})

export const editTransaction = Joi.object().keys({
  value: Joi.number().required(),
  description: Joi.string().required(),
  transactionId: Joi.number().required(),
})
