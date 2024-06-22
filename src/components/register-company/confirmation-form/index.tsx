import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import {
  UseCreateCompanyAndAddressParams,
  useCreateCompanyAndAddress,
} from "../../../hooks/na-hora/company/use-create-company";
import { useRegisterCompanyContext } from "../../../pages/company/contexts/register-company-provider";

export const RegisterCompanyConfirmationForm = () => {
  const {
    registerCompanyFormData,
    form,
    setRegisterCompanyFormData,
    validator,
    setCurrentStep,
  } = useRegisterCompanyContext();

  const {
    mutate,
    isSuccess: isCreateCompanySuccess,
    isPending: isCreateCompanyPending,
  } = useCreateCompanyAndAddress();

  useEffect(() => {
    if (isCreateCompanySuccess) {
      setCurrentStep(3);
    }
  }, [isCreateCompanySuccess, setCurrentStep]);

  const getFormattedMutateFields = (): UseCreateCompanyAndAddressParams => {
    const newFields = form.getFieldsValue();
    return {
      name: registerCompanyFormData.name,
      fantasyName: registerCompanyFormData.fantasyName,
      cnpj: registerCompanyFormData.cnpj?.replace(/[^\d]+/g, ""),
      email: newFields.email,
      phone: registerCompanyFormData.phone?.replace(/[^\d]+/g, ""),
      password: newFields.password,
      address: {
        cityIbge: registerCompanyFormData.cityIbge,
        zipCode: registerCompanyFormData.zipCode?.replace(/[^\d]+/g, ""),
        neighborhood: registerCompanyFormData.neighborhood,
        street: registerCompanyFormData.street,
        number: registerCompanyFormData.number,
        complement: registerCompanyFormData.complement,
      },
      validator: validator as string,
    };
  };

  const onSubmit = () => {
    const newFields = form.getFieldsValue();

    form.validateFields().then(() => {
      setRegisterCompanyFormData((prev) => ({
        ...prev,
        email: newFields.email,
        password: newFields.password,
      }));

      const data = getFormattedMutateFields();
      mutate(data);
    });
  };

  return isCreateCompanyPending ? (
    <p>Criando sua conta...</p>
  ) : (
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
