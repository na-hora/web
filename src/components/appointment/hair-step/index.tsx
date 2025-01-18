import { useLoadPetHairs } from '@/hooks/na-hora/pet-hair/use-load-pet-hairs'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Row } from 'antd'

export const AnimalHair = () => {
  const { companyId, appointmentData, setAppointmentData } =
    useAppointmentContext()

  const { data: petHairs } = useLoadPetHairs(
    companyId || '5478b7e4-2469-40b5-ad26-2c4b9490c178',
  )

  const setPetHairId = (petHairId: number) => {
    setAppointmentData({
      ...appointmentData,
      petHairId: petHairId,
    })
  }

  return (
    <>
      <p>
        Nos informe a <b style={{ color: '#3196b5' }}>pelagem do seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petHairs?.map((petHair) => (
          <Col>
            <Button
              onClick={() => setPetHairId(petHair.id)}
              style={{
                border: '1px solid #3196b5',
                padding: '8px',
                borderRadius: '20px',
                width: '150px',
                backgroundColor:
                  petHair.id === appointmentData?.petHairId ? '#3196b5' : '',
              }}
            >
              <h3
                style={{
                  color:
                    petHair.id === appointmentData?.petHairId
                      ? '#fff'
                      : '#3196b5',
                }}
              >
                {petHair.name}
              </h3>
            </Button>

            <p style={{ marginTop: '4px', fontSize: '12px' }}>
              {petHair.description}
            </p>
          </Col>
        ))}
      </Row>
    </>
  )
}
