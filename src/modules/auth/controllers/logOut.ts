import { Request, Response } from 'express'

import * as authSchemas from '../schemas'
import * as authService from '../services'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

export async function logOut(req: Request, res: Response) {
  try {
    if (!req.user) {
      throw new ResponseError(ERROR_MESSAGE.LOG_OUT, 403)
    }

    await authService.deleteSessionByUserId({ userId: req.user.id })

    return res.status(204).send('Session finished with success!')
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
