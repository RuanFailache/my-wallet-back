import { Request, Response } from 'express'

import * as transactionServices from '../services'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

export async function deleteTransaction(req: Request, res: Response) {
  try {
    if (!req.query.transactionId) {
      throw new ResponseError(ERROR_MESSAGE.DELETE_TRANSACTION, 400)
    }

    await transactionServices.deleteTransaction({
      transactionId: Number(req.query.transactionId),
    })

    return res.status(204).send('Transaction successfuly created!')
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
