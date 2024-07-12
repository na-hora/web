import { useHooks } from '@/hooks'

export type UseResetPasswordUserParams = {
  email: string
  password: string
  validator: string
}

export const useResetPasswordUser = () => {
  const { usePostData } = useHooks()

  return usePostData<UseResetPasswordUserParams, string>({
    url: `${import.meta.env.VITE_API_URL}/users/reset-password`,
    mutationKey: 'na-hora:reset-password-user',
  })
}
