import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider.tsx'
import { Spin } from 'antd'

export const InitialStep = () => {
  const { company } = useAppointmentContext()

  return (
    <>
      {company?.fantasyName ? (
        <>
          <h1>{company?.fantasyName}</h1>

          <h2 style={{ marginBottom: 0 }}>Agendamento</h2>
          <p>Agende um horário para seu pet. Faça aqui mesmo. É rapidinho!</p>
        </>
      ) : (
        <>
          <h1>Buscando informações...</h1>
          <Spin style={{ marginBottom: '20px' }} />
        </>
      )}
    </>
  )
}
