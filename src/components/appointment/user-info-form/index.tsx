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
      client: form.getFieldsValue(['name', 'phone', 'email']),
      petName: form.getFieldValue('petName'),
      note: form.getFieldValue('note'),
    }))
  }

  return (
    <>
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
          rules={[
            { required: true, message: 'Telefone obrigatório' },
            { min: 14, message: 'Telefone inválido' },
          ]}
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

        <Form.Item label='Nome do seu pet' name='petName'>
          <Input onChange={(e) => handleOnChange('petName', e.target.value)} />
        </Form.Item>

        <Form.Item label='Alguma informação adicional?' name='note'>
          <Input.TextArea
            onChange={(e) => handleOnChange('note', e.target.value)}
          />
        </Form.Item>
      </Form>

      <p style={{ fontSize: '12px' }}>
        <b style={{ color: 'red' }}>Importante: </b>
        Utilize um número de telefone com Whatsapp para poder confirmar o
        agendamento.
      </p>
    </>
  )
}
