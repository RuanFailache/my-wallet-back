import { Transaction } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

type TransactionsType = 'INPUT' | 'OUTPUT'

export function calculateReduceForTotalAmount(prev: number, curr: Transaction) {
  const transactionTypes = {
    OUTPUT: prev - curr.value,
    INPUT: prev + curr.value,
  }

  const transaction = transactionTypes[curr.type as TransactionsType]

  if (transaction === undefined) {
    throw new ResponseError(ERROR_MESSAGE.INVALID_TRANSACTION, 400)
  }

  return transaction
}
