import { Request, Response } from 'express'

import * as transactionServices from '../services'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

export async function getWallet(req: Request, res: Response) {
  try {
    if (!req.user) {
      throw new ResponseError(ERROR_MESSAGE.TOTAL_AMOUNT, 403)
    }

    const wallet = await transactionServices.getWallet(req.user.id)

    return res.send(wallet)
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
