import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { formatToCurrency } from '@/utils/currency'
import { Col } from 'antd'

export const PriceFooter = () => {
  const { serviceValue } = useAppointmentContext()

  if (!serviceValue) {
    return null
  }

  return (
    <Col
      style={{
        position: 'fixed',
        bottom: '20px',
        backgroundColor: '#e9e9e9',
        padding: '10px',
        borderRadius: '12px',
      }}
    >
      <p style={{ fontSize: '1.2rem' }}>
        Valor <strong style={{ color: 'red' }}>estimado</strong> do atendimento:
        <strong> {formatToCurrency(serviceValue || 0)}</strong>
      </p>

      <p>
        O pagamento será realizado na hora do atendimento. O valor mostrado
        acima pode variar.
      </p>
    </Col>
  )
}
