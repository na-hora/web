import { AppointmentButton } from '@/buttons/appointment'
import styles from './styles.module.css'

export const AppointmentPage = () => {
  return (
    <main className={styles.main}>
      {/* <section className={styles.section}>
        <AppointmentProgressBar />
        <CreateAppointmentForm />
      </section> */}

      <section className={styles.bgsection}>
        <img src='/public/imgs/appointment/beagle-sitting.png' />
      </section>

      <section className={styles.textsection}>
        <h3>Pet Shop Na Hora</h3>

        <h1 style={{ marginBottom: 0 }}>Agendamento</h1>
        <p>Agende um horário para seu pet. Faça aqui mesmo. É rapidinho!</p>
        <AppointmentButton>Agendar</AppointmentButton>
      </section>
    </main>
  )
}
