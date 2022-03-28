import { TransactionRepository } from '@my-wallet/repositories/prisma'

import { EditTransactionParams } from '../types'

const transactionRepository = new TransactionRepository()

export async function editTransaction({
  transactionId,
  ...params
}: EditTransactionParams) {
  await transactionRepository.updateTransactionWithTransactionId(
    transactionId,
    params
  )
}
