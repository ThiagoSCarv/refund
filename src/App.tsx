import { AuthProvider } from './contexts/AuhContext'
import { Routes } from './routes/Index'

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
