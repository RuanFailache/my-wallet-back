import { Request, Response } from 'express'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import * as authSchemas from '@my-wallet/schemas/auth'
import * as authService from '@my-wallet/services/auth'
import { ResponseError } from '@my-wallet/utils/errors'

export async function signIn(req: Request, res: Response) {
  const isValidParams = authSchemas.signIn.validate(req.body)

  try {
    if (isValidParams.error) {
      throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 400)
    }

    const result = await authService.validateUser(req.body)

    res.send(result)
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
