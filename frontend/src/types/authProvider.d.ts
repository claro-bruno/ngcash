import { ReactNode } from 'react'

export type User = {
  token?: string
  username?: string
  accountId?: string
}

export interface IAuthContext extends User {
  authenticate: (username: string, password: string) => Promise<any>
  logout: () => void
  saveUser: (user: User) => void
  checkUserInLocalStorage: () => boolean
}

export type AuthProviderType = { children: ReactNode }
