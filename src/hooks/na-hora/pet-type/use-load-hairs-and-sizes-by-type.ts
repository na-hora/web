import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadHairsAndSizesByTypeResponse } from './types/load-hairs-and-sizes.type'

export const useLoadHairsAndSizesByType = (
  companyId: string,
  petTypeId: number,
): UseQueryResult<LoadHairsAndSizesByTypeResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/pet-type/${petTypeId}/hairs-and-sizes?companyId=${companyId}`,
    enabled: !!companyId && !!petTypeId,
  })
}
