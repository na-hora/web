import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button } from 'antd'

export const AnimalType = () => {
  // const companyCookie = parseCookies()['inf@na-hora']
  // const { id: companyId } = JSON.parse(companyCookie)
  const { appointmentData, setAppointmentData } = useAppointmentContext()
  console.log('appointmentData: ', appointmentData)

  const { data: petTypes, isLoading } = useLoadPetTypes(
    '5478b7e4-2469-40b5-ad26-2c4b9490c178',
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

  return (
    <>
      <p>
        Nos informe o <b style={{ color: '#3196b5' }}>tipo do seu pet</b>
      </p>

      {petTypes?.map((petType) => (
        <Button
          key={petType.id}
          onClick={() => savePetTypeId(petType.id)}
          style={{
            borderRadius: '20px',
            boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.05)',
            margin: '20px',
            width: '100%',
            height: '100px',
            border: `${
              petType.id === appointmentData.petTypeId
                ? '2px solid #3196b5'
                : 'none'
            }`,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <img src={petImageUrl(petType.name)} height={100} />
          <h3>{petType.name}</h3>
        </Button>
      ))}
    </>
  )
}
