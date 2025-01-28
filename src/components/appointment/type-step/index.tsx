import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Flex, Skeleton, Space } from 'antd'
import styles from './styles.module.css'

export const AnimalType = () => {
  const { appointmentData, setAppointmentData, companyId } =
    useAppointmentContext()

  const { data: petTypes, isFetching } = useLoadPetTypes(
    companyId || '5478b7e4-2469-40b5-ad26-2c4b9490c178',
  )

  const savePetTypeId = (petTypeId: number) => {
    setAppointmentData({
      ...appointmentData,
      petTypeId: petTypeId,
    })
  }

  const petImageUrl = (petName: string): string => {
    if (
      petName.toLowerCase() === 'cachorro' ||
      petName.toLowerCase() === 'cão'
    ) {
      return '/imgs/appointment/dog-avatar.png'
    }

    if (petName.toLowerCase() === 'Gato' || petName.toLowerCase() === 'gato') {
      return '/imgs/appointment/cat-avatar.png'
    }

    return ''
  }

  if (isFetching) {
    return (
      <Flex gap='middle' vertical>
        <p>
          Nos informe o <b style={{ color: '#3196b5' }}>tipo do seu pet</b>
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
        Nos informe o <b style={{ color: '#3196b5' }}>tipo do seu pet</b>
      </p>

      {petTypes?.map((petType) => (
        <Button
          key={petType.id}
          onClick={() => savePetTypeId(petType.id)}
          className={styles.button}
          style={{
            border: `${
              petType.id === appointmentData.petTypeId
                ? '2px solid #3196b5'
                : 'none'
            }`,
          }}
        >
          <Space>
            <img src={petImageUrl(petType.name)} height={100} />
            <h3>{petType.name}</h3>
          </Space>
        </Button>
      ))}
    </>
  )
}
