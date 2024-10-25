import { createContext, useContext, useState } from 'react'

export type Params = {
  selectedDateRangeText: string
  setSelectedDateRangeText: React.Dispatch<React.SetStateAction<string>>
  selectedView: ViewType
  setSelectedView: React.Dispatch<React.SetStateAction<ViewType>>
}

type ViewType = 'month' | 'week' | 'day'

export const AppointmentsContext = createContext<Params>({} as Params)

export const AppointmentsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState<ViewType>('week')

  return (
    <AppointmentsContext.Provider
      value={
        {
          selectedDateRangeText,
          setSelectedDateRangeText,
          selectedView,
          setSelectedView,
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
