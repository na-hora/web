import { useRegisterCompanyContext } from '@/pages/company/contexts/register-company-provider'
import { Steps } from 'antd'
import styles from './styles.module.css'

export const AppointmentSteps = () => {
  const { currentStep, setCurrentStep } = useRegisterCompanyContext()

  return (
    <div className={styles.steps}>
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Informações',
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
