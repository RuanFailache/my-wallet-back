import { LogOut } from '../types'

import { SessionRepository } from '@my-wallet/repositories/prisma'

const sessionRepository = new SessionRepository()

export async function deleteSessionByAccessToken({ accessToken }: LogOut) {
  await sessionRepository.deleteSessionWithToken(accessToken)
}
