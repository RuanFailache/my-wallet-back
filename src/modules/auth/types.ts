export interface UserAtSignUp {
  email: string
  username: string
  password: string
}

export interface UserAtSignIn {
  email: string
  password: string
}

export interface LogOut {
  userId: number
}
