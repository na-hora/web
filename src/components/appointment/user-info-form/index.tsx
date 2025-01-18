import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Form, Input } from 'antd'

export const UserInfoForm = () => {
  const { form } = useAppointmentContext()

  return (
    <Form form={form} layout='vertical' style={{ width: '100%' }}>
      <Form.Item
        label='Nome completo'
        name='name'
        rules={[{ required: true, message: 'Nome completo obrigatório' }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Telefone'
        name='phone'
        rules={[{ required: true, message: 'Telefone obrigatório' }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='E-mail'
        name='email'
        rules={[{ required: true, message: 'E-mail obrigatório' }]}
        required
      >
        <Input type='email' />
      </Form.Item>
    </Form>
  )
}
