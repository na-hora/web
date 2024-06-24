import { Form, FormInstance } from 'antd'
import { createContext, useContext, useState } from 'react'

type RegisterCompanyFormParams = {
  name: string
  fantasyName: string
  cnpj: string
  email: string
  phone: string
  password: string
  zipCode: string
  cityIbge: string
  neighborhood: string
  street: string
  number: string
  complement: string
  validator: string
}

export type Params = {
  registerCompanyFormData: RegisterCompanyFormParams
  setRegisterCompanyFormData: React.Dispatch<
    React.SetStateAction<RegisterCompanyFormParams>
  >
  form: FormInstance
  zipCodeToSearch: string
  setZipCodeToSearch: React.Dispatch<React.SetStateAction<string>>
  validator: string | null
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  isRegisteringCompany: boolean
  setIsRegisteringCompany: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegisterCompanyContext = createContext<Params>({} as Params)

export const RegisterCompanyProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] =
    useState<RegisterCompanyFormParams>({} as RegisterCompanyFormParams)
  const [zipCodeToSearch, setZipCodeToSearch] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false)

  const [form] = Form.useForm()
  const searchParams = new URLSearchParams(window.location.search)
  const validator = searchParams.get('validator')

  return (
    <RegisterCompanyContext.Provider
      value={{
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
    </RegisterCompanyContext.Provider>
  )
}

export const useRegisterCompanyContext = (): Params => {
  return useContext(RegisterCompanyContext)
}
