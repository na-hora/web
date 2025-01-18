import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Button, Col } from 'antd'

type Option = {
  id: number
  name: string
  icon?: string
}

// type Props = {
//   stepData: {
//     id: number
//     title: string
//     field: string
//     icon?: string
//     options: Option[]
//   }
// }

const PET_OPTIONS = {
  types: [
    { id: 1, name: 'Cão', icon: '🐕' },
    { id: 2, name: 'Gato', icon: '🐱' },
  ],
  hair: [
    { id: 1, name: 'Curto' },
    { id: 2, name: 'Médio' },
    { id: 3, name: 'Longo' },
  ],
  sizes: [
    { id: 1, name: 'Pequeno (até 10kg)' },
    { id: 2, name: 'Médio (10kg a 25kg)' },
    { id: 3, name: 'Grande (acima de 25kg)' },
  ],
  services: [
    { id: 1, name: 'Banho' },
    { id: 2, name: 'Tosa' },
    { id: 3, name: 'Banho e Tosa' },
  ],
}

export const AnimalInfoForm = () => {
  const { form, setRegisterCompanyFormData, currentStep, setCurrentStep } =
    useAppointmentContext()

  const steps = [
    {
      id: 1,
      title: 'Qual é o tipo do seu pet?',
      field: 'pet_type',
      options: PET_OPTIONS.types,
    },
    {
      id: 2,
      title: 'Como é a pelagem dele?',
      field: 'pet_hair',
      options: PET_OPTIONS.hair,
    },
    {
      id: 3,
      title: 'Qual o tamanho do seu pet?',
      field: 'pet_size',
      options: PET_OPTIONS.sizes,
    },
    {
      id: 4,
      title: 'Qual serviço você deseja?',
      field: 'pet_service',
      options: PET_OPTIONS.services,
    },
  ]

  const handleSelection = (field: string, value: number) => {
    // form.setFieldValue(field, value)
    // setRegisterCompanyFormData((prev: any) => ({
    //   ...prev,
    //   [field]: value,
    // }))
    setCurrentStep((prevStep) => prevStep + 1)
  }

  return (
    <Col>
      <h2>{steps[currentStep].title}</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
          width: '100%',
          maxWidth: '28rem',
        }}
      >
        {steps[currentStep].options.map((option: Option) => (
          <Button
            onClick={() =>
              handleSelection(steps[currentStep].field, steps[currentStep].id)
            }
            style={{
              width: '200px',
              height: '200px',
              fontSize: '18px',
              color: '#0C4A6E',
              fontWeight: 'bold',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            {option?.icon && (
              <span
                style={{
                  marginRight: '0.5rem',
                  fontSize: '1.5rem',
                  position: 'absolute',
                  top: '-40px',
                  background: '#6DE1EE',
                  borderRadius: '50%',
                  padding: '20px',
                }}
              >
                {option.icon}
              </span>
            )}
            {option.name}
          </Button>
        ))}
      </div>
    </Col>
  )
}
