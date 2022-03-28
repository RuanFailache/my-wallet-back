import { PrismaClient } from '@prisma/client'
import { IAdapterUuid } from '@my-wallet/adapters'

const prisma = new PrismaClient()
const uuid = new IAdapterUuid('v4')

export async function createSession(userId: number) {
  const token = uuid.makeToken()
  await prisma.session.create({
    data: {
      token,
      userId,
    },
  })
  return token
}
