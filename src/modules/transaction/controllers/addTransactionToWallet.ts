import { Request, Response } from 'express'

import * as transactionSchemas from '../schemas'
import * as transactionServices from '../services'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

export async function addTransactionToWallet(req: Request, res: Response) {
  const isValidParams = transactionSchemas.addTransaction.validate(req.body)

  try {
    if (isValidParams.error) {
      throw new ResponseError(ERROR_MESSAGE.CREATE_TRANSACTION, 400)
    }

    await transactionServices.createTransaction(req.body)

    return res.status(204).send('Transaction successfuly created!')
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
