import { Form, FormInstance } from 'antd'
import dayjs from 'dayjs'
import { createContext, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

type Appointment = {
  petTypeId: number | undefined
  petHairId: number | undefined
  petSizeId: number | undefined
  petServiceId: number | undefined
  appointmentDate: dayjs.Dayjs | undefined
  appointmentTime: string | undefined
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
    petTypeId: undefined,
    petHairId: undefined,
    petSizeId: undefined,
    petServiceId: undefined,
    appointmentDate: undefined,
    appointmentTime: undefined,
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
