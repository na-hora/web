import { Form, FormInstance } from 'antd'
import { createContext, useContext, useState } from 'react'

export type Params = {
  petType: number | undefined
  setPetType: React.Dispatch<React.SetStateAction<number | undefined>>
  registerCompanyFormData: any
  setRegisterCompanyFormData: React.Dispatch<React.SetStateAction<any>>
  form: FormInstance
  zipCodeToSearch: string
  setZipCodeToSearch: React.Dispatch<React.SetStateAction<string>>
  validator: string | null
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  isRegisteringCompany: boolean
  setIsRegisteringCompany: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppointmentContext = createContext<Params>({} as Params)

export const AppointmentProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] = useState()
  const [zipCodeToSearch, setZipCodeToSearch] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false)
  const [petType, setPetType] = useState<number | undefined>(undefined)

  const [form] = Form.useForm()
  const searchParams = new URLSearchParams(window.location.search)
  const validator = searchParams.get('validator')
  return (
    <AppointmentContext.Provider
      value={{
        petType,
        setPetType,
        registerCompanyFormData,
        setRegisterCompanyFormData,
        form,
        zipCodeToSearch,
        setZipCodeToSearch,
        validator,
        currentStep,
        setCurrentStep,
        isRegisteringCompany,
        setIsRegisteringCompany,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointmentContext = (): Params => {
  return useContext(AppointmentContext)
}
