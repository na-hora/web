import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreatePetServiceRequestBody } from './types/create.type'

export const useCreatePetServices = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreatePetServiceRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
