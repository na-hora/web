import { PhoneInput } from '@/components/inputs/phone'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { phoneMask } from '@/utils/masks'
import { Form, Input } from 'antd'

export const UserInfoForm = () => {
  const { form, setAppointmentData } = useAppointmentContext()

  const handleOnChange = (inputName: string, value: string) => {
    form.setFieldValue(inputName, value)

    setAppointmentData((prev: any) => ({
      ...prev,
      client: form.getFieldsValue(),
    }))
  }

  return (
    <Form form={form} layout='vertical' style={{ width: '100%' }}>
      <Form.Item
        label='Nome completo'
        name='name'
        rules={[{ required: true, message: 'Nome completo obrigatório' }]}
        required
      >
        <Input onChange={(e) => handleOnChange('name', e.target.value)} />
      </Form.Item>

      <Form.Item
        label='Telefone'
        name='phone'
        rules={[{ required: true, message: 'Telefone obrigatório' }]}
        required
      >
        <PhoneInput
          onChange={(e) => {
            form.setFieldValue('phone', phoneMask(e.target.value))
            handleOnChange('phone', phoneMask(e.target.value))
          }}
        />
      </Form.Item>

      <Form.Item
        label='E-mail'
        name='email'
        rules={[
          {
            type: 'email',
            message: 'Esse não é um e-mail válido',
          },
          {
            required: true,
            message: 'E-mail obrigatório',
          },
        ]}
        required
      >
        <Input
          type='email'
          onChange={(e) => handleOnChange('email', e.target.value)}
        />
      </Form.Item>
    </Form>
  )
}
