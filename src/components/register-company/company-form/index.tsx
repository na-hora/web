import { Form, Input } from "antd";

export const RegisterCompanyForm = () => {
  return (
    <>
      <Form.Item label="Nome" name="name" rules={[{ required: true }]} required>
        <Input />
      </Form.Item>

      <Form.Item
        label="Nome fantasia"
        name="fantasyName"
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true }]} required>
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefone"
        name="phone"
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true }]}
        required
      >
        <Input type="password" />
      </Form.Item>
    </>
  );
};
