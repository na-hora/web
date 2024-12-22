import { Form, FormInstance } from 'antd'
import { createContext, useContext, useState } from 'react'

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
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointmentContext = (): Params => {
  return useContext(AppointmentContext)
}
