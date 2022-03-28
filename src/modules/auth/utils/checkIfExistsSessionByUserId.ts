import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkIfExistsSessionByUserId(userId: number) {
  return prisma.session.findUnique({
    where: {
      userId,
    },
  })
}
