import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE, ResponseError } from '@my-wallet/utils'

import {
  EditTransactionParams,
  NewTransaction,
  DeleteTransactionParams,
  WalletTotalAmount,
} from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function createTransaction(params: NewTransaction) {
  await prisma.transaction.create({
    data: {
      ...params,
    },
  })
}

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

export async function deleteTransaction({
  transactionId,
}: DeleteTransactionParams) {
  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  })
}

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const INITIAL_TOTAL_AMOUNT = 0

  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return allUserTransactions.reduce((prev, curr) => {
    switch (curr.type) {
      case 'OUTPUT':
        return prev - curr.value
      case 'INPUT':
        return prev + curr.value
      default:
        throw new ResponseError(ERROR_MESSAGE.INVALID_TRANSACTION, 400)
    }
  }, INITIAL_TOTAL_AMOUNT)
}
