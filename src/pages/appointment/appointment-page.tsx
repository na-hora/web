import { CreateAppointmentForm } from '@/components/appointment/create-appointment-form-wrapper'
import { AppointmentSteps } from '@/components/appointment/steps'
import styles from './styles.module.css'

export const AppointmentPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <AppointmentSteps />
        <CreateAppointmentForm />
      </section>
    </main>
  )
}
