import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Row } from 'antd'

export const AnimalServices = () => {
  const { companyId, appointmentData, setAppointmentData } =
    useAppointmentContext()

  const { data: petServices } = useLoadPetServices(
    companyId || '5478b7e4-2469-40b5-ad26-2c4b9490c178',
  )

  const setpetServiceId = (petServiceId: number) => {
    setAppointmentData({
      ...appointmentData,
      petServiceId: petServiceId,
    })
  }

  return (
    <>
      <p>
        Nos informe o{' '}
        <b style={{ color: '#3196b5' }}>serviço que você deseja para seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petServices?.map((petService) => (
          <Col>
            <Button
              onClick={() => setpetServiceId(petService.id)}
              style={{
                border: '1px solid #3196b5',
                padding: '8px',
                borderRadius: '20px',
                width: '150px',
                backgroundColor:
                  petService.id === appointmentData?.petServiceId
                    ? '#3196b5'
                    : '',
              }}
            >
              <h3
                style={{
                  color:
                    petService.id === appointmentData?.petServiceId
                      ? '#fff'
                      : '#3196b5',
                }}
              >
                {petService.name}
              </h3>
            </Button>
          </Col>
        ))}
      </Row>
    </>
  )
}
