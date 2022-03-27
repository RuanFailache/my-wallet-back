import { Request, Response } from 'express'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'
import * as transactionSchemas from '@my-wallet/schemas/transaction'
import * as transactionServices from '@my-wallet/services/transaction'

export async function getWalletTotalAmount(req: Request, res: Response) {
  const isValidParams = transactionSchemas.walletTotalAmount.validate(req.body)

  try {
    if (isValidParams.error) {
      throw new ResponseError(ERROR_MESSAGE.TOTAL_AMOUNT, 400)
    }

    const totalAmount = await transactionServices.getWalletTotalAmount(req.body)

    return res.send({ totalAmount })
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
