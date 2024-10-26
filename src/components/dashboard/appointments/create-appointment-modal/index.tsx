import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { Button, Form, Input, Modal } from 'antd'

export const CreateAppointmentModal = () => {
  const {
    isCreateAppointmentModalOpen,
    setIsCreateAppointmentModalOpen,
    selectedDateFromCalendar,
  } = useAppointmentsContext()

  const formatDate = (date: string) => {
    const data = new Date(date)

    const dia = String(data.getUTCDate()).padStart(2, '0')
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0') // Os meses são indexados a partir de 0
    const ano = data.getUTCFullYear()
    const horas = String(data.getUTCHours()).padStart(2, '0')
    const minutos = String(data.getUTCMinutes()).padStart(2, '0')

    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`

    return dataFormatada
  }

  const submitForm = (values) => {
    console.log('values: ', values)
  }

  return (
    <Modal
      title='Agendamento'
      open={isCreateAppointmentModalOpen}
      onCancel={() => setIsCreateAppointmentModalOpen(false)}
      centered
      footer={[
        <Button
          key='back'
          onClick={() => setIsCreateAppointmentModalOpen(false)}
        >
          Cancelar
        </Button>,
        <Button key='submit' type='primary' onClick={submitForm}>
          Criar agendamento
        </Button>,
      ]}
    >
      <Form layout='vertical' onFinish={submitForm}>
        <Form.Item
          label='Início do atendimento'
          name='start'
          rules={[{ required: true, message: 'Cidade obrigatória' }]}
          required
        >
          <Input
            disabled
            defaultValue={formatDate(selectedDateFromCalendar.start)}
          />
        </Form.Item>

        <Form.Item
          label='Fim do atendimento'
          name='end'
          rules={[{ required: true, message: 'Cidade obrigatória' }]}
          required
        >
          <Input
            disabled
            defaultValue={formatDate(selectedDateFromCalendar.end)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
