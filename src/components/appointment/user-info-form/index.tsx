import { Form, Input } from 'antd'

export const UserInfoForm = () => {
  return (
    <>
      <Form.Item
        label='Nome completo'
        name='name'
        rules={[{ required: true, message: 'Nome completo obrigatório' }]}
        required
      >
        <Input placeholder='Nome completo' />
      </Form.Item>

      <Form.Item
        label='Telefone'
        name='phone'
        rules={[{ required: true, message: 'Telefone obrigatório' }]}
        required
      >
        <Input placeholder='Telefone' />
      </Form.Item>

      <Form.Item
        label='E-mail'
        name='email'
        rules={[{ required: true, message: 'E-mail obrigatório' }]}
        required
      >
        <Input placeholder='E-mail' />
      </Form.Item>
    </>
  )
}
