import { LogOut } from '../types'

import ISessionRepository from '@my-wallet/repositories/prisma/session'

const sessionRepository = new ISessionRepository()

export async function deleteSessionByAccessToken({ accessToken }: LogOut) {
  await sessionRepository.deleteSessionWithToken(accessToken)
}
