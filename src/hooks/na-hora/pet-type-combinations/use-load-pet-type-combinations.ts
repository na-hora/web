import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetTypeCombinationsResponse } from './types/load.type'

export const useLoadPetTypeCombinations = (
  petTypeId: string | null,
): UseQueryResult<LoadPetTypeCombinationsResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/pet-type/${petTypeId}/combinations`,
    enabled: !!petTypeId,
  })
}
