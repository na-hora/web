import { Form, Input } from "antd"

export const RegisterCompanyAddressForm = () => {
  return (
    <>
      <Form.Item label="CEP" name="zipCode">
        <Input />
      </Form.Item>

      <Form.Item label="Cidade" name="cityId">
        <Input />
      </Form.Item>

      <Form.Item label="Bairro" name="neighborhood">
        <Input />
      </Form.Item>

      <Form.Item label="Rua" name="street">
        <Input />
      </Form.Item>

      <Form.Item label="Número" name="number">
        <Input />
      </Form.Item>

      <Form.Item label="Complemento" name="complement">
        <Input type="password" />
      </Form.Item>
    </>
  )
}
