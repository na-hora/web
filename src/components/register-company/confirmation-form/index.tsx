import { useRegisterCompanyContext } from "@/pages/company/contexts/register-company-provider";
import { Form, Input } from "antd";

export const RegisterCompanyConfirmationForm = () => {
  const { form } = useRegisterCompanyContext();

  return (
    <>
      <h2>Estamos quase lá! Informe seu e-mail e crie sua senha de acesso</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email obrigatório" }]}
        required
      >
        <Input placeholder="Digite seu e-mail para acesso" />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        hasFeedback
        rules={[
          { required: true, message: "Senha obrigatória" },
          {
            min: 6,
            message: "Senha deve ter no mínimo 6 caracteres!",
          },
        ]}
        required
      >
        <Input.Password placeholder="Digite sua senha" type="password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirme a senha"
        hasFeedback
        rules={[
          { required: true, message: "Confirme sua senha" },
          {
            validator: (_, value) => {
              if (value !== form.getFieldValue("password")) {
                return Promise.reject("As senhas precisam ser iguais");
              }
              return Promise.resolve();
            },
          },
        ]}
        required
      >
        <Input.Password placeholder="Confirme sua senha" type="password" />
      </Form.Item>
    </>
  );
};
