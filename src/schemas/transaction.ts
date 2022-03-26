import Joi from 'joi'

export const addTransaction = Joi.object().keys({
  value: Joi.number().required(),
  userId: Joi.number().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .regex(/^(OUTPUT|INPUT)$/)
    .required(),
})

export const editTransaction = Joi.object().keys({
  value: Joi.number().required(),
  userId: Joi.number().required(),
  description: Joi.string().required(),
  transactionId: Joi.number().required(),
})

export const deleteTransaction = Joi.object().keys({
  transactionId: Joi.number().required(),
  userId: Joi.number().required(),
})

export const walletTotalAmount = Joi.object().keys({
  userId: Joi.number().required(),
})
