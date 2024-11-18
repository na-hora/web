import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreatePetSizeRequestBody } from './types/create.type'

export const useCreatePetSize = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreatePetSizeRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-size`,
  })
}
