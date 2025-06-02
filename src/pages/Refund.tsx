import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ZodError, z } from 'zod/v4'
import fileSvg from '../assets/file.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Upload } from '../components/Upload'
import { api } from '../services/api'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'

const refundSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Informe um nome claro para sua Solicitação' }),
  category: z.string().min(1, { message: 'Informe a categoria' }),
  amount: z.coerce
    .number({ message: 'Infome um valor válido' })
    .positive({ message: 'Informe um valor válido e superior a 0' }),
})

export function Refund() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filename, setFilename] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams<{ id: string }>()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (params.id) {
      return navigate(-1)
    }

    try {
      setIsLoading(true)

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(',', '.'),
      })

      await api.post('/refunds', {
        ...data,
        filename: '123456789123456789123456789.png',
      })

      navigate('/confirm', { state: { fromSubmit: true } })
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert('Não foi possivel completar a solicitação')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      action=""
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>
      <Input
        required
        legend="Nome da Solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          legend="Valor"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>

      {params.id ? (
        <a
          href="https://app.rocketseat.com.br/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-green-200 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone de Arquivo" />
          Abrir comporbante
        </a>
      ) : (
        <Upload
          filename={filename?.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {params.id ? 'Voltar' : 'Enviar'}
      </Button>
    </form>
  )
}
