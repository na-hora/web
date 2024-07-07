import { RegisterCompanyFormData } from '@/components/register-company/form-wrapper/types'
import { useHooks } from '@/hooks'

export const useCreateCompanyAndAddress = () => {
  const { usePostData } = useHooks()

  return usePostData<RegisterCompanyFormData, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/register`,
  })
}
