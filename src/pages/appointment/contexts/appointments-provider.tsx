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
}

export type Params = {
  petType: number | undefined
  setPetType: React.Dispatch<React.SetStateAction<number | undefined>>
  serviceValue: number
  setServiceValue: React.Dispatch<React.SetStateAction<number>>
  registerCompanyFormData: any
  setRegisterCompanyFormData: React.Dispatch<React.SetStateAction<any>>
  form: FormInstance
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  selectedDate: dayjs.Dayjs | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>
  selectedTime: string | null
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
  appointmentData: Appointment
  setAppointmentData: React.Dispatch<React.SetStateAction<Appointment>>
  companyId: string | undefined
}

export const AppointmentContext = createContext<Params>({} as Params)

export const AppointmentProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] = useState()
  const [currentStep, setCurrentStep] = useState(0)
  const [petType, setPetType] = useState<number | undefined>(undefined)
  const [serviceValue, setServiceValue] = useState<number>(0)
  const [form] = Form.useForm()
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | undefined>(
    undefined,
  )
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({})
  const [appointmentData, setAppointmentData] = useState<Appointment>({
    petTypeId: undefined,
    petHairId: undefined,
    petSizeId: undefined,
    petServiceId: undefined,
    appointmentDate: undefined,
  })
  const { companyId } = useParams()

  return (
    <AppointmentContext.Provider
      value={{
        petType,
        setPetType,
        serviceValue,
        setServiceValue,
        registerCompanyFormData,
        setRegisterCompanyFormData,
        form,
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
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
