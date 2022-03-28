import { TransactionRepository } from '@my-wallet/repositories/prisma'

import { DeleteTransactionParams } from '../types'

const transactionRepository = new TransactionRepository()

export async function deleteTransaction({
  transactionId,
}: DeleteTransactionParams) {
  await transactionRepository.deleteTransactionWithTransactionId(transactionId)
}
