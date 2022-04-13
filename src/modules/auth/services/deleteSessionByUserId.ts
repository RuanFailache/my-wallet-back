import { LogOut } from '../types'

import { SessionRepository } from '@my-wallet/repositories/prisma'

const sessionRepository = new SessionRepository()

export async function deleteSessionByUserId({ userId }: LogOut) {
  await sessionRepository.deleteSessionWithUserId(userId)
}
