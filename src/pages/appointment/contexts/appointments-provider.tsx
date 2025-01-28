import { Form, FormInstance } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { createContext, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

dayjs.extend(utc)
dayjs.extend(timezone)

type Appointment = {
  companyId: string | null
  petTypeId: number | null
  petHairId: number | null
  petSizeId: number | null
  petServiceId: number | null
  appointmentDate: dayjs.Dayjs | null
  appointmentDateString: string | null
  appointmentTime: string | null
  executionTime: number
  calendarDates: {
    firstDayOfMonth: string
    lastDayOfMonth: string
  }
  user: {
    name: string
    email: string
    phone: string
  }
}

export type Params = {
  form: FormInstance
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  appointmentData: Appointment
  setAppointmentData: React.Dispatch<React.SetStateAction<Appointment>>
  companyId: string | undefined
}

export const AppointmentContext = createContext<Params>({} as Params)

export const AppointmentProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [appointmentData, setAppointmentData] = useState<Appointment>({
    companyId: null,
    petTypeId: null,
    petHairId: null,
    petSizeId: null,
    petServiceId: null,
    executionTime: 0,
    appointmentDate: null,
    appointmentDateString: null,
    appointmentTime: null,
    calendarDates: {
      firstDayOfMonth: dayjs()
        .startOf('month')
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      lastDayOfMonth: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    },
    user: {
      name: '',
      email: '',
      phone: '',
    },
  })
  const { companyId } = useParams()

  return (
    <AppointmentContext.Provider
      value={{
        form,
        currentStep,
        setCurrentStep,
        appointmentData,
        setAppointmentData,
        companyId,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointmentContext = (): Params => {
  return useContext(AppointmentContext)
}
