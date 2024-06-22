import { Button, Form, Modal, Steps } from "antd"
import { PulseLoader } from "react-spinners"
import { RegisterCompanyConfirmationForm } from "../../../components/register-company/confirmation-form"
import { useRegisterCompanyContext } from "../contexts/register-company-provider"

import { RegisterCompanyAddressForm } from "../../../components/register-company/address-form"
import { RegisterCompanyForm } from "../../../components/register-company/company-form"
import { useCreateCompanyAndAddress } from "../../../hooks/na-hora/company/use-create-company"
import styles from "./styles.module.css"

export const RegisterCompanyPage = () => {
  const {
    setRegisterCompanyFormData,
    form,
    validator,
    currentStep,
    setCurrentStep,
    registerCompanyFormData,
  } = useRegisterCompanyContext()
  const { mutate } = useCreateCompanyAndAddress()

  const nextStep = () => {
    const isNotLastStep = currentStep < 2
    if (isNotLastStep) {
      form.validateFields().then(() => {
        setRegisterCompanyFormData((prev) => ({
          ...prev,
          ...form.getFieldsValue(),
        }))

        setCurrentStep(currentStep + 1)
      })
    }
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

  const isLoading = false

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <img src="/logo.svg" alt="" style={{ width: "150px" }} />
        <h1>Obrigado por escolher o Na Hora!</h1>

        <div className={styles.steps}>
          <Steps
            current={currentStep}
            items={[
              {
                title: "Empresa",
                disabled: true,
                style: { cursor: "default" },
              },
              {
                title: "Endereço",
                disabled: true,
                style: { cursor: "default" },
              },
              {
                title: "Usuário",
                disabled: true,
                style: { cursor: "default" },
              },
            ]}
            onChange={setCurrentStep}
          />
        </div>

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

        {isLoading && (
          <Modal
            open={isLoading}
            closeIcon={false}
            styles={{
              body: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
              mask: { backdropFilter: "blur(15px)" },
              content: { background: "transparent", boxShadow: "none" },
            }}
            footer={null}
          >
            <h2>Aguarde um instante, estamos processando seu cadastro</h2>
            <PulseLoader color="blue" speedMultiplier={0.5} />
          </Modal>
        )}
      </section>
    </main>
  )
}
