import { ERROR_MESSAGE } from '@my-wallet/utils'
import { UserAtSignIn } from '@my-wallet/types/auth'
import { IAdapterBcrypt } from '@my-wallet/adapters'
import { ResponseError } from '@my-wallet/utils/errors'
import { deleteSessionByAccessToken } from './deleteSessionByAccessToken'

import {
  checkIfExistsSessionByUserId,
  createSession,
  getUserByEmail,
} from './utils'

const bcrypt = new IAdapterBcrypt()

export async function validateUser({ email, password }: UserAtSignIn) {
  const user = await getUserByEmail(email)
  const isValidPassword = bcrypt.compareHash(password, user.password)

  if (!isValidPassword) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  const session = await checkIfExistsSessionByUserId(user.id)

  if (session) {
    await deleteSessionByAccessToken({ accessToken: session.token })
  }

  const accessToken = await createSession(user.id)

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  }
}
