import { AppointmentCalendar } from '@/components/dashboard/appointments/calendar'
import { CalendarHeader } from '@/components/dashboard/appointments/calendar-header'
import { CreateAppointmentModal } from '@/components/dashboard/appointments/create-appointment-modal'
import { addDate, addHours, subtractDate } from '@/utils/time'
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from '@toast-ui/calendar'
import { TZDate } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css' // Stylesheet for calendar
import Calendar from '@toast-ui/react-calendar'
import { notification } from 'antd'
import { addMinutes } from 'date-fns'
import { parseCookies } from 'nookies'
import { useCallback, useEffect, useRef, useState } from 'react'
type ViewType = 'month' | 'week' | 'day'

const today = new TZDate()
const authToken = parseCookies()['access-token@na-hora']

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
const initialEvents: Partial<EventObject>[] = [
  {
    id: '1',
    calendarId: '0',
    title: 'TOAST UI Calendar Study',
    category: 'time',
    start: today,
    end: addHours(today, 3),
  },
  {
    id: '2',
    calendarId: '0',
    title: 'Practice',
    category: 'milestone',
    start: addDate(today, 1),
    end: addDate(today, 1),
    isReadOnly: false,
  },
  {
    id: '3',
    calendarId: '0',
    title: 'FE Workshop',
    category: 'allday',
    start: subtractDate(today, 2),
    end: subtractDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '4',
    calendarId: '0',
    title: 'Report',
    category: 'time',
    start: today,
    end: addHours(today, 1),
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
  const [initialEvents, setInitialEvents] = useState([
    {
      id: '1',
      calendarId: '0',
      title: 'TOAST UI Calendar Study',
      category: 'time',
      start: today,
      end: addHours(today, 3),
    },
    {
      id: '2',
      calendarId: '0',
      title: 'Practice',
      category: 'milestone',
      start: addDate(today, 1),
      end: addDate(today, 1),
      isReadOnly: false,
    },
    {
      id: '3',
      calendarId: '0',
      title: 'FE Workshop',
      category: 'allday',
      start: subtractDate(today, 2),
      end: subtractDate(today, 1),
      isReadOnly: true,
    },
    {
      id: '4',
      calendarId: '0',
      title: 'Report',
      category: 'time',
      start: today,
      end: addHours(today, 1),
    },
  ])

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (description) => {
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
      `http://localhost:3333/api/v1/appointments/notifications?token=${authToken}`,
    )

    eventSource.onmessage = (event) => {
      const parsedAppointment = JSON.parse(event.data)
      const bla = {
        id: parsedAppointment.id,
        calendarId: '1',
        title: 'banho no peludo',
        category: 'time',
        isReadOnly: false,
        start: new Date(parsedAppointment.startTime),
        end: addMinutes(
          new Date(parsedAppointment.startTime),
          parsedAppointment.totalTime,
        ),
      }

      setInitialEvents((prevMessages) => [...prevMessages, bla])

      openNotification('banho no peludo')
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
        initialEvents={initialEvents}
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
