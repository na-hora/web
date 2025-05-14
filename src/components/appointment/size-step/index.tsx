import { useLoadHairsAndSizesByType } from '@/hooks/na-hora/pet-type/use-load-hairs-and-sizes-by-type'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Row, Skeleton } from 'antd'

export const AnimalSize = () => {
  const { appointmentData, setAppointmentData } = useAppointmentContext()

  const { data: petHairsAndSizes, isFetching } = useLoadHairsAndSizesByType(
    appointmentData?.companyId as string,
    appointmentData?.petTypeId as number,
  )

  const setPetSizeId = (petSizeId: number) => {
    setAppointmentData({
      ...appointmentData,
      petService: null,
      petSizeId: petSizeId,
    })
  }

  if (isFetching) {
    return (
      <>
        <p>
          Nos informe o <b style={{ color: '#3196b5' }}>porte do seu pet</b>
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
        Nos informe o <b style={{ color: '#3196b5' }}>porte do seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petHairsAndSizes?.sizes?.map((petSize) => (
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
