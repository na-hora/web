import { useConfirmAppointment } from '@/hooks/na-hora/appointments/use-confirm-appointment'
import { Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import styles from './styles.module.css'

export const AppointmentConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const appointmentId = searchParams.get('q') as string
  const origin = searchParams.get('origin') as string

  const { isFetching: isConfirming, isSuccess } = useConfirmAppointment(
    appointmentId,
    origin,
  )

  console.log({ isConfirming, isSuccess })

  return (
    <main className={styles.main}>
      <section className={styles.bgsection}>
        <img src='/imgs/appointment/beagle-sitting.png' alt='dog sitted' />
      </section>

      <section className={styles.textsection} style={{ maxWidth: '800px' }}>
        {isConfirming ? (
          <>
            <Spin tip='Confirmando agendamento...' size='large' />
            <p>Confirmando agendamento...</p>
          </>
        ) : isSuccess ? (
          <>
            <h1>Agendamento confirmado!</h1>
            <p>Seu agendamento foi confirmado com sucesso.</p>
            <p>Obrigado por usar nossa plataforma, volte sempre!</p>
          </>
        ) : (
          <>
            <h1>Erro ao confirmar agendamento!</h1>
            <p>
              Erro ao confirmar agendamento, entre em contato com o petshop para
              mais informações.
            </p>
          </>
        )}
      </section>
    </main>
  )
}
