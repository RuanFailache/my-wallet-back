import { PrismaClient } from '@prisma/client'
import { calculateReduceForTotalAmount } from './utils'
import { WalletTotalAmount } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const INITIAL_TOTAL_AMOUNT = 0

  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return allUserTransactions.reduce(
    calculateReduceForTotalAmount,
    INITIAL_TOTAL_AMOUNT
  )
}
