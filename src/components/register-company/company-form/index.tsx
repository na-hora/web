import { Form, Input } from "antd"

export const RegisterCompanyForm = () => {
  return (
    <>
      <Form.Item label="Nome" name="name" required>
        <Input />
      </Form.Item>

      <Form.Item label="Nome fantasia" name="fantasyName" required>
        <Input />
      </Form.Item>

      <Form.Item label="CNPJ" name="cnpj" required>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" required>
        <Input />
      </Form.Item>

      <Form.Item label="Telefone" name="phone" required>
        <Input />
      </Form.Item>

      <Form.Item label="Senha" name="password" required>
        <Input type="password" />
      </Form.Item>
    </>
  )
}
