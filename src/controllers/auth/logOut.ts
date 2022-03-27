import { Request, Response } from 'express'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import * as authSchemas from '@my-wallet/schemas/auth'
import * as authService from '@my-wallet/services/auth'
import { ResponseError } from '@my-wallet/utils/errors'

export async function logOut(req: Request, res: Response) {
  const isValidParams = authSchemas.logOut.validate(req.body)

  try {
    if (isValidParams.error) {
      throw new ResponseError(ERROR_MESSAGE.LOG_OUT, 400)
    }

    await authService.deleteSessionByAccessToken(req.body)

    return res.status(204).send('Session finished with success!')
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
