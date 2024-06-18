import { createContext, useContext, useState } from "react"

export type Params = {
  registerCompanyFormData: any
  setRegisterCompanyFormData: React.Dispatch<React.SetStateAction<any>>
}

export const RegisterCompanyContext = createContext<Params>({} as Params)

export const RegisterCompanyProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] = useState({
    teste: "eita",
  })
  console.log("registerCompanyFormData: ", registerCompanyFormData)

  return (
    <RegisterCompanyContext.Provider
      value={{ registerCompanyFormData, setRegisterCompanyFormData }}
    >
      {children}
    </RegisterCompanyContext.Provider>
  )
}

export const useRegisterCompanyContext = (): Params => {
  return useContext(RegisterCompanyContext)
}
