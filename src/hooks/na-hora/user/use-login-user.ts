import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'

type Company = {
  id: string
  fantasyName: string
  avatarUrl: string
  petSizes: Array<{ id: number; name: string }>
  petHairs: Array<{ id: number; name: string }>
}

export type UseLoginUserResult = {
  id: string
  token: string
  company: Company
}

export type UseLoginUserParams = {
  username: string
  password: string
}

export const useLoginUser = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<UseLoginUserParams>, UseLoginUserResult>({
    url: `${import.meta.env.VITE_API_URL}/users/login`,
    mutationKey: 'na-hora:login-user',
  })
}
