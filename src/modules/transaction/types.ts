export interface EditTransactionParams {
  value: number
  description: string
  transactionId: number
}

export interface DeleteTransactionParams {
  transactionId: number
}

export interface NewTransaction {
  type: 'OUTPUT' | 'INPUT'
  value: number
  description: string
  userId: number
}
