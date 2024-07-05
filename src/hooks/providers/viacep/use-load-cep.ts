import { useHooks } from '@/hooks'
import { useRegisterCompanyContext } from '@/pages/company/contexts/register-company-provider'
import { UseQueryResult } from '@tanstack/react-query'

type UseLoadCepResult = {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

export const useLoadViaCepCep = (): UseQueryResult<UseLoadCepResult> => {
  const { zipCodeToSearch } = useRegisterCompanyContext()
  const { useGetData } = useHooks()

  return useGetData({
    url: `https://viacep.com.br/ws/${zipCodeToSearch}/json/`,
    enabled: !!zipCodeToSearch,
  })
}
