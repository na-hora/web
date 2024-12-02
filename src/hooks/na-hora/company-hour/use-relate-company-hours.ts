import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { RelateCompanyHoursBody } from './types/create.type'

export const UseRelateCompanyHours = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<RelateCompanyHoursBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/hour`,
  })
}
