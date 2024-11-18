import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetSizesResponse } from './types/load.type'

export const useLoadPetSizes = (
  companyId: string,
): UseQueryResult<LoadPetSizesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/pet-size?companyId=${companyId}`,
    enabled: !!companyId,
  })
}
