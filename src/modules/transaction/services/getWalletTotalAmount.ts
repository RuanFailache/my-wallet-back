import { WalletTotalAmount } from '../types'
import { calculateTotalAmount } from '../utils'

import ITransactionRepository from '@my-wallet/repositories/prisma/transaction'

const transactionRepository = new ITransactionRepository()

export async function getWalletTotalAmount({ userId }: WalletTotalAmount) {
  const allUserTransactions = await transactionRepository.getAllTransactions(
    userId
  )
  return calculateTotalAmount(allUserTransactions)
}
