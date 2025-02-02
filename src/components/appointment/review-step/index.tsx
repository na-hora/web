import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Col } from 'antd'
import dayjs from 'dayjs'

export const ReviewStep = () => {
  const { appointmentData } = useAppointmentContext()

  function addMinutesToTime() {
    const d = new Date(`1970-01-01T${appointmentData.appointmentTime}`)
    d.setTime(
      d.getTime() +
        (appointmentData.petService?.executionTime as number) * 60000,
    )
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Col style={{ textAlign: 'left', marginTop: '20px' }}>
      <h3>Confirme os dados do seu atendimento</h3>

      <p>
        <b>Nome:</b> {appointmentData.client.name}
      </p>
      <p>
        <b>Telefone:</b> {appointmentData.client.phone}
      </p>
      <p>
        <b>Email:</b> {appointmentData.client.email}
      </p>
      <p>
        <b>Serviço:</b> {appointmentData.petService?.name}
      </p>

      <p>
        <b>Data:</b>{' '}
        {dayjs(appointmentData.appointmentDate).format('DD/MM/YYYY')} às{' '}
        {appointmentData.appointmentTime} até {addMinutesToTime()}
      </p>
    </Col>
  )
}
