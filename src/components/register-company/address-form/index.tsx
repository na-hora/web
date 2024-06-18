import { Form, Input } from "antd";

export const RegisterCompanyAddressForm = () => {
  return (
    <>
      <Form.Item
        label="CEP"
        name="zipCode"
        rules={[{ required: true }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="cityId"
        rules={[{ required: true }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="neighborhood"
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rua"
        name="street"
        rules={[{ required: true }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Número"
        name="number"
        rules={[{ required: true }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Complemento" name="complement">
        <Input type="password" />
      </Form.Item>
    </>
  );
};
