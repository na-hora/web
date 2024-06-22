import { Modal, Steps } from "antd"
import { PulseLoader } from "react-spinners"

import { CreateCompanyForm } from "@/components/register-company/form-wrapper"
import { useRegisterCompanyContext } from "../contexts/register-company-provider"
import styles from "./styles.module.css"

export const RegisterCompanyPage = () => {
  const { currentStep, setCurrentStep } = useRegisterCompanyContext()

  const isLoading = false

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <img src="/logo.svg" alt="Ǹa Hora" style={{ width: "150px" }} />
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

        <CreateCompanyForm />

        {isLoading && (
          <Modal
            open={isLoading}
            closeIcon={false}
            centered
            styles={{
              body: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: "20px",
                paddingBottom: "20px",
              },
              mask: { backdropFilter: "blur(15px)" },
              content: { backgroundColor: "#ffffff70", boxShadow: "none" },
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
