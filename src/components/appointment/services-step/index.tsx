import { useLoadSpecificsPetServices } from '@/hooks/na-hora/pet-services/use-load-specifics-pet-services'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Flex, Row, Skeleton, Space } from 'antd'
import styles from './styles.module.css'

export const AnimalServices = () => {
  const { companyId, appointmentData, setAppointmentData } =
    useAppointmentContext()

  const params = {
    companyId: companyId || '5478b7e4-2469-40b5-ad26-2c4b9490c178',
    petHairId: appointmentData.petHairId,
    petSizeId: appointmentData.petSizeId,
    petTypeId: appointmentData.petTypeId,
  }

  const { data: petServices, isFetching } = useLoadSpecificsPetServices(params)

  const savePetServiceId = (petServiceId: number) => {
    setAppointmentData({
      ...appointmentData,
      petServiceId: petServiceId,
    })
  }

  if (isFetching) {
    return (
      <Flex gap='middle' vertical>
        <p>
          Nos informe o{' '}
          <b style={{ color: '#3196b5' }}>
            serviço que você deseja para seu pet
          </b>
        </p>
        <Space className={styles.skeleton}>
          <Skeleton.Image
            active={true}
            style={{ height: '60px', width: '60px' }}
          />
          <Skeleton.Input active={true} size='small' />
        </Space>
        <Space className={styles.skeleton}>
          <Skeleton.Image
            active={true}
            style={{ height: '60px', width: '60px' }}
          />
          <Skeleton.Input active={true} size='small' />
        </Space>
      </Flex>
    )
  }

  return (
    <>
      <p>
        Nos informe o{' '}
        <b style={{ color: '#3196b5' }}>serviço que você deseja para seu pet</b>
      </p>

      <Row justify='space-evenly'>
        {petServices?.services.map((petService) => (
          <Button
            key={petService.id}
            onClick={() => savePetServiceId(petService.id)}
            className={styles.button}
            style={{
              border: `${
                petService.id === appointmentData.petServiceId
                  ? '2px solid #3196b5'
                  : 'none'
              }`,
            }}
          >
            {/* <img src={petImageUrl(petService.name)} height={100} /> */}
            <h3>{petService.name}</h3>
          </Button>
        ))}
      </Row>
    </>
  )
}
