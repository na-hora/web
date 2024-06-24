import { useRegisterCompanyContext } from '@/pages/company/contexts/register-company-provider'
import { Steps } from 'antd'
import styles from './styles.module.css'

export const CreateCompanySteps = () => {
  const { currentStep, setCurrentStep } = useRegisterCompanyContext()

  return (
    <div className={styles.steps}>
      <Steps
        current={currentStep}
        items={[
          {
            title: 'Empresa',
            disabled: true,
            style: { cursor: 'default' },
          },
          {
            title: 'Endereço',
            disabled: true,
            style: { cursor: 'default' },
          },
          {
            title: 'Usuário',
            disabled: true,
            style: { cursor: 'default' },
          },
        ]}
        onChange={setCurrentStep}
      />
    </div>
  )
}
