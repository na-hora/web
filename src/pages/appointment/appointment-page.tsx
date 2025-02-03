import { AppointmentButton } from '@/buttons/appointment'
import { Confirmation } from '@/components/appointment/confirmation'
import { AnimalHair } from '@/components/appointment/hair-step'
import { InitialStep } from '@/components/appointment/initial-step'
import { AppointmentProgressBar } from '@/components/appointment/progress-bar'
import { ReviewStep } from '@/components/appointment/review-step'
import { Schedule } from '@/components/appointment/schedule'
import { AnimalServices } from '@/components/appointment/services-step'
import { AnimalSize } from '@/components/appointment/size-step'
import { AnimalType } from '@/components/appointment/type-step'
import { UserInfoForm } from '@/components/appointment/user-info-form'
import { useCreateAppointment } from '@/hooks/na-hora/appointments/use-create-appointment'
import { removePhoneMask } from '@/utils/masks'
import { convertDateTOISO8601WithTimezone } from '@/utils/time'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppointmentContext } from './contexts/appointments-provider'
import styles from './styles.module.css'

enum STEPS {
  INITIAL = 0,
  PET_TYPE = 1,
  PET_SIZE = 2,
  PET_HAIR = 3,
  PET_SERVICE = 4,
  SCHEDULE = 5,
  USER_INFO = 6,
  REVIEW = 7,
  CONFIRMATION = 8,
}

const STEP_COMPONENTS = {
  [STEPS.INITIAL]: InitialStep,
  [STEPS.PET_TYPE]: AnimalType,
  [STEPS.PET_SIZE]: AnimalSize,
  [STEPS.PET_HAIR]: AnimalHair,
  [STEPS.PET_SERVICE]: AnimalServices,
  [STEPS.SCHEDULE]: Schedule,
  [STEPS.USER_INFO]: UserInfoForm,
  [STEPS.REVIEW]: ReviewStep,
  [STEPS.CONFIRMATION]: Confirmation,
}

const stepValidations: { [key: number]: (data: any) => any } = {
  [STEPS.INITIAL]: (data: any) => ({
    isValid: !!data.companyId,
    message: 'Selecione uma empresa',
  }),
  [STEPS.PET_TYPE]: (data: any) => ({
    isValid: !!data.petTypeId,
    message: 'Selecione um tipo de animal',
  }),
  [STEPS.PET_SIZE]: (data: any) => ({
    isValid: !!data.petSizeId,
    message: 'Selecione um tamanho de animal',
  }),
  [STEPS.PET_HAIR]: (data: any) => ({
    isValid: !!data.petHairId,
    message: 'Selecione o tamanho da pelagem',
  }),
  [STEPS.PET_SERVICE]: (data: any) => ({
    isValid: !!data.petService?.id,
    message: 'Selecione um serviço',
  }),
  [STEPS.SCHEDULE]: (data: any) => ({
    isValid: !!data.appointmentDate,
    message: 'Selecione um horário',
  }),
  [STEPS.USER_INFO]: (data: any) => ({
    isValid: !!(data.client.name && data.client.email && data.client.phone),
    message: 'Preencha os dados do cliente',
  }),
}

const stepImage = (currentStep: number) => {
  switch (currentStep) {
    case STEPS.INITIAL:
      return '/imgs/appointment/beagle-sitting.png'
    case STEPS.PET_TYPE:
      return '/imgs/appointment/woman-with-dog.png'
    case STEPS.PET_SIZE:
      return '/imgs/appointment/dog-size.png'
    case STEPS.PET_HAIR:
      return '/imgs/appointment/barbershop.png'
    case STEPS.PET_SERVICE:
      return '/imgs/appointment/service.png'
    default:
      return '/imgs/appointment/beagle-sitting.png'
  }
}

export const AppointmentPage = () => {
  const {
    currentStep,
    appointmentData,
    setAppointmentData,
    nextStep,
    prevStep,
  } = useAppointmentContext()
  const { mutate: createAppointment, isPending: isCreating } =
    useCreateAppointment()
  const [disabledMessage, setDisabledMessage] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const companyId = searchParams.get('q')
    if (companyId) {
      setAppointmentData((prev) => ({ ...prev, companyId }))
    }
  }, [searchParams, setAppointmentData])

  const formatDataToCreateAppointment = () => ({
    companyId: appointmentData.companyId as string,
    companyPetSizeId: appointmentData.petSizeId as number,
    companyPetHairId: appointmentData.petHairId as number,
    companyPetServiceId: appointmentData.petService?.id as number,
    startTime: convertDateTOISO8601WithTimezone(
      appointmentData.appointmentDateString as string,
      appointmentData.appointmentTime as string,
    ),
    client: {
      name: appointmentData.client.name,
      email: appointmentData.client.email,
      phone: removePhoneMask(appointmentData.client.phone),
    },
  })

  const handleSubmit = () => {
    if (currentStep === STEPS.REVIEW) {
      createAppointment({ body: formatDataToCreateAppointment() })
      return
    }

    nextStep()
  }

  const isButtonDisabled = () => {
    const validation = stepValidations[currentStep as STEPS]?.(appointmentData)
    if (validation) {
      setDisabledMessage(validation.message)
      return !validation.isValid
    }
    return false
  }

  const isDisabled = useMemo(
    () => isButtonDisabled(),
    [
      currentStep,
      appointmentData.companyId,
      appointmentData.petTypeId,
      appointmentData.petSizeId,
      appointmentData.petHairId,
      appointmentData.petService?.id,
      appointmentData.appointmentDate,
      appointmentData.client,
    ],
  )

  const renderCurrentStep = () => {
    const StepComponent = STEP_COMPONENTS[currentStep as STEPS]
    return StepComponent ? <StepComponent /> : null
  }

  return (
    <main className={styles.main}>
      <section className={styles.bgsection}>
        <img src={stepImage(currentStep)} />
      </section>

      <section
        className={styles.textsection}
        style={{ maxWidth: currentStep === STEPS.SCHEDULE ? '800px' : '350px' }}
      >
        {currentStep !== STEPS.INITIAL && <AppointmentProgressBar />}

        {renderCurrentStep()}

        <Col
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginTop: '24px',
          }}
        >
          {currentStep > STEPS.INITIAL &&
            currentStep !== STEPS.CONFIRMATION && (
              <Button onClick={prevStep} type='link' style={{ width: '50%' }}>
                <ArrowLeftOutlined />
                Voltar
              </Button>
            )}

          {currentStep !== STEPS.CONFIRMATION && (
            <Tooltip title={isDisabled ? disabledMessage : ''}>
              <AppointmentButton
                onClick={handleSubmit}
                disabled={isDisabled || isCreating}
              >
                {currentStep === STEPS.INITIAL
                  ? 'Vamos lá'
                  : currentStep === STEPS.REVIEW
                  ? 'Reservar horário'
                  : 'Próximo'}
              </AppointmentButton>
            </Tooltip>
          )}
        </Col>
      </section>
    </main>
  )
}
