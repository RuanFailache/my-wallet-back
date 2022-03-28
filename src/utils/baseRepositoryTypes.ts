export type User = {
  id: number
  username: string
  email: string
  password: string
}

export type Session = {
  id: number
  userId: number
  token: string
}

export type Transaction = {
  id: number
  description: string
  value: number
  type: string
  userId: number
}
