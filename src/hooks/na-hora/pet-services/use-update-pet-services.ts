import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { UpdatePetServiceRequestBody } from './types/update.type'

export const useUpdatePetServices = () => {
  const { usePostData } = useHooks()

  return usePostData<TPutDataParams<UpdatePetServiceRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
