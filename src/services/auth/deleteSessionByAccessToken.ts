import { PrismaClient } from '@prisma/client'
import { LogOut } from '@my-wallet/types/auth'

const prisma = new PrismaClient()

export async function deleteSessionByAccessToken({ accessToken }: LogOut) {
  await prisma.session.deleteMany({
    where: {
      token: accessToken,
    },
  })
}
