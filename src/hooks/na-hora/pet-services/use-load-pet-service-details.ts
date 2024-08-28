import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'

type UseLoadPetServicesResponse = {
  id: number
  name: string
  paralellism: number
  configurations: {
    id: number
    companyPetHairId: number
    companyPetSizeId: number
    price: number
    executionTime: number
  }[]
}

export const useLoadPetServiceDetails = (
  serviceId: number,
): UseQueryResult<UseLoadPetServicesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/services/pet/${serviceId}`,
    enabled: !!serviceId,
  })
}
