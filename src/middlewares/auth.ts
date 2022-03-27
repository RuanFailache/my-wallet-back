import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE } from '@my-wallet/utils'
import { ResponseError } from '@my-wallet/utils/errors'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization
  const token = auth?.replace('Bearer ', '')
  try {
    const session = await prisma.session.findUnique({
      where: {
        token,
      },
    })

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
