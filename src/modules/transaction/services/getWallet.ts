import { calculateTotalAmount } from '../utils'

import { TransactionRepository } from '@my-wallet/repositories/prisma'

const transactionRepository = new TransactionRepository()

export async function getWallet(userId: number) {
  const allUserTransactions = await transactionRepository.getAllTransactions(
    userId
  )

  return {
    totalAmount: calculateTotalAmount(allUserTransactions),
    transactions: allUserTransactions,
  }
}
