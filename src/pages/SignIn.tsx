import { useActionState } from 'react'
import { ZodError, z } from 'zod'
import { email } from 'zod/v4'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

const signInSchema = z.object({
  email: z.string().email({ message: 'Este e-mail não é valido' }),
  password: z.string().trim().min(1, { message: 'Informe a senha' }),
})

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null)

  function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        return { message: error.issues[0].message }
      }

      return { message: 'Não foi possível entrar' }
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input name="email" required legend="E-mail" type="email" />

      <Input name="password" required legend="Senha" type="password" />

			<p className='text-sm text-red-600 text-center my-4 font-medium'>
				{state?.message}
			</p>

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar Conta
      </a>
    </form>
  )
}
