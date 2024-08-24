import { RegisterCompanyFormData } from '@/components/register-company/form-wrapper/types'
import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

export const useCreateCompanyAndAddress = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<RegisterCompanyFormData>, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/register`,
  })
}
