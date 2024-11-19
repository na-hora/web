import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetServicesResponse } from './types/list.type'

export const useLoadPetServices = (
  companyId: string,
): UseQueryResult<LoadPetServicesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/services/pet?companyId=${companyId}`,
  })
}
