import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { CreatePetTypeRequestBody } from './types/create.type'

export const useUpdatePetType = () => {
  const { usePutData } = useHooks()

  return usePutData<TPutDataParams<CreatePetTypeRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/pet-type`,
  })
}
