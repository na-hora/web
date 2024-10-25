import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadAppointmentsResponse } from './types/load'

export const useLoadAppointments =
  (): UseQueryResult<LoadAppointmentsResponse> => {
    const { useGetData } = useHooks()
    // const { selectedDateRangeText } = useAppointmentsContext()

    return useGetData({
      url: `${
        import.meta.env.VITE_API_URL
      }/appointments?startDate=2024-10-19T11:00:00-03:00&endDate=2024-10-30T12:00:00-03:00`,
    })
  }
