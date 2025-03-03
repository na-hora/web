import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

export const useCreateCompanyAndAddress = () => {
  const { usePostData } = useHooks()

  // TODO: implementar tipagem correta
  return usePostData<TPostDataParams<any>, string>({
    url: `${import.meta.env.VITE_API_URL}/companies/register`,
  })
}
