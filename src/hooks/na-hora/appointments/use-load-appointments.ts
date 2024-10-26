import { useHooks } from '@/hooks'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { convertDateToISOString } from '@/utils/time'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { LoadAppointmentsResponse } from './types/load'

export const useLoadAppointments =
  (): UseQueryResult<LoadAppointmentsResponse> => {
    const { useGetData } = useHooks()
    const [dates, setDates] = useState<{
      start: string | null
      end: string | null
    }>({
      start: null,
      end: null,
    })
    const { selectedDateRangeText } = useAppointmentsContext()

    useEffect(() => {
      if (!selectedDateRangeText) return

      const [startDate, endDate] = selectedDateRangeText.split(' - ')
      if (!startDate || !endDate) return

      const start = convertDateToISOString(startDate)
      const end = convertDateToISOString(endDate)
      setDates({ start, end })
    }, [selectedDateRangeText])

    return useGetData({
      url: `${import.meta.env.VITE_API_URL}/appointments?startDate=${
        dates.start
      }&endDate=${dates.end}`,
      enabled: !!selectedDateRangeText && !!dates.start && !!dates.end,
    })
  }
