import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreateOperatorRequestBody } from './types/create.type'

export const useCreateOperator = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreateOperatorRequestBody>, number>({
    url: `${import.meta.env.VITE_API_URL}/operator`,
  })
}
