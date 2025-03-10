import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { LoginUserRequestBody, LoginUserResponse } from './types/login.type'

export const useLoginUser = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<LoginUserRequestBody>, LoginUserResponse>({
    url: `${import.meta.env.VITE_API_URL}/users/login`,
    mutationKey: 'na-hora:login-user',
  })
}
