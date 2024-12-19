import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreateCompanyHoursBlockBody } from './types/create.type'

export const useCreateCompanyHoursBlock = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreateCompanyHoursBlockBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/hour/block`,
  })
}
