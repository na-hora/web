import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadSpecificsPetServicesResponse } from './types/load-specifics-services.type'

type Params = {
  companyId?: string
  petTypeId?: number
  petSizeId?: number
  petHairId?: number
}

export const useLoadSpecificsPetServices = ({
  companyId,
  petTypeId,
  petSizeId,
  petHairId,
}: Params): UseQueryResult<LoadSpecificsPetServicesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/services/pet/specifics?companyId=${companyId}&petTypeId=${petTypeId}&petSizeId=${petSizeId}&petHairId=${petHairId}`,
    enabled: !!companyId && !!petTypeId && !!petSizeId && !!petHairId,
  })
}
