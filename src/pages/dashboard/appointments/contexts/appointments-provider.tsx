//@ts-ignore
import { TZDate } from '@toast-ui/calendar'
//@ts-ignore
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
  isBlockCompanyHourModalOpen: boolean
  setIsBlockCompanyHourModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  calendarRef: React.RefObject<typeof Calendar>
  petServiceIdFilter: string[]
  setPetServiceIdFilter: (ids: string[]) => void
  isAppointmentManagerModalOpen: boolean
  setIsAppointmentManagerModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
  selectedAppointment: any
  setSelectedAppointment: React.Dispatch<React.SetStateAction<any>>
  fetchingAppointments: boolean
  setFetchingAppointments: React.Dispatch<React.SetStateAction<boolean>>
  totalAppoimentments: number
  setTotalAppointments: React.Dispatch<React.SetStateAction<number>>
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
  const [isBlockCompanyHourModalOpen, setIsBlockCompanyHourModalOpen] =
    useState(false)
  const [petServiceIdFilter, setPetServiceIdFilter] = useState<string[]>([])
  const [isAppointmentManagerModalOpen, setIsAppointmentManagerModalOpen] =
    useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [fetchingAppointments, setFetchingAppointments] = useState(false)
  const [totalAppoimentments, setTotalAppointments] = useState(0)

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
          isBlockCompanyHourModalOpen,
          setIsBlockCompanyHourModalOpen,
          calendarRef,
          petServiceIdFilter,
          setPetServiceIdFilter,
          isAppointmentManagerModalOpen,
          setIsAppointmentManagerModalOpen,
          selectedAppointment,
          setSelectedAppointment,
          fetchingAppointments,
          setFetchingAppointments,
          totalAppoimentments,
          setTotalAppointments,
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
