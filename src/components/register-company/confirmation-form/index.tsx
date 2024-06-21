import { Button, Form, Input } from "antd";
import { useCreateCompanyAndAddress } from "../../../hooks/na-hora/company/use-create-company";
import { useRegisterCompanyContext } from "../../../pages/company/contexts/register-company-provider";

export const RegisterCompanyConfirmationForm = () => {
  const {
    registerCompanyFormData,
    form,
    setRegisterCompanyFormData,
    validator,
  } = useRegisterCompanyContext();

  const { mutate } = useCreateCompanyAndAddress();

  const onSubmit = () => {
    const newFields = form.getFieldsValue();

    form.validateFields().then(() => {
      setRegisterCompanyFormData((prev) => ({
        ...prev,
        email: newFields.email,
        password: newFields.password,
      }));

      mutate({
        ...registerCompanyFormData,
        ...newFields,
        cnpj: registerCompanyFormData.cnpj.replace(/[^\d]+/g, ""),
        phone: registerCompanyFormData.phone.replace(/[^\d]+/g, ""),
        validator,
      });
    });
  };

  return (
    <>
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
        rules={[{ required: true, message: "Senha obrigatória" }]}
        required
      >
        <Input placeholder="Digite sua senha" type="password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirme a senha"
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
        <Input placeholder="Confirme sua senha" type="password" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Criar minha conta
        </Button>
      </Form.Item>
    </>
  );
};
