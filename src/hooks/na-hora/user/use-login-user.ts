import { useHooks } from '@/hooks'

type UseLoginUserResult = {
  id: string
  token: string
}

export type UseLoginUserParams = {
  username: string
  password: string
}

export const useLoginUser = () => {
  const { usePostData } = useHooks()

  return usePostData<UseLoginUserParams, UseLoginUserResult>({
    url: `${import.meta.env.VITE_API_URL}/users/login`,
    mutationKey: 'na-hora:login-user',
  })
}
