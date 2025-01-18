// import { RegisterCompanyFormData } from './types'

import { AppointmentButton } from '@/buttons/appointment'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Form } from 'antd'
import { AnimalInfoForm } from '../animal-info-form'
import { Confirmation } from '../confirmation'
import { InitialStep } from '../initial'
import { Schedule } from '../schedule'
import { UserInfoForm } from '../user-info-form'

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

export const CreateAppointmentForm = () => {
  const {
    form,
    currentStep,
    setCurrentStep,
    selectedDate,
    selectedTime,
    formData,
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
        return <AnimalInfoForm />
      case STEPS.PET_HAIR:
        return <AnimalInfoForm />
      case STEPS.PET_SIZE:
        return <AnimalInfoForm />
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
    <Col xxl={24} xl={24} style={{ padding: '20px' }}>
      <Form layout='vertical' form={form} initialValues={formData}>
        {renderCurrentStep()}

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
            justifyContent:
              window.innerWidth <= 480
                ? 'stretch'
                : currentStep > 0
                ? 'flex-end'
                : 'center',
            gap: '10px',
            marginTop: '24px',
          }}
        >
          {currentStep > 0 && <Button onClick={prevStep}>Voltar</Button>}

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
        </div>
      </Form>
    </Col>
  )
}
