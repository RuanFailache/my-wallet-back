import { PrismaClient } from '@prisma/client'
import { EditTransactionParams } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function editTransaction({
  value,
  description,
  transactionId,
}: EditTransactionParams) {
  await prisma.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      value,
      description,
    },
  })
}
