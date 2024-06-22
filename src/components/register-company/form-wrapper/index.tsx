import { RegisterCompanyAddressForm } from "@/components/register-company/address-form"
import { RegisterCompanyConfirmationForm } from "@/components/register-company/confirmation-form"
import { useCreateCompanyAndAddress } from "@/hooks/na-hora/company/use-create-company"
import { useRegisterCompanyContext } from "@/pages/company/contexts/register-company-provider"
import { Button, Form } from "antd"
import { RegisterCompanyForm } from "../company-form"

export const CreateCompanyForm = () => {
  const {
    form,
    currentStep,
    registerCompanyFormData,
    setRegisterCompanyFormData,
    setCurrentStep,
    validator,
  } = useRegisterCompanyContext()

  const { mutate } = useCreateCompanyAndAddress()

  const nextStep = () => {
    const isLastStep = currentStep === 2
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
    if (currentStep === 2) {
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
      {currentStep === 0 && <RegisterCompanyForm />}
      {currentStep === 1 && <RegisterCompanyAddressForm />}
      {currentStep === 2 && <RegisterCompanyConfirmationForm />}
      {currentStep === 3 && <h1>Cadastro concluído</h1>}

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
