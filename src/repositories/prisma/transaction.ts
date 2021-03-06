import { ITransactionRepository } from '../base/transaction'
import { NewTransaction } from '@my-wallet/modules/transaction/types'

import { PrismaClient } from '@prisma/client'

export class TransactionRepository implements ITransactionRepository {
  private db

  constructor() {
    this.db = new PrismaClient()
  }

  async createTransaction(params: NewTransaction) {
    return this.db.transaction.create({
      data: params,
    })
  }

  async deleteTransactionWithTransactionId(transactionId: number) {
    await this.db.transaction.delete({
      where: {
        id: transactionId,
      },
    })
  }

  async updateTransactionWithTransactionId(
    transactionId: number,
    data: { value: number; description: string }
  ) {
    await this.db.transaction.update({
      where: {
        id: transactionId,
      },
      data,
    })
  }

  async getAllTransactions(userId: number) {
    return this.db.transaction.findMany({
      where: {
        userId,
      },
    })
  }
}
