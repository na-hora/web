import { AppointmentPage } from './appointment-page'
import { AppointmentProvider } from './contexts/appointments-provider'

export const Appointment = () => {
  return (
    <AppointmentProvider>
      <AppointmentPage />
    </AppointmentProvider>
  )
}
