import { Form, FormInstance } from "antd"
import { createContext, useContext, useState } from "react"

type RegisterCompanyFormParams = {
  name: string
  fantasyName: string
  cnpj: string
  email: string
  phone: string
  password: string
  address?: {
    zipCode: string
    cityId: number
    neighborhood: string
    street: string
    number: number
    complement: string
  }
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
}

export const RegisterCompanyContext = createContext<Params>({} as Params)

export const RegisterCompanyProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] =
    useState<RegisterCompanyFormParams>({} as RegisterCompanyFormParams)
  const [zipCodeToSearch, setZipCodeToSearch] = useState("")

  const [form] = Form.useForm()

  return (
    <RegisterCompanyContext.Provider
      value={{
        registerCompanyFormData,
        setRegisterCompanyFormData,
        form,
        zipCodeToSearch,
        setZipCodeToSearch,
      }}
    >
      {children}
    </RegisterCompanyContext.Provider>
  )
}

export const useRegisterCompanyContext = (): Params => {
  return useContext(RegisterCompanyContext)
}
