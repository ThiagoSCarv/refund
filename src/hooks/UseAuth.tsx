import { useContext } from 'react'
import { AuthContext } from '../contexts/AuhContext'

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
