import { UserAtSignIn } from '../types'
import { createSession } from '../utils'

import { deleteSessionByUserId } from './deleteSessionByUserId'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

import { IAdapterBcrypt } from '@my-wallet/adapters'

import {
  UserRepository,
  SessionRepository,
} from '@my-wallet/repositories/prisma'

const bcrypt = new IAdapterBcrypt()
const userRepository = new UserRepository()
const sessionRepository = new SessionRepository()

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
    await deleteSessionByUserId({ userId: session.userId })
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
