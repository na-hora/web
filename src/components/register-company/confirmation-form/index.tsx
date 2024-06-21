import { Button, Form, Input } from "antd";

export const RegisterCompanyConfirmationForm = () => {
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
        rules={[{ required: true }]}
        required
      >
        <Input placeholder="Digite sua senha" type="password" />
      </Form.Item>

      <Form.Item
        label="Confirme a senha"
        name="confirmPassword"
        rules={[{ required: true }]}
        required
      >
        <Input placeholder="Confirme sua senha" type="password" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Criar minha conta
        </Button>
      </Form.Item>
    </>
  );
};
