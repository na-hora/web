import { RegisterCompanyProvider } from "../contexts/register-company-provider"
import { RegisterCompanyPage } from "./register-company-page"

export const RegisterCompany = () => {
  return (
    <RegisterCompanyProvider>
      <RegisterCompanyPage />
    </RegisterCompanyProvider>
  )
}
