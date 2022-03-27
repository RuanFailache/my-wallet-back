import { PrismaClient } from '@prisma/client'
import * as authServices from '@my-wallet/services/auth'
import * as authUtils from '@my-wallet/services/auth/utils'
import { ResponseError } from '@my-wallet/utils/errors'

const prisma = new PrismaClient()

describe('Test for auth services and utils', () => {
  beforeAll(async () => {
    // Delete all data from database
    await prisma.transaction.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()
  })

  describe('Create a new user', () => {
    const BASE_PARAMS = {
      email: 'user@test.com',
      password: 'password',
      username: 'user',
    }

    test('Should create a new user', async () => {
      const promise = await authServices.createUser(BASE_PARAMS)

      expect(promise).toMatchObject({
        user: {
          email: BASE_PARAMS.email,
          username: BASE_PARAMS.username,
        },
      })
    })

    test("Shouldn't create a new user, because this user already exists", () => {
      const promise = authServices.createUser(BASE_PARAMS)
      expect(promise).rejects.toThrowError(ResponseError)
    })
  })

  describe('Check If user has an active session', () => {
    test("Shouldn't find an active session", () => {
      const promise = authUtils.checkIfExistsSessionByUserId(0)
      expect(promise).resolves.toBe(null)
    })
  })
})
