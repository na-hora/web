import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreatePetHairRequestBody } from './types/create.type'

export const useCreatePetHair = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreatePetHairRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-hair`,
  })
}
