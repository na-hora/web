import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'

type UseLoadStatesResult = {
  states: {
    id: number
    name: string
    uf: string
  }[]
}

export const useLoadNaHoraStates = (): UseQueryResult<UseLoadStatesResult> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: 'http://localhost:3333/api/v1/states',
  })
}
