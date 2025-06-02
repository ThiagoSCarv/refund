import logoSvg from '../assets/logo.svg'
import logoutSvg from '../assets/logout.svg'
import { useAuth } from '../hooks/UseAuth'

export function Header() {
  const auth = useAuth()

  return (
    <header className="w-full flex justify-between">
      <img src={logoSvg} alt="Logo Refund" className="my-8" />

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-200">
          Olá, {auth.session?.userWithoutPassword.name}
        </span>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<img
          src={logoutSvg}
          alt="Ícone de Sair"
          className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
					onClick={() => auth.remove()}
        />
      </div>
    </header>
  )
}
