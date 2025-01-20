import { useHooks } from '@/hooks'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { UseQueryResult } from '@tanstack/react-query'

export const useLoadAvailableDays = (): UseQueryResult<string[]> => {
  const { useGetData } = useHooks()
  const { appointmentData } = useAppointmentContext()

  return useGetData({
    url: `${
      import.meta.env.VITE_API_URL
    }/appointments/available-days?companyId=${
      appointmentData.companyId
    }&startDate=${appointmentData.calendarDates.firstDayOfMonth}&endDate=${
      appointmentData.calendarDates.lastDayOfMonth
    }&minutes=${appointmentData.executionTime}`,
    enabled:
      !!appointmentData.companyId &&
      !!appointmentData.calendarDates.firstDayOfMonth &&
      !!appointmentData.calendarDates.lastDayOfMonth,
  })
}
