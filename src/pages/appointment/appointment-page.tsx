import { CreateAppointmentForm } from '@/components/appointment/create-appointment-form-wrapper'
import { PriceFooter } from '@/components/appointment/price-footer'
import { AppointmentProgressBar } from '@/components/appointment/progress-bar'
import styles from './styles.module.css'

export const AppointmentPage = () => {
  return (
    <main className={styles.main}>
      <nav
        style={{
          backgroundColor: '#F75347',
          textAlign: 'center',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src='/logo.svg' alt='Na Hora' style={{ width: '100px' }} />
          <h2 style={{ color: '#fff' }}>Nome da empresa</h2>
        </div>
        <h1 style={{ color: '#fff' }}>Agende um horário para seu pet</h1>
      </nav>
      <section className={styles.section}>
        <AppointmentProgressBar />
        <CreateAppointmentForm />
        <PriceFooter />
      </section>
    </main>
  )
}
