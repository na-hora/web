import { useHooks } from '@/hooks'
import { TPutDataParams } from '@/hooks/types'
import { CreateOperatorRequestBody } from './types/create.type'

export const useUpdateOperator = () => {
  const { usePutData } = useHooks()

  return usePutData<TPutDataParams<CreateOperatorRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/operator`,
  })
}
