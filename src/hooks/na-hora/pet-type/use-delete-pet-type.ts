import { useHooks } from '@/hooks'
import { TDeleteDataParams } from '@/hooks/types'

export const useDeletePetType = () => {
  const { useDeleteData } = useHooks()

  return useDeleteData<TDeleteDataParams, void>({
    url: `${import.meta.env.VITE_API_URL}/pet-type`,
  })
}
