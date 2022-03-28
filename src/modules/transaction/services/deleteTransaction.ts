import { ITransactionRepository } from '@my-wallet/repositories/prisma'

import { DeleteTransactionParams } from '../types'

const transactionRepository = new ITransactionRepository()

export async function deleteTransaction({
  transactionId,
}: DeleteTransactionParams) {
  await transactionRepository.deleteTransactionWithTransactionId(transactionId)
}
