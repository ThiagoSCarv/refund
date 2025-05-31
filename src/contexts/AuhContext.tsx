import { type ReactNode, createContext } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ name: 'Thiago' }}>
      {children}
    </AuthContext.Provider>
  )
}
