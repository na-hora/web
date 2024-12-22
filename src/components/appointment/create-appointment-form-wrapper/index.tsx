// import { RegisterCompanyFormData } from './types'

import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Form } from 'antd'
import { AnimalInfoForm } from '../animal-info-form'
import { Confirmation } from '../confirmation'
import { Schedule } from '../schedule'
import { UserInfoForm } from '../user-info-form'

enum STEPS {
  ANIMAL_INFO = 0,
  SCHEDULE = 1,
  USER_INFO = 2,
  CONFIRMATION = 3,
}

export const CreateAppointmentForm = () => {
  const { form, currentStep, setRegisterCompanyFormData, setCurrentStep } =
    useAppointmentContext()

  // useEffect(() => {
  //   setIsRegisteringCompany(false)

  //   if (isPending) {
  //     setIsRegisteringCompany(true)
  //   }
  // }, [isPending, setIsRegisteringCompany])

  const nextStep = () => {
    const isLastStep = currentStep === STEPS.CONFIRMATION
    if (isLastStep) return

    form.validateFields().then(() => {
      setRegisterCompanyFormData((prev) => ({
        ...prev,
        ...form.getFieldsValue(),
      }))

      setCurrentStep(currentStep + 1)
    })
  }

  const saveFormValuesInContext = () => {
    setRegisterCompanyFormData((prev) => ({
      ...prev,
      ...form.getFieldsValue(),
    }))
  }

  const prevStep = () => {
    saveFormValuesInContext()

    setCurrentStep(currentStep - 1)
  }

  // const createCompany = () => {
  //   createCompanyAndAddressMutation(
  //     { body: formattedFormValues },
  //     {
  //       onSuccess: () => {
  //         window.location.href = '/company/register/success'
  //       },
  //     },
  //   )
  // }

  const nextPageOrSubmit = () => {
    if (currentStep === STEPS.CONFIRMATION) {
      // createCompany()
      return
    } else {
      nextStep()
    }
  }

  const hidePrevStepButton =
    currentStep === STEPS.ANIMAL_INFO ? 'none' : 'block'

  return (
    <Form
      layout='vertical'
      form={form}
      style={{ width: '100%', marginTop: '20px' }}
    >
      {currentStep === STEPS.ANIMAL_INFO && <AnimalInfoForm />}
      {currentStep === STEPS.SCHEDULE && <Schedule />}
      {currentStep === STEPS.USER_INFO && <UserInfoForm />}

      {currentStep === STEPS.CONFIRMATION && <Confirmation />}

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        <Button
          onClick={prevStep}
          style={{
            display: hidePrevStepButton,
          }}
        >
          Voltar
        </Button>
        <Button type='primary' onClick={nextPageOrSubmit}>
          {currentStep === STEPS.USER_INFO ? 'Marcar meu horário' : 'Próximo'}
        </Button>
      </div>
    </Form>
  )
}
