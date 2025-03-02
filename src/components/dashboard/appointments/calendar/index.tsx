import {
  Appointment,
  AppointmentStatus,
} from '@/hooks/na-hora/appointments/types/load'
import { useLoadAppointments } from '@/hooks/na-hora/appointments/use-load-appointments'
import { LoadPetServicesResponse } from '@/hooks/na-hora/pet-services/types/list.type'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import type { EventObject, ExternalEventTypes } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { notification, theme } from 'antd'
import { addMinutes } from 'date-fns'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

type AppointmentCalendarProps = {
  services?: LoadPetServicesResponse | undefined
}

const getStatusColor = (status: AppointmentStatus) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return {
        backgroundColor: '#FFA500',
        borderColor: '#CC8400',
        dragBackgroundColor: '#FFA500',
      }
    case 'confirmed':
      return {
        backgroundColor: '#00FF00',
        borderColor: '#00CC00',
        dragBackgroundColor: '#00FF00',
      }
    case 'cancelled':
      return {
        backgroundColor: '#FF0000',
        borderColor: '#CC0000',
        dragBackgroundColor: '#FF0000',
      }
    default:
      return {
        backgroundColor: '#808080',
        borderColor: '#666666',
        dragBackgroundColor: '#808080',
      }
  }
}

export const AppointmentCalendar = (
  { services } = [] as AppointmentCalendarProps,
) => {
  const [appointments, setAppointments] = useState<Partial<EventObject>[]>([])
  const [api, contextHolder] = notification.useNotification()

  const {
    selectedView,
    setSelectedDateFromCalendar,
    setIsBlockCompanyHourModalOpen,
    calendarRef,
    petServiceIdFilter,
    setIsAppointmentManagerModalOpen,
    setSelectedAppointment,
    setFetchingAppointments,
    setTotalAppointments,
  } = useAppointmentsContext()
  const { data: initialAppointments, isFetching } = useLoadAppointments()

  const formatAppointment = (appointment: Appointment) => {
    const statusColors = getStatusColor(appointment.status || 'pending')

    const service = services?.find(
      (s) => s.name.toLowerCase() === appointment.serviceName.toLowerCase(),
    )
    const calendarId = service ? service.id.toString() : '1'

    return {
      ...appointment,
      id: appointment.id,
      calendarId,
      title: appointment.serviceName,
      category: 'time',
      isReadOnly: false,
      start: new Date(appointment.startTime),
      end: addMinutes(new Date(appointment.startTime), appointment.totalTime),
      ...statusColors,
    }
  }

  useEffect(() => {
    if (!initialAppointments) return

    const { appointments } = initialAppointments

    const parsedAppointments = appointments.map((appointment: Appointment) => {
      return formatAppointment(appointment)
    })

    setAppointments(parsedAppointments)
    setTotalAppointments(parsedAppointments.length)
  }, [initialAppointments])

  useEffect(() => {
    setFetchingAppointments(isFetching)
  }, [isFetching])

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

    return () => {
      eventSource.close()
    }
  }, [])

  const openCreateEventModal: ExternalEventTypes['clickEvent'] = ({
    start,
    end,
  }: EventObject) => {
    setSelectedDateFromCalendar({ start, end })
    setIsBlockCompanyHourModalOpen(true)
  }

  const handleClickEvent: ExternalEventTypes['clickEvent'] = ({
    event,
  }: any) => {
    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === event.id,
    )

    setSelectedAppointment(selectedAppointment)
    setIsAppointmentManagerModalOpen(true)
  }

  const filterAppointments = () => {
    if (!petServiceIdFilter || petServiceIdFilter.length === 0) {
      setTotalAppointments(appointments.length)
      return appointments
    }

    const filteredAppointments = appointments.filter((appointment) => {
      return petServiceIdFilter.includes(appointment.calendarId as string)
    })
    setTotalAppointments(filteredAppointments.length)

    return filteredAppointments
  }

  const legendItems = [
    { status: 'Confirmado', color: '#00FF00' },
    { status: 'Pendente', color: '#FFA500' },
    // { status: 'Cancelado', color: '#FF0000' },
    { status: 'Bloqueado', color: '#808080' },
  ]

  return (
    <>
      {contextHolder}

      <Calendar
        ref={calendarRef}
        height='60vh'
        calendars={services}
        month={{ startDayOfWeek: 0 }}
        events={filterAppointments()}
        template={{
          timegridDisplayPrimaryTime: function ({ time }: any) {
            return `${time.getHours()}h`
          },
        }}
        theme={theme}
        useDetailPopup={false}
        useFormPopup={false}
        useCreationPopup={true}
        view={selectedView}
        week={{
          showTimezoneCollapseButton: false,
          timezonesCollapsed: false,
          eventView: ['time'],
          taskView: false,
          startDayOfWeek: 0,
          dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          hourStart: 8,
          hourEnd: 18,
          timeStep: [0, 10, 20, 30, 40, 50],
        }}
        onSelectDateTime={openCreateEventModal}
        onClickEvent={handleClickEvent}
      />

      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          gap: '15px',
          padding: '10px',
        }}
      >
        {legendItems.map((item) => (
          <div
            key={item.status}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: item.color,
                borderRadius: '2px',
                border: `1px solid ${
                  item.color === '#00FF00'
                    ? '#00CC00'
                    : item.color === '#FF0000'
                    ? '#CC0000'
                    : item.color === '#FFA500'
                    ? '#CC8400'
                    : '#666666'
                }`,
              }}
            />
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </>
  )
}
