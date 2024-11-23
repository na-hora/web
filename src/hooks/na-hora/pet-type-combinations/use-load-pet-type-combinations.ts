import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetTypeCombinationsResponse } from './types/load.type'

export const useLoadPetTypeCombinations = (
  petTypeId: string | null,
  petServiceId: number | undefined,
): UseQueryResult<LoadPetTypeCombinationsResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/pet-type/${petTypeId}/combinations?petServiceId=${petServiceId}`,
    enabled: !!petTypeId && !!petServiceId,
  })
}
