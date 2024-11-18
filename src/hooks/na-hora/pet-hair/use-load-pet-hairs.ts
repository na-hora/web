import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetHairsResponse } from './types/load.type'

export const useLoadPetHairs = (
  companyId: string,
): UseQueryResult<LoadPetHairsResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/pet-hair?companyId=${companyId}`,
    enabled: !!companyId,
  })
}
