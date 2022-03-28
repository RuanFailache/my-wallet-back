import { PrismaClient } from '@prisma/client'

import { WalletTotalAmount } from '../types'
import { calculateTotalAmount } from '../utils'

const prisma = new PrismaClient()

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return calculateTotalAmount(allUserTransactions)
}
