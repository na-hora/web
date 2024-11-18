import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { CreatePetHairRequestBody } from './types/create.type'

export const useUpdatePetHair = () => {
  const { usePutData } = useHooks()

  return usePutData<TPutDataParams<CreatePetHairRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-hair`,
  })
}
