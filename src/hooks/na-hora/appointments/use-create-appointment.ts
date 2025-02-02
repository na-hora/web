import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useHooks } from '@/hooks'
import { TPostDataParams } from '@/hooks/types'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { CreateAppointmentRequestBody } from './types/create'

export const useCreateAppointment = () => {
  const { usePostData } = useHooks()
  const { nextStep } = useAppointmentContext()
  const { triggerAlert } = useGlobalAlertContext()

  return usePostData<TPostDataParams<CreateAppointmentRequestBody>, string>({
    url: `${import.meta.env.VITE_API_URL}/appointments`,
    onSuccess: () => {
      nextStep()
    },
    onError: () => {
      triggerAlert({
        type: 'error',
        message: 'Erro ao criar agendamento',
      })
    },
  })
}
