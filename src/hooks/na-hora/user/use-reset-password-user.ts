import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

export type UseResetPasswordUserParams = {
  email: string
  password: string
  validator: string
}

export const useResetPasswordUser = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<UseResetPasswordUserParams>, string>({
    url: `${import.meta.env.VITE_API_URL}/users/reset-password`,
    mutationKey: 'na-hora:reset-password-user',
  })
}
