import Joi from 'joi'

export const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().length(6).regex(/^\d+/).required(),
})

export const signInSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const logOutSchema = Joi.object().keys({
  accessToken: Joi.string().required(),
})
