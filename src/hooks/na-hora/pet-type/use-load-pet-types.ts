import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadPetTypesResponse } from './types/load.type'

export const useLoadPetTypes = (
  companyId: string,
): UseQueryResult<LoadPetTypesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/pet-type?companyId=${companyId}`,
    enabled: !!companyId,
  })
}
