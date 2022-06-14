import Router from 'next/router'
import { createContext, useState } from 'react'
import { api } from 'services/auth'

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
        data: { permissions, roles },
      } = await api.post('sessions', {
        email,
        password,
      })

      setUser({ email, permissions, roles })
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
