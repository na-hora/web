import { Button, Form, Steps } from "antd"
import { RegisterCompanyAddressForm } from "../../../components/register-company/address-form"
import { RegisterCompanyForm } from "../../../components/register-company/company-form"
import { RegisterCompanyConfirmationForm } from "../../../components/register-company/confirmation-form"
import { useRegisterCompanyContext } from "../contexts/register-company-provider"

import styles from "./styles.module.css"

export const RegisterCompanyPage = () => {
  const {
    setRegisterCompanyFormData,
    form,
    validator,
    currentStep,
    setCurrentStep,
  } = useRegisterCompanyContext()

  const nextStep = () => {
    if (currentStep < 2) {
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

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <img src="/logo.svg" alt="" style={{ width: "150px" }} />
        <h1>Obrigado por escolher o Na Hora!</h1>

        <div className={styles.center}>
          <Steps
            current={currentStep}
            items={[
              {
                title: "Empresa",
                disabled: true,
              },
              {
                title: "Endereço",
                disabled: true,
              },
              {
                title: "Usuário",
                disabled: true,
              },
            ]}
            onChange={setCurrentStep}
          />
        </div>

        {validator ? (
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
              <Button type="primary" onClick={nextStep}>
                {currentStep === 2 ? "Criar minha conta" : "Próximo"}
              </Button>
            </div>
          </Form>
        ) : (
          <h1>Link inválido</h1>
        )}
      </section>
    </main>
  )
}
