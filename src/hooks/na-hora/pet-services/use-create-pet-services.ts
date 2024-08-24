import { CreatePetServicePayload } from '@/components/dashboard/services/services-form'
import { useHooks } from '@/hooks'

export const useCreatePetServices = () => {
  const { usePostData } = useHooks()

  return usePostData<CreatePetServicePayload, string>({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
