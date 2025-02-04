import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Col, Divider, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'

export const ReviewStep = () => {
  const { appointmentData, company } = useAppointmentContext()

  function addMinutesToTime() {
    const d = new Date(`1970-01-01T${appointmentData.appointmentTime}`)
    d.setTime(
      d.getTime() +
        (appointmentData.petService?.executionTime as number) * 60000,
    )
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const generateMapLink = () => {
    if (!company) return

    const fullAddress = `${company?.address?.street}, ${company?.address?.number}, ${company?.address?.neighborhood}, ${company?.address?.city}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  }

  if (!appointmentData) {
    return (
      <Skeleton active />
    )
  }


  return (
    <Col style={{ textAlign: 'left', marginTop: '20px' }}>
      <h3>Confirme os dados do seu atendimento</h3>

      <p>
        <b>Nome:</b> {appointmentData?.client.name}
      </p>
      <p>
        <b>Telefone:</b> {appointmentData?.client.phone}
      </p>
      <p>
        <b>Email:</b> {appointmentData?.client.email}
      </p>
      <p>
        <b>Serviço:</b> {appointmentData?.petService?.name}
      </p>

      <p>
        <b>Data:</b>{' '}
        {dayjs(appointmentData?.appointmentDate).format('DD/MM/YYYY')} às{' '}
        {appointmentData?.appointmentTime} até {addMinutesToTime()}
      </p>

      {appointmentData?.petName && (
        <p>
          <b>Nome do pet:</b> {appointmentData?.petName}
        </p>
      )}

      {appointmentData?.note && (
        <p>
          <b>Observações:</b> {appointmentData?.note}
        </p>
      )}

      <Divider />

      <p>
        <b>{company?.fantasyName}</b>
      </p>

      <p>
        <b>Endereço: </b>
          {company?.address?.street},&nbsp;
          {company?.address?.number},&nbsp;
          {company?.address?.neighborhood},&nbsp;
          {company?.address?.city},&nbsp;
          {company?.address?.state}
      </p>

      <Typography.Text>
        <a href={generateMapLink()} target="_blank" rel="noopener noreferrer">
          Ver no mapa
        </a>
      </Typography.Text>

    </Col>
  )
}
