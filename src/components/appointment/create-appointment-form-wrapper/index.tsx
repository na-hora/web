// import { RegisterCompanyFormData } from './types'

import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col, Form } from 'antd'
import { AnimalInfoForm } from '../animal-info-form'
import { Confirmation } from '../confirmation'
import { Schedule } from '../schedule'
import { UserInfoForm } from '../user-info-form'

enum STEPS {
  PET_TYPE = 0,
  PET_HAIR = 1,
  PET_SIZE = 2,
  PET_SERVICE = 3,
  SCHEDULE = 4,
  USER_INFO = 5,
  CONFIRMATION = 6,
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
      <Form
        layout='vertical'
        form={form}
        initialValues={formData}
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '20px auto',
          padding: '0 15px',
        }}
      >
        {renderCurrentStep()}

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
            justifyContent: window.innerWidth <= 480 ? 'stretch' : 'flex-end',
            gap: '10px',
            marginTop: '24px',
          }}
        >
          {currentStep > 0 && <Button onClick={prevStep}>Voltar</Button>}

          {currentStep > 3 && (
            <Button
              type='primary'
              onClick={handleSubmit}
              disabled={
                currentStep === STEPS.SCHEDULE &&
                (!selectedDate || !selectedTime)
              }
            >
              {currentStep === STEPS.USER_INFO
                ? 'Marcar meu horário'
                : 'Próximo'}
            </Button>
          )}
        </div>
      </Form>
    </Col>
  )
}
