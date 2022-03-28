import { User } from '@my-wallet/utils'

import { UserAtSignUp } from '@my-wallet/modules/auth/types'

export abstract class IUserRepository {
  abstract findUserWithEmail(email: string): Promise<User | null>

  abstract createUser(params: UserAtSignUp): Promise<User>
}
