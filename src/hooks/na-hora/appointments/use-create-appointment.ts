import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { CreateAppointmentRequestBody } from './types/create'

export const useCreateAppointment = () => {
  const { usePostData } = useHooks()

  return usePostData<TPostDataParams<CreateAppointmentRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/appointments`,
  })
}
