import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { RelatePetServiceConfigurationsRequestBody } from './types/relate-pet-service-configurations.type'

export const useRelatePetServiceConfiguration = (
  petServiceId: number | undefined,
) => {
  const { usePostData } = useHooks()

  return usePostData<
    TPostDataParams<RelatePetServiceConfigurationsRequestBody>,
    string
  >({
    url: `${import.meta.env.VITE_API_URL}/services/pet/${petServiceId}/values`,
    mutationKey: 'na-hora:relate-pet-service-configuration',
  })
}
