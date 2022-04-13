import { Session } from '@my-wallet/utils'

export abstract class ISessionRepository {
  abstract startSession(userId: number, token: string): Promise<void>

  abstract findSessionWithUserId(userId: number): Promise<Session | null>

  abstract findSessionWithToken(token: string): Promise<Session | null>

  abstract deleteSessionWithUserId(userId: number): Promise<void>
}
