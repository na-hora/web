import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadOperatorsResponse } from './types/load.type'

export const useLoadOperators = (): UseQueryResult<LoadOperatorsResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/operator`,
  })
}
