import { Appointment } from '@/hooks/na-hora/appointments/types/load'
import { useLoadAppointments } from '@/hooks/na-hora/appointments/use-load-appointments'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import type { EventObject, ExternalEventTypes } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { notification, theme } from 'antd'
import { addMinutes } from 'date-fns'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

type FormattedServices = {
  id: string
  name: string
  backgroundColor: string
  borderColor: string
  dragBackgroundColor: string
}[]

type Props = {
  services: FormattedServices
}

export const AppointmentCalendar = ({ services }: Props) => {
  const [appointments, setAppointments] = useState<Partial<EventObject>[]>([])
  const [api, contextHolder] = notification.useNotification()

  const {
    selectedView,
    setSelectedDateFromCalendar,
    setIsCreateAppointmentModalOpen,
    calendarRef,
    petServiceIdFilter,
  } = useAppointmentsContext()
  const { data: initialAppointments } = useLoadAppointments()

  const formatAppointment = (appointment: Appointment) => {
    return {
      id: appointment.id,
      calendarId: `${appointment.serviceName === 'banho' ? 1 : 2}`, // TODO
      title: appointment.serviceName,
      category: 'time',
      isReadOnly: false,
      start: new Date(appointment.startTime),
      end: addMinutes(new Date(appointment.startTime), appointment.totalTime),
    }
  }

  useEffect(() => {
    if (!initialAppointments) return

    const { appointments } = initialAppointments

    const parsedAppointments = appointments.map((appointment: Appointment) => {
      return formatAppointment(appointment)
    })

    setAppointments(parsedAppointments)
  }, [initialAppointments])

  const accessToken = parseCookies()['access-token@na-hora']

  const openNotification = (description = 'Confira seu agendamento') => {
    api.success({
      message: `Novo atendimento`,
      description: `${description}`,
      placement: 'bottomRight',
    })
  }

  useEffect(() => {
    const eventSource = new EventSource(
      `${
        import.meta.env.VITE_API_URL
      }/appointments/notifications?token=${accessToken}`,
    )

    eventSource.onmessage = (event) => {
      const parsedAppointment: Appointment = JSON.parse(event.data)
      const formattedAppointment = formatAppointment(parsedAppointment)

      setAppointments((prevMessages) => [...prevMessages, formattedAppointment])

      openNotification(formattedAppointment.title)
    }

    // Fechar a conexão SSE ao desmontar o componente
    return () => {
      eventSource.close()
    }
  }, [])

  const openCreateEventModal: ExternalEventTypes['clickEvent'] = ({
    start,
    end,
  }: EventObject) => {
    setSelectedDateFromCalendar({ start, end })
    setIsCreateAppointmentModalOpen(true)
  }

  const filterAppointments = () => {
    if (petServiceIdFilter === '') return appointments

    return appointments.filter((appointment) => {
      return appointment.calendarId === petServiceIdFilter
    })
  }

  return (
    <>
      {contextHolder}

      <Calendar
        ref={calendarRef}
        height='60vh'
        calendars={services}
        month={{ startDayOfWeek: 1 }}
        events={filterAppointments()}
        template={{
          timegridDisplayPrimaryTime: function ({ time }: any) {
            return `${time.getHours()}h`
          },
        }}
        theme={theme}
        useDetailPopup={true}
        useFormPopup={false}
        useCreationPopup={true}
        view={selectedView}
        week={{
          showTimezoneCollapseButton: false,
          timezonesCollapsed: false,
          eventView: ['time'],
          taskView: false,
          startDayOfWeek: 1,
          dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          hourStart: 8,
          hourEnd: 18,
          timeStep: [0, 10, 20, 30, 40, 50],
        }}
        onSelectDateTime={openCreateEventModal}
      />
    </>
  )
}
