import { CreateCompanyModal } from '@/components/register-company/create-company-modal'
import { CreateCompanyForm } from '@/components/register-company/form-wrapper'
import { CreateCompanySteps } from '@/components/register-company/steps'
import styles from './styles.module.css'

export const RegisterCompanyPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <img src='/logo.svg' alt='Na Hora' style={{ width: '150px' }} />
        <h1>Obrigado por escolher o Na Hora!</h1>

        <CreateCompanySteps />
        <CreateCompanyForm />
        <CreateCompanyModal />
      </section>
    </main>
  )
}
