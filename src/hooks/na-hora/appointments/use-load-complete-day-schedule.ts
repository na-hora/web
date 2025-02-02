import { useHooks } from '@/hooks'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { UseQueryResult } from '@tanstack/react-query'

export const useLoadCompleteDaySchedule = (): UseQueryResult<string[]> => {
  const { useGetData } = useHooks()
  const { appointmentData } = useAppointmentContext()

  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/appointments/complete-day-schedule?companyId=${
      appointmentData.companyId
    }&day=${appointmentData.appointmentDateString}`,
    enabled:
      !!appointmentData?.companyId && !!appointmentData?.appointmentDateString,
  })
}
