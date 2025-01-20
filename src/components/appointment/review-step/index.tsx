import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Col } from 'antd'
import dayjs from 'dayjs'

export const ReviewStep = () => {
  const { appointmentData } = useAppointmentContext()

  return (
    <Col style={{ textAlign: 'left', marginTop: '20px' }}>
      <h3>Confirme os dados do seu atendimento</h3>

      <p>
        <b>Nome:</b> {appointmentData.user.name}
      </p>
      <p>
        <b>Telefone:</b> {appointmentData.user.phone}
      </p>
      <p>
        <b>Email:</b> {appointmentData.user.email}
      </p>
      <p>
        <b>Serviço:</b> *TODO*
      </p>

      <p>
        <b>Data:</b>{' '}
        {dayjs(appointmentData.appointmentDate).format('DD/MM/YYYY')} às{' '}
        {appointmentData.appointmentTime}
      </p>
    </Col>
  )
}
