import { AppointmentButton } from '@/buttons/appointment'
import { AnimalInfoForm } from '@/components/appointment/animal-info-form'
import { Confirmation } from '@/components/appointment/confirmation'
import { AnimalHair } from '@/components/appointment/hair-step'
import { InitialStep } from '@/components/appointment/initial-step'
import { Schedule } from '@/components/appointment/schedule'
import { AnimalSize } from '@/components/appointment/size-step'
import { AnimalType } from '@/components/appointment/type-step'
import { UserInfoForm } from '@/components/appointment/user-info-form'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col } from 'antd'
import { useAppointmentContext } from './contexts/appointments-provider'
import styles from './styles.module.css'

enum STEPS {
  INITIAL = 0,
  PET_TYPE = 1,
  PET_HAIR = 2,
  PET_SIZE = 3,
  PET_SERVICE = 4,
  SCHEDULE = 5,
  USER_INFO = 6,
  CONFIRMATION = 7,
}

export const AppointmentPage = () => {
  const {
    form,
    currentStep,
    setCurrentStep,
    selectedDate,
    selectedTime,
    setFormData,
  } = useAppointmentContext()

  const nextStep = () => {
    const isLastStep = currentStep === STEPS.CONFIRMATION
    if (isLastStep) return

    form.validateFields().then(() => {
      setFormData((prev: any) => ({
        ...prev,
        ...form.getFieldsValue(),
      }))

      if (currentStep === STEPS.SCHEDULE && (!selectedDate || !selectedTime)) {
        return
      }

      setCurrentStep(currentStep + 1)
    })
  }

  const prevStep = () => {
    if (currentStep === 0) return

    setFormData((prev: any) => ({
      ...prev,
      ...form.getFieldsValue(),
    }))

    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (currentStep === STEPS.CONFIRMATION) {
      // Submit logic here
      return
    }
    nextStep()
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.INITIAL:
        return <InitialStep />
      case STEPS.PET_TYPE:
        return <AnimalType />
      case STEPS.PET_HAIR:
        return <AnimalSize />
      case STEPS.PET_SIZE:
        return <AnimalHair />
      case STEPS.PET_SERVICE:
        return <AnimalInfoForm />
      case STEPS.SCHEDULE:
        return <Schedule />
      case STEPS.USER_INFO:
        return <UserInfoForm />
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

      <section className={styles.textsection}>
        {renderCurrentStep()}

        <Col
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
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
            disabled={
              currentStep === STEPS.SCHEDULE && (!selectedDate || !selectedTime)
            }
          >
            {currentStep === STEPS.INITIAL
              ? 'Vamos lá'
              : currentStep === STEPS.CONFIRMATION
              ? 'Finalizar'
              : 'Próximo'}
          </AppointmentButton>
        </Col>
      </section>
    </main>
  )
}
