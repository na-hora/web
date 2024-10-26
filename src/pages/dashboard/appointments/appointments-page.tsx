import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { CreateAppointmentModal } from '@/components/dashboard/appointments/create-appointment-modal'
import { TZDate } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { useState } from 'react'
import { useAppointmentsContext } from './contexts/appointments-provider'

export const Appointments = () => {
  const [selectedDateFromCalendar] = useState<TZDate>(null)

  const { isCreateAppointmentModalOpen } = useAppointmentsContext()

  return (
    <>
      <h1>📅 Agendamentos</h1>

      <CalendarHeader />
      <AppointmentCalendar />

      {isCreateAppointmentModalOpen && (
        <CreateAppointmentModal
          isOpen={isCreateAppointmentModalOpen}
          setIsOpen={setIsCreateAppointmentModalOpen}
          dates={selectedDateFromCalendar}
        />
      )}
    </>
  )
}
