import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'

export const useLoadPetTypes = (
  companyId: string,
): UseQueryResult<{
  id: number
  name: string
}> => {
  const { useGetData } = useHooks()
  return useGetData({
    url: `${import.meta.env.VITE_API_URL}/pet-type?companyId=${companyId}`,
    enabled: !!companyId,
  })
}
