import { Button, Typography } from 'antd'
import styles from './styles.module.css'

export const AppointmentPage = () => {
  return (
    <main className={styles.main}>
      {/* <section className={styles.section}>
        <AppointmentProgressBar />
        <CreateAppointmentForm />
      </section> */}

      <section className={styles.bgsection}>
        <Typography.Title level={3} style={{ width: '50%', color: '#3196b5' }}>
          Nome do pet shop
        </Typography.Title>
      </section>

      <section className={styles.textsection}>
        <h1 style={{ marginBottom: 0 }}>Agendamento</h1>
        <p>Agende um horário para seu pet. Faça aqui mesmo. É rapidinho!</p>
        <Button
          type='primary'
          style={{
            background: '#3196b5',
            padding: '8px 20px',
            width: '80%',
            borderRadius: '12px',
          }}
        >
          Agendar
        </Button>
      </section>
    </main>
  )
}
