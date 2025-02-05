import { useHooks } from '@/hooks'
import { TDeleteDataParams } from '@/hooks/types'

export const useDeleteOperator = () => {
  const { useDeleteData } = useHooks()

  return useDeleteData<TDeleteDataParams, void>({
    url: `${import.meta.env.VITE_API_URL}/operator`,
  })
}
