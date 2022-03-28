import { TransactionRepository } from '@my-wallet/repositories/prisma'

import { NewTransaction } from '../types'

const transactionRepository = new TransactionRepository()

export async function createTransaction(params: NewTransaction) {
  await transactionRepository.createTransaction(params)
}
