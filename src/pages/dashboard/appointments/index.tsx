import { Appointments } from '@/pages/dashboard/appointments/appointments-page'
import { AppointmentsProvider } from './contexts/appointments-provider'

export const DashboardAppointments = () => {
  return (
    <AppointmentsProvider>
      <Appointments />
    </AppointmentsProvider>
  )
}
