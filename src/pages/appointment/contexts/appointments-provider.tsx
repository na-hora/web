import { SpecificPetService } from '@/hooks/na-hora/pet-services/types/load-specifics-services.type'
import { Form, FormInstance } from 'antd'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { createContext, useContext, useState } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)

type Company = {
  fantasyName: string
  phone: string
  avatarUrl: string
  address: {
    street: string
    neighborhood: string
    number: string
    city: string
    state: string
    zipCode: string
  }
}

type Appointment = {
  companyId: string | null
  petTypeId: number | null
  petHairId: number | null
  petSizeId: number | null
  petService: SpecificPetService | null
  appointmentDate: dayjs.Dayjs | null
  appointmentDateString: string | null
  appointmentTime: string | null
  executionTime: number
  shouldFetchSchedule: boolean
  calendarDates: {
    firstDayOfMonth: string
    lastDayOfMonth: string
  }
  client: {
    name: string
    email: string
    phone: string
  },
  petName: string,
  note: string
}

export type Params = {
  form: FormInstance
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  appointmentData: Appointment
  setAppointmentData: React.Dispatch<React.SetStateAction<Appointment>>
  nextStep: VoidFunction
  prevStep: VoidFunction
  company: Company
  setCompany: React.Dispatch<React.SetStateAction<Company>>
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
    petService: null,
    executionTime: 0,
    appointmentDate: null,
    appointmentDateString: null,
    appointmentTime: null,
    shouldFetchSchedule: false,
    calendarDates: {
      firstDayOfMonth: dayjs()
        .startOf('month')
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      lastDayOfMonth: dayjs().endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    },
    client: {
      name: '',
      email: '',
      phone: '',
    },
    petName: '',
    note: '',
  })
  const [company, setCompany] = useState({
    fantasyName: '',
    phone: '',
    avatarUrl: '',
    address: {
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
  }
  })

  const nextStep = () => {
    const isLastStep = currentStep === 8 // confirmation
    if (isLastStep) return

    form.validateFields().then(() => {
      setAppointmentData((prev: any) => ({
        ...prev,
        client: form.getFieldsValue(),
      }))

      setCurrentStep(currentStep + 1)
    })
  }

  const prevStep = () => {
    if (currentStep === 0) return

    setCurrentStep(currentStep - 1)
  }

  return (
    <AppointmentContext.Provider
      value={{
        form,
        currentStep,
        setCurrentStep,
        appointmentData,
        setAppointmentData,
        nextStep,
        prevStep,
        company,
        setCompany
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointmentContext = (): Params => {
  return useContext(AppointmentContext)
}
