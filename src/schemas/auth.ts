import Joi from 'joi'

export const signUp = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().length(6).regex(/^\d+/).required(),
})

export const signIn = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const logOut = Joi.object().keys({
  accessToken: Joi.string().required(),
})
