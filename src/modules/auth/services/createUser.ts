import { UserAtSignUp } from '../types'
import { createSession } from '../utils'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

import { IAdapterBcrypt } from '@my-wallet/adapters'

import IUserRepository from '@my-wallet/repositories/prisma/user'

const bcrypt = new IAdapterBcrypt()
const userRepository = new IUserRepository()

export async function createUser({ password, email, username }: UserAtSignUp) {
  const userExists = await userRepository.findUserWithEmail(email)

  if (userExists) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_UP, 400)
  }

  const encryptedPassword = bcrypt.createHash(password)

  const user = await userRepository.createUser({
    email,
    username,
    password: encryptedPassword,
  })

  const accessToken = await createSession(user.id)

  return {
    accessToken,
    user: {
      email: user.email,
      username: user.username,
    },
  }
}
