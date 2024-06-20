import { Button, Form, Steps } from "antd";
import { useState } from "react";
import { RegisterCompanyAddressForm } from "../../../components/register-company/address-form";
import { RegisterCompanyForm } from "../../../components/register-company/company-form";
import { RegisterCompanyConfirmationForm } from "../../../components/register-company/confirmation-form";
import { useRegisterCompanyContext } from "../contexts/register-company-provider";

export const RegisterCompanyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setRegisterCompanyFormData } = useRegisterCompanyContext();

  const [form] = Form.useForm();
  const nextStep = () => {
    if (currentStep < 2) {
      form.validateFields().then(() => {
        setRegisterCompanyFormData((prev) => ({
          ...prev,
          ...form.getFieldsValue(),
        }));

        setCurrentStep(currentStep + 1);
      });
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
              disabled: true,
            },
            {
              title: "Endereço",
              disabled: true,
            },
            {
              title: "Confirmação",
              disabled: true,
            },
          ]}
          onChange={setCurrentStep}
        />
        <Form layout="vertical" form={form}>
          {currentStep === 0 && <RegisterCompanyForm />}
          {currentStep === 1 && <RegisterCompanyAddressForm />}
          {currentStep === 2 && <RegisterCompanyConfirmationForm />}

          <Button onClick={prevStep}>Voltar</Button>
          <Button onClick={nextStep}>Avançar</Button>
        </Form>
      </section>
    </main>
  );
};
