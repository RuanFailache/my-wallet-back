import { ISessionRepository } from '../base'

import { PrismaClient } from '@prisma/client'

export class SessionRepository implements ISessionRepository {
  private db

  constructor() {
    this.db = new PrismaClient()
  }

  async startSession(userId: number, token: string) {
    await this.db.session.create({
      data: {
        userId,
        token,
      },
    })
  }

  async findSessionWithUserId(userId: number) {
    return this.db.session.findUnique({
      where: {
        userId,
      },
    })
  }

  async findSessionWithToken(token: string) {
    return this.db.session.findUnique({
      where: {
        token,
      },
    })
  }

  async deleteSessionWithUserId(userId: number) {
    await this.db.session.delete({
      where: {
        userId,
      },
    })
  }
}
