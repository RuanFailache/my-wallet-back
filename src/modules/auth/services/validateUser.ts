import { UserAtSignIn } from '../types'
import { deleteSessionByAccessToken } from './deleteSessionByAccessToken'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

import { IAdapterBcrypt } from '@my-wallet/adapters'

import IUserRepository from '@my-wallet/repositories/prisma/user'

import { createSession } from '../utils'
import ISessionRepository from '@my-wallet/repositories/prisma/session'

const bcrypt = new IAdapterBcrypt()
const userRepository = new IUserRepository()
const sessionRepository = new ISessionRepository()

export async function validateUser({ email, password }: UserAtSignIn) {
  const user = await userRepository.findUserWithEmail(email)

  if (!user) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  const isValidPassword = bcrypt.compareHash(password, user.password)

  if (!isValidPassword) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  const session = await sessionRepository.findSessionWithUserId(user.id)

  if (session) {
    await deleteSessionByAccessToken({ accessToken: session.token })
  }

  const accessToken = await createSession(user.id)

  return {
    accessToken,
    user: {
      email: user.email,
      username: user.username,
    },
  }
}
