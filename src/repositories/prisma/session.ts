import { PrismaClient } from '@prisma/client'

export default class ISessionRepository {
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

  async deleteSessionWithToken(token: string) {
    await this.db.session.delete({
      where: {
        token,
      },
    })
  }
}
