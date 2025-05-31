type UserAPIRole = 'employee' | 'manager'

type UserAPIResponse = {
  token: string
  userWithoutPassword: {
    id: string
    name: string
    email: string
    role: UserAPIRole | string
  }
}
