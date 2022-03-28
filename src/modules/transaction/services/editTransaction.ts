import ITransactionRepository from '@my-wallet/repositories/prisma/transaction'

import { EditTransactionParams } from '../types'

const transactionRepository = new ITransactionRepository()

export async function editTransaction({
  transactionId,
  ...params
}: EditTransactionParams) {
  await transactionRepository.updateTransactionWithTransactionId(
    transactionId,
    params
  )
}
