import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider.tsx'

export const InitialStep = () => {
  const { company } = useAppointmentContext()

  return (
    <>
      <h1>{company?.fantasyName}</h1>

      <h2 style={{ marginBottom: 0 }}>Agendamento</h2>
      <p>Agende um horário para seu pet. Faça aqui mesmo. É rapidinho!</p>
    </>
  )
}
