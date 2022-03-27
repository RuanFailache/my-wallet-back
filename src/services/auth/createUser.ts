import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { IAdapterBcrypt } from '@my-wallet/adapters'
import { UserAtSignUp } from '@my-wallet/types/auth'
import { createSession, getUserByEmail } from './utils'
import { ResponseError } from '@my-wallet/utils/errors'

const prisma = new PrismaClient()
const bcrypt = new IAdapterBcrypt()

export async function createUser({ password, email, username }: UserAtSignUp) {
  const userExists = await getUserByEmail(email)

  if (userExists) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_UP, 400)
  }

  const encryptedPassword = bcrypt.createHash(password)

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: encryptedPassword,
    },
  })

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
