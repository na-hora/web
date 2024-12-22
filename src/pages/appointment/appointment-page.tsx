import { CreateAppointmentForm } from '@/components/appointment/create-appointment-form-wrapper'
import { PriceFooter } from '@/components/appointment/price-footer'
import { AppointmentSteps } from '@/components/appointment/steps'
import styles from './styles.module.css'

export const AppointmentPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <AppointmentSteps />
        <CreateAppointmentForm />
        <PriceFooter />
      </section>
    </main>
  )
}
