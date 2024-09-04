import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from '@toast-ui/calendar'
import { TZDate } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css' // Stylesheet for calendar
import Calendar from '@toast-ui/react-calendar'
import { Button, Row, Select, theme } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addDate, addHours, subtractDate } from './utils'

type ViewType = 'month' | 'week' | 'day'

const today = new TZDate()
const viewModeOptions = [
  {
    title: 'Mês',
    value: 'month',
  },
  {
    title: 'Semana',
    value: 'week',
  },
  {
    title: 'Dia',
    value: 'day',
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

  const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
    console.group('onAfterRenderEvent')
    console.log('Event Info : ', res.title)
    console.groupEnd()
  }

  const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (
    res,
  ) => {
    console.group('onBeforeDeleteEvent')
    console.log('Event Info : ', res.title)
    console.groupEnd()

    const { id, calendarId } = res

    getCalInstance().deleteEvent(id, calendarId)
  }

  const onChangeSelect = (value: ViewType) => {
    setSelectedView(value)
    getCalInstance().changeView(value)
  }

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName')
    console.log('Date : ', res.date)
    console.groupEnd()
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

  const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
    console.group('onClickEvent')
    console.log('MouseEvent : ', res.nativeEvent)
    console.log('Event Info : ', res.event)
    console.groupEnd()
  }

  const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] =
    (timezoneCollapsed) => {
      console.group('onClickTimezonesCollapseBtn')
      console.log('Is Timezone Collapsed?: ', timezoneCollapsed)
      console.groupEnd()

      const newTheme = {
        'week.daygridLeft.width': '100px',
        'week.timegridLeft.width': '100px',
      }

      getCalInstance().setTheme(newTheme)
    }

  const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (
    updateData,
  ) => {
    console.group('onBeforeUpdateEvent')
    console.log(updateData)
    console.groupEnd()

    const targetEvent = updateData.event
    const changes = { ...updateData.changes }

    getCalInstance().updateEvent(
      targetEvent.id,
      targetEvent.calendarId,
      changes,
    )
  }

  const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (
    eventData,
  ) => {
    const event = {
      calendarId: eventData.calendarId || '',
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
    }

    getCalInstance().createEvents([event])
  }

  return (
    <>
      <h1>📅 Agendamentos</h1>

      <Row align='middle' style={{ marginBottom: 16, gap: 10 }}>
        <Select
          style={{ width: 120 }}
          value={selectedView}
          onChange={(value: ViewType) => onChangeSelect(value)}
        >
          {viewModeOptions.map((option, index) => (
            <Select.Option value={option.value} key={index}>
              {option.title}
            </Select.Option>
          ))}
        </Select>

        <Button data-action='move-today' onClick={onClickNavi}>
          Hoje
        </Button>

        <Button data-action='move-prev' onClick={onClickNavi}>
          <LeftOutlined />
        </Button>

        <span className='render-range'>{selectedDateRangeText}</span>

        <Button data-action='move-next' onClick={onClickNavi}>
          <RightOutlined />
        </Button>
      </Row>

      <Calendar
        height='60vh'
        calendars={initialCalendars}
        month={{ startDayOfWeek: 1 }}
        events={initialEvents}
        template={
          {
            // milestone(event) {
            //   return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`
            // },
            // allday(event) {
            //   return `[All day] ${event.title}`
            // },
          }
        }
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
        useFormPopup={true}
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
        }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={calendarRef}
        onAfterRenderEvent={onAfterRenderEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        onClickDayname={onClickDayName}
        onClickEvent={onClickEvent}
        onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </>
  )
}
