import { PrismaClient } from '@prisma/client'

import { DeleteTransactionParams } from '../types'

const prisma = new PrismaClient()

export async function deleteTransaction({
  transactionId,
}: DeleteTransactionParams) {
  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  })
}
