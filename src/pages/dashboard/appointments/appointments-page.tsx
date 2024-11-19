import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { CreateAppointmentModal } from '@/components/dashboard/appointments/create-appointment-modal'
import { LoadPetServicesResponse } from '@/hooks/na-hora/pet-services/types/list.type'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { colors } from '@/utils/colors'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useAppointmentsContext } from './contexts/appointments-provider'

type FormattedServices = {
  id: string
  name: string
  backgroundColor: string
  borderColor: string
  dragBackgroundColor: string
}[]

export const Appointments = () => {
  const { isCreateAppointmentModalOpen } = useAppointmentsContext()
  const [formattedServices, setFormattedServices] = useState<FormattedServices>(
    [],
  )
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const { data: petServices } = useLoadPetServices(companyId)

  const formatServices = (services: LoadPetServicesResponse) => {
    return services.map((service, index) => {
      const color = colors[index % colors.length] // Cicla pelas cores se precisar de mais do que o array de cores contém
      return {
        id: service.id.toString(),
        name: service.name,
        backgroundColor: color,
        borderColor: color,
        dragBackgroundColor: color,
      }
    })
  }

  useEffect(() => {
    if (!petServices) return

    setFormattedServices(formatServices(petServices))
  }, [petServices])

  return (
    <>
      <h1>📅 Agendamentos</h1>

      <CalendarHeader services={formattedServices} />
      <AppointmentCalendar services={formattedServices} />
      {isCreateAppointmentModalOpen && <CreateAppointmentModal />}
    </>
  )
}
