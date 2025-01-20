import { getFirstAndLastDayOfMonth } from '@/utils/time'
import { Form, FormInstance } from 'antd'
import dayjs from 'dayjs'
import { createContext, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

type Appointment = {
  companyId: string | undefined
  petTypeId: number | undefined
  petHairId: number | undefined
  petSizeId: number | undefined
  petServiceId: number | undefined
  appointmentDate: dayjs.Dayjs | undefined
  appointmentTime: string | undefined
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
    companyId: undefined,
    petTypeId: undefined,
    petHairId: undefined,
    petSizeId: undefined,
    petServiceId: undefined,
    executionTime: 0,
    appointmentDate: undefined,
    appointmentTime: undefined,
    calendarDates: {
      firstDayOfMonth: getFirstAndLastDayOfMonth().firstDay,
      lastDayOfMonth: getFirstAndLastDayOfMonth().lastDay,
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
