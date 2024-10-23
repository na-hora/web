// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type {
  EventObject,
  ExternalEventTypes,
  Options,
} from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css' // Stylesheet for calendar
import Calendar from '@toast-ui/react-calendar'
import { theme } from 'antd'

type ViewType = 'month' | 'week' | 'day'

export const AppointmentCalendar = ({
  calendarRef,
  initialCalendars,
  initialEvents,
  selectedView,
  openCreateEventModal,
}: {
  calendarRef: React.RefObject<typeof Calendar>
  initialCalendars: Options['calendars']
  initialEvents: Partial<EventObject>[]
  selectedView: ViewType
  openCreateEventModal: ExternalEventTypes['clickEvent']
}) => {
  return (
    <Calendar
      ref={calendarRef}
      height='60vh'
      calendars={initialCalendars}
      month={{ startDayOfWeek: 1 }}
      events={initialEvents}
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
  )
}
