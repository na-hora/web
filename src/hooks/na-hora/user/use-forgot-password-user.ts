import { useHooks } from '@/hooks'

export type UseForgotPasswordUserParams = {
  email: string
}

export const useForgotPasswordUser = () => {
  const { usePostData } = useHooks()

  return usePostData<UseForgotPasswordUserParams, void>({
    url: `${import.meta.env.VITE_API_URL}/users/forgot-password`,
    mutationKey: 'na-hora:forgot-password-user',
  })
}
