import Router from 'next/router'
import { createContext, useState } from 'react'
import { api } from 'services/api'
import { setCookie } from 'nookies'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credencials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: JSX.Element
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    email: '',
    permissions: [],
    roles: [],
  })
  const isAuthenticated = !!user
  async function signIn({ email, password }: SignInCredentials) {
    try {
      const {
        data: { permissions, roles, token, refreshToken },
      } = await api.post('sessions', {
        email,
        password,
      })

      setUser({ email, permissions, roles })
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      setCookie(undefined, 'nextauth.refreshtoken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      Router.push('/todolist')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
