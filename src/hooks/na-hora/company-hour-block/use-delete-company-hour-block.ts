import { useHooks } from '@/hooks'
import { TDeleteDataParams } from '@/hooks/types'

export const useDeleteCompanyHourBlock = () => {
  const { useDeleteData } = useHooks()

  return useDeleteData<TDeleteDataParams, void>({
    url: `${import.meta.env.VITE_API_URL}/companies/hour/block`,
    mutationKey: 'na-hora:delete-company-hour-block',
  })
}
