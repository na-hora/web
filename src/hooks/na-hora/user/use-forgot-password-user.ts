import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

export type UseForgotPasswordUserParams = {
  email: string
}

export const useForgotPasswordUser = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<UseForgotPasswordUserParams>, void>({
    url: `${import.meta.env.VITE_API_URL}/users/forgot-password`,
    mutationKey: 'na-hora:forgot-password-user',
  })
}
