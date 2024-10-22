import { Button, Form, Input, Modal } from 'antd'

type Props = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  dates: any
}
export const CreateAppointmentModal = ({ isOpen, setIsOpen, dates }: Props) => {
  console.log('dates: ', dates)
  console.log('dates: ', new Date(dates.start).toLocaleDateString('pt-BR'))

  const formatDate = (date) => {
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
      open={isOpen}
      centered
      footer={[
        <Button key='back' onClick={() => setIsOpen(false)}>
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
          <Input disabled defaultValue={formatDate(dates.start)} />
        </Form.Item>

        <Form.Item
          label='Fim do atendimento'
          name='end'
          rules={[{ required: true, message: 'Cidade obrigatória' }]}
          required
        >
          <Input disabled defaultValue={formatDate(dates.end)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
