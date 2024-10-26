import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { CreateAppointmentModal } from '@/components/dashboard/appointments/create-appointment-modal'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { useAppointmentsContext } from './contexts/appointments-provider'

export const Appointments = () => {
  const { isCreateAppointmentModalOpen } = useAppointmentsContext()

  return (
    <>
      <h1>📅 Agendamentos</h1>

      <CalendarHeader />
      <AppointmentCalendar />
      {isCreateAppointmentModalOpen && <CreateAppointmentModal />}
    </>
  )
}
