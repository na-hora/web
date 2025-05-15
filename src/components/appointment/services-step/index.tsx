import { SpecificPetService } from '@/hooks/na-hora/pet-services/types/load-specifics-services.type'
import { useLoadSpecificsPetServices } from '@/hooks/na-hora/pet-services/use-load-specifics-pet-services'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { formatToCurrency } from '@/utils/currency'
import { Button, Col, Flex, Row, Skeleton, Space } from 'antd'
import styles from './styles.module.css'

export const AnimalServices = () => {
  const { appointmentData, setAppointmentData } = useAppointmentContext()

  const params = {
    companyId: appointmentData.companyId as string,
    petHairId: appointmentData.petHairId as number,
    petSizeId: appointmentData.petSizeId as number,
    petTypeId: appointmentData.petTypeId as number,
  }
  const { data: petServices, isFetching } = useLoadSpecificsPetServices(params)

  const savePetService = (petService: SpecificPetService) => {
    setAppointmentData({
      ...appointmentData,
      petService,
    })
  }

  const serviceImage = (serviceName: string): string => {
    const serviceNameLowerCase = serviceName.toLowerCase()

    if (serviceNameLowerCase.includes('banho')) {
      return '/imgs/appointment/shower.png'
    }

    if (serviceNameLowerCase.includes('tosa')) {
      return '/imgs/appointment/scissor.png'
    }

    return '/imgs/appointment/generic-service.png'
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
        {petServices?.services?.length ? (
          petServices?.services.map((petService) => (
            <Button
              key={petService.id}
              onClick={() => savePetService(petService)}
              className={styles.button}
              style={{
                border: `${
                  petService.id === appointmentData.petService?.id
                    ? '2px solid #3196b5'
                    : 'none'
                }`,
              }}
            >
              <img src={serviceImage(petService.name)} height={100} />
              <Col style={{ textAlign: 'left' }}>
                <h3>{petService.name}</h3>
                <p style={{ fontSize: '12px' }}>
                  Valor:&nbsp;
                  {petService.price === 0
                    ? 'Consultar'
                    : formatToCurrency(petService.price)}
                </p>
              </Col>
            </Button>
          ))
        ) : (
          <p>Não atendemos essa combinação atualmente...</p>
        )}

        <p style={{ fontSize: '12px' }}>
          <b style={{ color: 'red' }}>Atenção: </b>
          Os valores dos serviços são estimados, o pagamento será feito
          diretamente ao Petshop.
          <br />
          Qualquer dúvida, entrar em contato diretamente com o estabelecimento.
        </p>
      </Row>
    </>
  )
}
