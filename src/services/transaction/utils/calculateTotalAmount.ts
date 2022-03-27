import { Transaction } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

type TransactionsType = 'INPUT' | 'OUTPUT'

const INITIAL_TOTAL_AMOUNT = 0

export function calculateTotalAmount(transactions: Transaction[]) {
  return transactions.reduce((prev, curr) => {
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
