import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'

type UseLoadPetServicesResponse = Array<{
  id: number
  name: string
}>

export const useLoadPetServiceDetails = (
  serviceId: number,
): UseQueryResult<UseLoadPetServicesResponse> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/services/pet/${serviceId}`,
    enabled: !!serviceId,
  })
}
