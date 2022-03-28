import { WalletTotalAmount } from '../types'
import { calculateTotalAmount } from '../utils'

import { TransactionRepository } from '@my-wallet/repositories/prisma'

const transactionRepository = new TransactionRepository()

export async function getWalletTotalAmount({ userId }: WalletTotalAmount) {
  const allUserTransactions = await transactionRepository.getAllTransactions(
    userId
  )
  return calculateTotalAmount(allUserTransactions)
}
