import { useLoadHairsAndSizesByType } from '@/hooks/na-hora/pet-type/use-load-hairs-and-sizes-by-type'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Row, Skeleton } from 'antd'

export const AnimalHair = () => {
  const { appointmentData, setAppointmentData } = useAppointmentContext()

  const { data: petHairsAndSizes, isFetching } = useLoadHairsAndSizesByType(
    appointmentData?.companyId as string,
    appointmentData?.petTypeId as number,
  )

  const setPetHairId = (petHairId: number) => {
    setAppointmentData({
      ...appointmentData,
      petService: null,
      petHairId: petHairId,
    })
  }

  if (isFetching) {
    return (
      <>
        <p>
          Nos informe a <b style={{ color: '#3196b5' }}>pelagem do seu pet</b>
        </p>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Skeleton.Button active shape='round' block />
          </Col>
          <Col span={12}>
            <Skeleton.Button active shape='round' block />
          </Col>
          <Col span={12}>
            <Skeleton.Button active shape='round' block />
          </Col>
          <Col span={12}>
            <Skeleton.Button active shape='round' block />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <p>
        Nos informe a <b style={{ color: '#3196b5' }}>pelagem do seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petHairsAndSizes?.hairs?.map((petHair) => (
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
