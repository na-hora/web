import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetServiceDetailResponse } from './types/get-detail.type'

export const useLoadPetServiceDetails = (
  serviceId: number,
): UseQueryResult<LoadPetServiceDetailResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/services/pet/${serviceId}`,
    enabled: !!serviceId,
  })
}
