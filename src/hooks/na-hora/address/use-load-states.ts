import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadStatesResponse } from './types/list.type'

export const useLoadNaHoraStates = (): UseQueryResult<LoadStatesResponse> => {
  const { useGetData } = useHooks()

  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/states`,
  })
}
