import ITransactionRepository from '@my-wallet/repositories/prisma/transaction'

import { NewTransaction } from '../types'

const transactionRepository = new ITransactionRepository()

export async function createTransaction(params: NewTransaction) {
  await transactionRepository.createTransaction(params)
}
