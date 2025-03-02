import { AppointmentManagerModal } from '@/components/dashboard/appointments/appointment-manager-modal'
import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { HourModal } from '@/components/dashboard/appointments/hour-modal'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { parseCookies } from 'nookies'
import { useAppointmentsContext } from './contexts/appointments-provider'

export const Appointments = () => {
  // const { isCreateAppointmentModalOpen } = useAppointmentsContext()
  const { isBlockCompanyHourModalOpen, isAppointmentManagerModalOpen } =
    useAppointmentsContext()

  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const { data: petServices } = useLoadPetServices(companyId)

  return (
    <>
      <h1>📅 Agendamentos</h1>

      <CalendarHeader services={petServices} />
      <AppointmentCalendar services={petServices} />
      {isAppointmentManagerModalOpen && <AppointmentManagerModal />}
      {isBlockCompanyHourModalOpen && <HourModal />}
    </>
  )
}
