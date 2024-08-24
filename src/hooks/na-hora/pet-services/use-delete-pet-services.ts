import { useHooks } from '@/hooks'

export const useDeletePetServices = () => {
  const { useDeleteData } = useHooks()

  return useDeleteData({
    url: `${import.meta.env.VITE_API_URL}/services/pet`,
  })
}
