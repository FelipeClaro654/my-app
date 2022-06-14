import { createContext } from 'react'
import { api } from 'services/auth'

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credencials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: JSX.Element
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    console.log('blaaa')
    try {
      const response = await api.post('sessions', { email, password })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
