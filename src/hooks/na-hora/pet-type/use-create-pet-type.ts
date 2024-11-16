import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreatePetTypeRequestBody } from './types/create.type'

export const useCreatePetType = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreatePetTypeRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-type`,
  })
}
