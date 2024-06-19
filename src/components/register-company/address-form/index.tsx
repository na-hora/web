import { Form, Input } from "antd"

export const RegisterCompanyAddressForm = () => {
  return (
    <>
      <Form.Item
        label="CEP"
        name="zipCode"
        rules={[{ required: true, message: "CEP obrigatório" }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="cityId"
        rules={[{ required: true, message: "Cidade obrigatória" }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="neighborhood"
        rules={[{ required: true, message: "Bairro obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rua"
        name="street"
        rules={[{ required: true, message: "Rua obrigatória" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Número"
        name="number"
        rules={[{ required: true, message: "Número obrigatório" }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Complemento" name="complement">
        <Input type="password" />
      </Form.Item>
    </>
  )
}
