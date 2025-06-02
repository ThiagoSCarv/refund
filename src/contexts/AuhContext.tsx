import { type ReactNode, createContext, useEffect } from 'react'
import { useState } from 'react'

type AuthContext = {
  isLoading: boolean
  session: null | UserAPIResponse
  save: (data: UserAPIResponse) => void
}

export const AuthContext = createContext({} as AuthContext)

const LOCAL_STORAGE_KEY = '@refund'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null)
  const [isLoading, setIsLoading] = useState(true)

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.userWithoutPassword)
    )
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

    setSession(data)
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

    if (user && token) {
      setSession({
        token,
        userWithoutPassword: JSON.parse(user),
      })
    }

    setIsLoading(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ session, save, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
