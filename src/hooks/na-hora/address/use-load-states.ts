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
    url: `${import.meta.env.VITE_API_URL}/states`,
  })
}
