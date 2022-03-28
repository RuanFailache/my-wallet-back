import { Transaction } from '@my-wallet/utils'
import { NewTransaction } from '@my-wallet/modules/transaction/types'

export abstract class ITransactionRepository {
  abstract createTransaction(params: NewTransaction): Promise<Transaction>

  abstract deleteTransactionWithTransactionId(
    transactionId: number
  ): Promise<void>

  abstract updateTransactionWithTransactionId(
    transactionId: number,
    data: { value: number; description: string }
  ): Promise<void>

  abstract getAllTransactions(userId: number): Promise<Transaction[]>
}
