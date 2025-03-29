import { AppointmentManagerModal } from '@/components/dashboard/appointments/appointment-manager-modal'
import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { HourModal } from '@/components/dashboard/appointments/hour-modal'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { CopyOutlined } from '@ant-design/icons'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { Button, message } from 'antd'
import { parseCookies } from 'nookies'
import { useAppointmentsContext } from './contexts/appointments-provider'

export const Appointments = () => {
  // const { isCreateAppointmentModalOpen } = useAppointmentsContext()
  const { isBlockCompanyHourModalOpen, isAppointmentManagerModalOpen } =
    useAppointmentsContext()

  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId, shortLink } = JSON.parse(companyCookie)

  const { data: petServices } = useLoadPetServices(companyId)

  const handleCopyShortLink = () => {
    navigator.clipboard
      .writeText(shortLink)
      .then(() => message.success('Link copiado para a área de transferência!'))
      .catch(() => message.error('Erro ao copiar o link'))
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>📅 Agendamentos</h1>
        <Button onClick={handleCopyShortLink} icon={<CopyOutlined />}>
          Link para compartilhar!
        </Button>
      </div>

      <CalendarHeader services={petServices} />
      <AppointmentCalendar services={petServices} />
      {isAppointmentManagerModalOpen && <AppointmentManagerModal />}
      {isBlockCompanyHourModalOpen && <HourModal />}
    </>
  )
}
