import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { CreateAppointmentModal } from '@/components/dashboard/appointments/create-appointment-modal'
import { Appointment } from '@/hooks/na-hora/appointments/types/load'
import { useLoadAppointments } from '@/hooks/na-hora/appointments/use-load-appointments'
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from '@toast-ui/calendar'
import { TZDate } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { notification } from 'antd'
import { addMinutes } from 'date-fns'
import { parseCookies } from 'nookies'
import { useCallback, useEffect, useRef, useState } from 'react'
type ViewType = 'month' | 'week' | 'day'

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

export const DashboardAppointments = ({
  view = 'week',
}: {
  view: ViewType
}) => {
  const calendarRef = useRef<typeof Calendar>(null)

  const [selectedDateRangeText, setSelectedDateRangeText] = useState('')
  const [selectedView, setSelectedView] = useState(view)
  const [selectedDateFromCalendar, setSelectedDateFromCalendar] =
    useState<TZDate>(null)
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
    useState(false)
  const [appointments, setAppointments] = useState<Partial<EventObject>[]>([])

  const [api, contextHolder] = notification.useNotification()
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

  const getCalInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    [],
  )

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
    }

    const viewName = calInstance.getViewName()
    const calDate = calInstance.getDate()
    const rangeStart = calInstance.getDateRangeStart()
    const rangeEnd = calInstance.getDateRangeEnd()

    const year = calDate.getFullYear()
    const month = calDate.getMonth() + 1
    const date = calDate.getDate()
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = `${month}-${year}`
        break
      }
      case 'week': {
        const startDate = `${rangeStart
          .getDate()
          .toString()
          .padStart(2, '0')}/${(rangeStart.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${rangeStart.getFullYear()}`
        const endDate = `${rangeEnd.getDate().toString().padStart(2, '0')}/${(
          rangeEnd.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${rangeEnd.getFullYear()}`
        dateRangeText = `${startDate} - ${endDate}`
        break
      }
      default:
        dateRangeText = `${year}-${month}-${date}`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCalInstance])

  useEffect(() => {
    setSelectedView(view)
  }, [view])

  useEffect(() => {
    updateRenderRangeText()
  }, [selectedView, updateRenderRangeText])

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

  const onChangeSelect = (value: ViewType) => {
    setSelectedView(value)
    getCalInstance().changeView(value)
  }

  const onClickNavi = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (ev.currentTarget.tagName === 'BUTTON') {
      const button = ev.currentTarget
      const actionName = (
        button.getAttribute('data-action') ?? 'month'
      ).replace('move-', '')
      getCalInstance()[actionName]()
      updateRenderRangeText()
    }
  }

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

      <h1>📅 Agendamentos</h1>

      <CalendarHeader
        selectedView={selectedView}
        selectedDateRangeText={selectedDateRangeText}
        onChangeSelect={onChangeSelect}
        onClickNavi={onClickNavi}
      />

      <AppointmentCalendar
        calendarRef={calendarRef}
        initialCalendars={initialCalendars}
        initialEvents={appointments}
        selectedView={selectedView}
        openCreateEventModal={openCreateEventModal}
      />

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
