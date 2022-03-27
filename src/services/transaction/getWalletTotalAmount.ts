import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'
import { WalletTotalAmount } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

type TransactionsType = 'INPUT' | 'OUTPUT'

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const INITIAL_TOTAL_AMOUNT = 0

  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return allUserTransactions.reduce((prev, curr) => {
    const transactionTypes = {
      OUTPUT: prev - curr.value,
      INPUT: prev + curr.value,
    }

    const transaction = transactionTypes[curr.type as TransactionsType]

    if (transaction === undefined) {
      throw new ResponseError(ERROR_MESSAGE.INVALID_TRANSACTION, 400)
    }

    return transaction
  }, INITIAL_TOTAL_AMOUNT)
}
