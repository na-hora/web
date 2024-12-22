import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Steps } from 'antd'
import styles from './styles.module.css'

export const AppointmentSteps = () => {
  const { currentStep, setCurrentStep } = useAppointmentContext()

  return (
    <div className={styles.steps}>
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Serviço',
            disabled: true,
            style: { cursor: 'default' },
          },
          {
            title: 'Horários',
            disabled: true,
            style: { cursor: 'default' },
          },
          {
            title: 'Dados pessoais',
            disabled: true,
            style: { cursor: 'default' },
          },
          {
            title: 'Concluido',
            disabled: true,
            style: { cursor: 'default' },
          },
        ]}
        onChange={setCurrentStep}
      />
    </div>
  )
}
