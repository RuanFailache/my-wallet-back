import { PrismaClient } from '@prisma/client'

import { ResponseError } from '@my-wallet/utils/errors'

import * as authUtils from '@my-wallet/modules/auth/utils'
import * as authServices from '@my-wallet/modules/auth/services'

import IUserRepository from '@my-wallet/repositories/prisma/user'
import ISessionRepository from '@my-wallet/repositories/prisma/session'

const prisma = new PrismaClient()

const userRepository = new IUserRepository()
const sessionRepository = new ISessionRepository()

const BASE_PARAMS = {
  email: 'user@test.com',
  password: 'password',
  username: 'user',
}

async function createUserToTest() {
  return prisma.user.create({
    data: {
      ...BASE_PARAMS,
      email: 'user2@test.com',
    },
  })
}

async function cleanDatabaseToTest() {
  await prisma.transaction.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
}

describe('Test for auth services and utils', () => {
  beforeAll(async () => {
    await prisma.$connect()
    await cleanDatabaseToTest()
  })

  afterAll(async () => {
    await cleanDatabaseToTest()
    await prisma.$disconnect()
  })

  describe('Create a new user', () => {
    test('Should create a new user', async () => {
      const user = await authServices.createUser(BASE_PARAMS)

      expect(user).toMatchObject({
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

  describe('Check if user has an active session', () => {
    test("Shouldn't find an active session", async () => {
      const session = await sessionRepository.findSessionWithUserId(0)
      expect(session).toBeNull()
    })

    test('Should create a new session', async () => {
      const user = await createUserToTest()
      const accessToken = await authUtils.createSession(user.id)
      expect(accessToken).toBeTruthy()
    })

    test('Should find an active session', async () => {
      const user = await userRepository.findUserWithEmail('user2@test.com')

      if (!user) {
        fail('Should find a user, but the util failed at the service')
      }

      const session = await sessionRepository.findSessionWithUserId(user.id)

      expect(session).toBeDefined()
    })
  })

  let accessToken: string

  describe('User login service', () => {
    test("Should fail at login because the email isn't registered", () => {
      const promise = authServices.validateUser({
        email: 'user3@test.com',
        password: 'password',
      })
      expect(promise).rejects.toThrowError(ResponseError)
    })

    test('Should fail at login because the password is incorrect', () => {
      const promise = authServices.validateUser({
        ...BASE_PARAMS,
        password: 'wrong_password',
      })
      expect(promise).rejects.toThrowError(ResponseError)
    })

    test('Should login successfully', async () => {
      const user = await authServices.validateUser(BASE_PARAMS)
      expect(user).toBeDefined()
      accessToken = user.accessToken
    })
  })

  describe('User log out service', () => {
    test('Should log out successfully', async () => {
      await authServices.deleteSessionByAccessToken({ accessToken })

      const user = await userRepository.findUserWithEmail(BASE_PARAMS.email)

      if (!user) {
        fail('Should exists an user with the base email')
      }

      const session = await sessionRepository.findSessionWithUserId(user.id)

      expect(session).toBeNull()
    })
  })
})
