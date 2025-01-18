import { useLoadPetSizes } from '@/hooks/na-hora/pet-size/use-load-pet-sizes'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Row } from 'antd'

export const AnimalSize = () => {
  const { companyId, appointmentData, setAppointmentData } =
    useAppointmentContext()

  const { data: petSizes } = useLoadPetSizes(
    companyId || '5478b7e4-2469-40b5-ad26-2c4b9490c178',
  )

  const setPetSizeId = (petSizeId: number) => {
    setAppointmentData({
      ...appointmentData,
      petSizeId: petSizeId,
    })
  }

  return (
    <>
      <p>
        Nos informe o <b style={{ color: '#3196b5' }}>porte do seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petSizes?.map((petSize) => (
          <Col>
            <Button
              onClick={() => setPetSizeId(petSize.id)}
              style={{
                border: '1px solid #3196b5',
                padding: '8px',
                borderRadius: '20px',
                width: '150px',
                backgroundColor:
                  petSize.id === appointmentData?.petSizeId ? '#3196b5' : '',
              }}
            >
              <h3
                style={{
                  color:
                    petSize.id === appointmentData?.petSizeId
                      ? '#fff'
                      : '#3196b5',
                }}
              >
                {petSize.name}
              </h3>
            </Button>

            <p style={{ marginTop: '4px', fontSize: '12px' }}>
              {petSize.description}
            </p>
          </Col>
        ))}
      </Row>
    </>
  )
}
