import { Button, Steps } from "antd";
import { useState } from "react";
import { RegisterCompanyAddressForm } from "../../../components/register-company/address-form";
import { RegisterCompanyForm } from "../../../components/register-company/company-form";
import { RegisterCompanyConfirmationForm } from "../../../components/register-company/confirmation-form";

export const RegisterCompany = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main
      style={{
        background: "lightblue",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <section
        style={{
          margin: "0 auto",
          maxWidth: "1200px",
          border: "1px solid red",
          textAlign: "center",
        }}
      >
        <img src="/logo.png" alt="" style={{ width: "300px" }} />
        <h1>Register Company</h1>
        <p>Vamos lá! Primeiro, preencha os dados abaixo:</p>

        <Steps
          current={currentStep}
          items={[
            {
              title: "Dados Pessoais",
            },
            {
              title: "Endereço",
            },
            {
              title: "Confirmação",
              disabled: currentStep < 1,
            },
          ]}
          onChange={setCurrentStep}
        />

        {currentStep === 0 && <RegisterCompanyForm />}
        {currentStep === 1 && <RegisterCompanyAddressForm />}
        {currentStep === 2 && <RegisterCompanyConfirmationForm />}
      </section>
      <Button onClick={prevStep}>Voltar</Button>
      <Button onClick={nextStep}>Avançar</Button>
    </main>
  );
};
