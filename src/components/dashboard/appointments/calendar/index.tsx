import { Appointment } from '@/hooks/na-hora/appointments/types/load'
import { useLoadAppointments } from '@/hooks/na-hora/appointments/use-load-appointments'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css' // Stylesheet for calendar
import Calendar from '@toast-ui/react-calendar'
import { notification, theme } from 'antd'
import { addMinutes } from 'date-fns'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

// type ViewType = 'month' | 'week' | 'day'

const initialCalendars: Options['calendars'] = [
  {
    id: '0',
    name: 'Banho',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Tosa',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff',
  },
  {
    id: '2',
    name: 'Banho e Tosa',
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
    dragBackgroundColor: '#ff6b6b',
  },
]

export const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState<Partial<EventObject>[]>([])
  const [api, contextHolder] = notification.useNotification()

  const {
    selectedView,
    setSelectedDateFromCalendar,
    setIsCreateAppointmentModalOpen,
    calendarRef,
  } = useAppointmentsContext()
  const { data: initialAppointments } = useLoadAppointments()

  const formatAppointment = (appointment: Appointment) => {
    return {
      id: appointment.id,
      calendarId: '1',
      title: appointment.serviceName || 'banho no peludo',
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
      const parsedAppointment = JSON.parse(event.data)
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

  return (
    <>
      {contextHolder}

      <Calendar
        ref={calendarRef}
        height='60vh'
        calendars={initialCalendars}
        month={{ startDayOfWeek: 1 }}
        events={appointments}
        template={{}}
        theme={theme}
        timezone={{
          zones: [
            {
              timezoneName: 'America/Sao_Paulo',
              displayLabel: 'São Paulo',
              tooltip: 'UTC+03:00',
            },
          ],
        }}
        useDetailPopup={true}
        useFormPopup={false}
        useCreationPopup={true}
        view={selectedView}
        week={{
          showTimezoneCollapseButton: true,
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
