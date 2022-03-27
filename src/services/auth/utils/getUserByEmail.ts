import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

const prisma = new PrismaClient()

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  })
}
