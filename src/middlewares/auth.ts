import { NextFunction, Request, Response } from 'express'

import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'

import { SessionRepository } from '@my-wallet/repositories/prisma'

const sessionRepository = new SessionRepository()

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization
  const token = auth?.replace('Bearer ', '')

  try {
    if (!token) {
      throw new ResponseError(ERROR_MESSAGE.INVALID_TOKEN, 403)
    }

    const session = await sessionRepository.findSessionWithToken(token)

    if (!session) {
      throw new ResponseError(ERROR_MESSAGE.INVALID_TOKEN, 403)
    }

    req.user = {
      id: session.userId,
    }

    return next()
  } catch (err) {
    if (err instanceof ResponseError) {
      return res.status(err.status).send(err.message)
    }

    return res.status(500).send(ERROR_MESSAGE.UNKNOWN)
  }
}
