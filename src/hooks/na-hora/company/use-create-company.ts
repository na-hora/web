import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreateCompanyRequestBody } from './types/create.type'

export const useCreateCompanyAndAddress = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreateCompanyRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/register`,
  })
}
