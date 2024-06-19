import { Form, Input } from "antd"

export const RegisterCompanyForm = () => {
  return (
    <>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Nome obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nome fantasia"
        name="fantasyName"
        rules={[{ required: true, message: "Nome fantasia obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="CNPJ"
        name="cnpj"
        rules={[{ required: true, message: "CNPJ obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefone"
        name="phone"
        rules={[{ required: true, message: "Telefone obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: "Senha obrigatória" }]}
        required
      >
        <Input type="password" />
      </Form.Item>
    </>
  )
}
