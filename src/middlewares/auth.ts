import { NextFunction, Request, Response } from 'express'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

import { ISessionRepository } from '@my-wallet/repositories/prisma'

const sessionRepository = new ISessionRepository()

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization
  const token = auth?.replace('Bearer ', '')

  if (!token) {
    throw new ResponseError(ERROR_MESSAGE.INVALID_TOKEN, 403)
  }

  try {
    const session = await sessionRepository.findSessionWithToken(token)

    if (!session) {
      throw new ResponseError(ERROR_MESSAGE.INVALID_TOKEN, 403)
    }

    req.body.userId = session.userId

    return next()
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
