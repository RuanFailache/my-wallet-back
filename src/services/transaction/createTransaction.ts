import { PrismaClient } from '@prisma/client'
import { NewTransaction } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function createTransaction(params: NewTransaction) {
  await prisma.transaction.create({
    data: {
      ...params,
    },
  })
}
