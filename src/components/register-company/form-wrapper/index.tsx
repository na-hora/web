import { RegisterCompanyAddressForm } from "@/components/register-company/address-form"
import { RegisterUserForm } from "@/components/register-company/user-form"
import { useCreateCompanyAndAddress } from "@/hooks/na-hora/company/use-create-company"
import { useRegisterCompanyContext } from "@/pages/company/contexts/register-company-provider"
import { Button, Form } from "antd"
import { useEffect } from "react"
import { RegisterCompanyForm } from "../company-form"

enum Steps {
  COMPANY = 0,
  ADDRESS = 1,
  USER = 2,
  SUCCESS = 3,
}

export const CreateCompanyForm = () => {
  const {
    form,
    currentStep,
    registerCompanyFormData,
    setRegisterCompanyFormData,
    setCurrentStep,
    validator,
    setIsRegisteringCompany,
  } = useRegisterCompanyContext()

  const { mutate, isPending } = useCreateCompanyAndAddress()

  useEffect(() => {
    setIsRegisteringCompany(false)

    if (isPending) {
      setIsRegisteringCompany(true)
    }
  }, [isPending, setIsRegisteringCompany])

  const nextStep = () => {
    const isLastStep = currentStep === Steps.USER
    if (isLastStep) return

    form.validateFields().then(() => {
      setRegisterCompanyFormData((prev) => ({
        ...prev,
        ...form.getFieldsValue(),
      }))

      setCurrentStep(currentStep + 1)
    })
  }

  const saveFormValuesInContext = () => {
    setRegisterCompanyFormData((prev) => ({
      ...prev,
      ...form.getFieldsValue(),
    }))
  }

  const prevStep = () => {
    saveFormValuesInContext()

    setCurrentStep(currentStep - 1)
  }

  const formatFormValuesToSubmit = () => {
    const lastStepFields = form.getFieldsValue()
    return {
      name: registerCompanyFormData.name,
      fantasyName: registerCompanyFormData.fantasyName,
      cnpj: registerCompanyFormData.cnpj?.replace(/[^\d]+/g, ""),
      email: lastStepFields.email,
      phone: registerCompanyFormData.phone?.replace(/[^\d]+/g, ""),
      password: lastStepFields.password,
      address: {
        cityIbge: registerCompanyFormData.cityIbge,
        zipCode: registerCompanyFormData.zipCode?.replace(/[^\d]+/g, ""),
        neighborhood: registerCompanyFormData.neighborhood,
        street: registerCompanyFormData.street,
        number: registerCompanyFormData.number.toString(),
        complement: registerCompanyFormData.complement,
      },
      validator: validator as string,
    }
  }

  const createCompany = () => {
    const formattedFormValues = formatFormValuesToSubmit()

    mutate(formattedFormValues)
  }

  const nextPageOrSubmit = () => {
    if (currentStep === Steps.USER) {
      createCompany()
    } else {
      nextStep()
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      style={{ width: "100%", marginTop: "20px" }}
    >
      {currentStep === Steps.COMPANY && <RegisterCompanyForm />}
      {currentStep === Steps.ADDRESS && <RegisterCompanyAddressForm />}
      {currentStep === Steps.USER && <RegisterUserForm />}
      {currentStep === Steps.SUCCESS && <h1>Cadastro concluído</h1>}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          onClick={prevStep}
          style={{ display: `${currentStep === 0 ? "none" : "block"}` }}
        >
          Voltar
        </Button>
        <Button type="primary" onClick={nextPageOrSubmit}>
          {currentStep === 2 ? "Criar minha conta" : "Próximo"}
        </Button>
      </div>
    </Form>
  )
}
