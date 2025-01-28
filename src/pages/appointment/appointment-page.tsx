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
import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useCreateAppointment } from '@/hooks/na-hora/appointments/use-create-appointment'
import { removePhoneMask } from '@/utils/masks'
import { convertDateTOISO8601WithTimezone } from '@/utils/time'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col } from 'antd'
import { useEffect } from 'react'
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

export const AppointmentPage = () => {
  const {
    form,
    currentStep,
    setCurrentStep,
    appointmentData,
    setAppointmentData,
  } = useAppointmentContext()
  const { mutate: createAppointment, error: createAppointmentError } =
    useCreateAppointment()
  const { triggerAlert } = useGlobalAlertContext()

  useEffect(() => {
    setAppointmentData((prev: any) => ({
      ...prev,
      companyId: '5478b7e4-2469-40b5-ad26-2c4b9490c178', //TODO
    }))
  }, [])

  useEffect(() => {
    if (createAppointmentError) {
      triggerAlert({
        type: 'error',
        message: 'Erro ao criar agendamento',
      })
    }
  }, [createAppointmentError, triggerAlert])

  const nextStep = () => {
    const isLastStep = currentStep === STEPS.CONFIRMATION
    if (isLastStep) return

    form.validateFields().then(() => {
      setAppointmentData((prev: any) => ({
        ...prev,
        user: form.getFieldsValue(),
      }))

      // if (currentStep === STEPS.SCHEDULE && (!selectedDate || !selectedTime)) {
      //   return
      // }

      setCurrentStep(currentStep + 1)
    })
  }

  const prevStep = () => {
    if (currentStep === 0) return

    setCurrentStep(currentStep - 1)
  }

  const formatDataToCreateAppointment = () => {
    return {
      companyId: appointmentData.companyId,
      companyPetSizeId: appointmentData.petSizeId,
      companyPetHairId: appointmentData.petHairId,
      companyPetServiceId: appointmentData.petServiceId,
      startTime: convertDateTOISO8601WithTimezone(
        appointmentData.appointmentDateString as string,
        appointmentData.appointmentTime as string,
      ),
      client: {
        name: appointmentData.user.name,
        email: appointmentData.user.email,
        phone: `55${removePhoneMask(appointmentData.user.phone)}`,
      },
    }
  }

  const handleSubmit = () => {
    if (currentStep === STEPS.REVIEW) {
      const payload = formatDataToCreateAppointment()

      if (!Object.values(payload).some((value) => !value)) {
        triggerAlert({
          type: 'error',
          message: 'Preencha todos os campos obrigatórios',
        })
      }
      createAppointment(payload as any)
    }
    nextStep()
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.INITIAL:
        return <InitialStep />
      case STEPS.PET_TYPE:
        return <AnimalType />
      case STEPS.PET_SIZE:
        return <AnimalSize />
      case STEPS.PET_HAIR:
        return <AnimalHair />
      case STEPS.PET_SERVICE:
        return <AnimalServices />
      case STEPS.SCHEDULE:
        return <Schedule />
      case STEPS.USER_INFO:
        return <UserInfoForm />
      case STEPS.REVIEW:
        return <ReviewStep />
      case STEPS.CONFIRMATION:
        return <Confirmation />
      default:
        return null
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.bgsection}>
        <img src='/public/imgs/appointment/beagle-sitting.png' />
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
          {currentStep > 0 && (
            <Button onClick={prevStep} type='link' style={{ width: '50%' }}>
              <ArrowLeftOutlined />
              Voltar
            </Button>
          )}

          <AppointmentButton
            onClick={handleSubmit}
            // disabled={
            //   currentStep === STEPS.SCHEDULE && (!selectedDate || !selectedTime)
            // }
          >
            {currentStep === STEPS.INITIAL
              ? 'Vamos lá'
              : currentStep === STEPS.REVIEW
              ? 'Confirmar agendamento'
              : 'Próximo'}
          </AppointmentButton>
        </Col>
      </section>
    </main>
  )
}
