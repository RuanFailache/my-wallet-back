import { PrismaClient } from '@prisma/client'

import { IUserRepository } from '../base/user'
import { UserAtSignUp } from '@my-wallet/modules/auth/types'

export class UserRepository implements IUserRepository {
  private db

  constructor() {
    this.db = new PrismaClient()
  }

  async findUserWithEmail(email: string) {
    return this.db.user.findUnique({
      where: {
        email,
      },
    })
  }

  async createUser(params: UserAtSignUp) {
    return this.db.user.create({
      data: params,
    })
  }
}
