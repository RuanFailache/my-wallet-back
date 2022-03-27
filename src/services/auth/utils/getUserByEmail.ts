import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

const prisma = new PrismaClient()

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  return user
}
