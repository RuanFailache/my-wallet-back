import { IAdapterUuid } from '@my-wallet/adapters'

import { SessionRepository } from '@my-wallet/repositories/prisma'

const uuid = new IAdapterUuid('v4')
const sessionRepository = new SessionRepository()

export async function createSession(userId: number) {
  const token = uuid.makeToken()
  await sessionRepository.startSession(userId, token)
  return token
}
