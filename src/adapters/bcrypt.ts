import bcrypt from 'bcrypt'

export class IAdapterBcrypt {
  private saltOrRounds: number

  constructor() {
    this.saltOrRounds = 12
  }

  createHash(data: string) {
    return bcrypt.hashSync(data, this.saltOrRounds)
  }

  compareHash(data: string, encrypted: string) {
    return bcrypt.compareSync(data, encrypted)
  }
}
