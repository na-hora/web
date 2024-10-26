import { TZDate } from '@toast-ui/calendar'
import Calendar from '@toast-ui/react-calendar'
import { createContext, useContext, useRef, useState } from 'react'

export type Params = {
  selectedDateRangeText: string
  setSelectedDateRangeText: React.Dispatch<React.SetStateAction<string>>
  selectedView: ViewType
  setSelectedView: React.Dispatch<React.SetStateAction<ViewType>>
  selectedDateFromCalendar: TZDate
  setSelectedDateFromCalendar: React.Dispatch<React.SetStateAction<TZDate>>
  isCreateAppointmentModalOpen: boolean
  setIsCreateAppointmentModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  calendarRef: React.RefObject<typeof Calendar>
}

type ViewType = 'month' | 'week' | 'day'

export const AppointmentsContext = createContext<Params>({} as Params)

export const AppointmentsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState<ViewType>('week')
  const [selectedDateFromCalendar, setSelectedDateFromCalendar] =
    useState<TZDate>(null)
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState(false)

  const calendarRef = useRef<typeof Calendar>(null)

  return (
    <AppointmentsContext.Provider
      value={
        {
          selectedDateRangeText,
          setSelectedDateRangeText,
          selectedView,
          setSelectedView,
          selectedDateFromCalendar,
          setSelectedDateFromCalendar,
          isCreateAppointmentModalOpen,
          setIsCreateAppointmentModalOpen,
          calendarRef,
        } as Params
      }
    >
      {children}
    </AppointmentsContext.Provider>
  )
}

export const useAppointmentsContext = (): Params => {
  return useContext(AppointmentsContext)
}
