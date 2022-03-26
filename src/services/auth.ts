import { PrismaClient } from '@prisma/client'
import { ERROR_MESSAGE, ResponseError } from '@my-wallet/utils'
import { IAdapterBcrypt, IAdapterUuid } from '@my-wallet/adapters'
import { LogOut, UserAtSignIn, UserAtSignUp } from '@my-wallet/types/auth'

const prisma = new PrismaClient()
const uuid = new IAdapterUuid('v4')
const bcrypt = new IAdapterBcrypt()

async function createSession(userId: number) {
  const token = uuid.makeToken()
  await prisma.session.create({
    data: {
      token,
      userId,
    },
  })
  return token
}

async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  return user
}

async function checkIfExistsSessionByUserId(userId: number) {
  return prisma.session.findUnique({
    where: {
      userId,
    },
  })
}

export async function createUser({ password, email, username }: UserAtSignUp) {
  const userExists = await getUserByEmail(email)

  if (userExists) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_UP, 400)
  }

  const encryptedPassword = bcrypt.createHash(password)

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: encryptedPassword,
    },
  })

  const accessToken = await createSession(user.id)

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  }
}

export async function validateUser({ email, password }: UserAtSignIn) {
  const user = await getUserByEmail(email)
  const isValidPassword = bcrypt.compareHash(password, user.password)

  if (!isValidPassword) {
    throw new ResponseError(ERROR_MESSAGE.SIGN_IN, 404)
  }

  const session = await checkIfExistsSessionByUserId(user.id)

  if (session) {
    await deleteSessionByAccessToken({ accessToken: session.token })
  }

  const accessToken = await createSession(user.id)

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  }
}

export async function deleteSessionByAccessToken({ accessToken }: LogOut) {
  await prisma.session.deleteMany({
    where: {
      token: accessToken,
    },
  })
}
