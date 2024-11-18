import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { CreatePetSizeRequestBody } from './types/create.type'

export const useUpdatePetSize = () => {
  const { usePutData } = useHooks()

  return usePutData<TPutDataParams<CreatePetSizeRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-size`,
  })
}
