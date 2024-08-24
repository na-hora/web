import { CreatePetServicePayload } from '@/components/dashboard/services/services-form'
import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

export const useCreatePetServices = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreatePetServicePayload>, string>({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
