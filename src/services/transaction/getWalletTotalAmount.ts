import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'
import { WalletTotalAmount } from '@my-wallet/types/transaction'

const prisma = new PrismaClient()

export async function getWalletTotalAmount(params: WalletTotalAmount) {
  const INITIAL_TOTAL_AMOUNT = 0

  const allUserTransactions = await prisma.transaction.findMany({
    where: {
      userId: params.userId,
    },
  })

  return allUserTransactions.reduce((prev, curr) => {
    switch (curr.type) {
      case 'OUTPUT':
        return prev - curr.value
      case 'INPUT':
        return prev + curr.value
      default:
        throw new ResponseError(ERROR_MESSAGE.INVALID_TRANSACTION, 400)
    }
  }, INITIAL_TOTAL_AMOUNT)
}
