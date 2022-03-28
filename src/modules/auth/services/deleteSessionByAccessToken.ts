import { PrismaClient } from '@prisma/client'

import { LogOut } from '../types'

const prisma = new PrismaClient()

export async function deleteSessionByAccessToken({ accessToken }: LogOut) {
  await prisma.session.deleteMany({
    where: {
      token: accessToken,
    },
  })
}
