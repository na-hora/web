import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { UpdatePetServiceRequestBody } from './types/update.type'

export const useUpdatePetServices = () => {
  const { usePutData } = useHooks()

  return usePutData<TPutDataParams<UpdatePetServiceRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
