import { PrismaClient } from '@prisma/client'
import { calculateTotalAmount } from './utils'
import { WalletTotalAmount } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return calculateTotalAmount(allUserTransactions)
}
