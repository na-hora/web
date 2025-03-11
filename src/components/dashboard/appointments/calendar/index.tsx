import {
  Appointment,
  AppointmentStatus,
} from '@/hooks/na-hora/appointments/types/load'
import { useLoadAppointments } from '@/hooks/na-hora/appointments/use-load-appointments'
import { CompanyHoursBlocked } from '@/hooks/na-hora/company-hour-block/types/load.type'
import { useDeleteCompanyHourBlock } from '@/hooks/na-hora/company-hour-block/use-delete-company-hour-block'
import { useLoadCompanyHoursBlock } from '@/hooks/na-hora/company-hour-block/use-load-company-hours-block'
import { LoadPetServicesResponse } from '@/hooks/na-hora/pet-services/types/list.type'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
//@ts-ignore
import type { EventObject, ExternalEventTypes } from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
//@ts-ignore
import Calendar from '@toast-ui/react-calendar'
import { Button, notification, theme } from 'antd'
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
  const { data: companyHoursBlocked } = useLoadCompanyHoursBlock()
  const {
    mutate: deleteCompanyHourBlock,
    isPending: isDeletingCompanyHourBlock,
  } = useDeleteCompanyHourBlock()

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

  const formatBlockedHour = (blockedHour: CompanyHoursBlocked) => ({
    id: `blocked-${blockedHour.id}`,
    calendarId: 'blocked',
    title: 'Horário Bloqueado',
    category: 'time',
    isReadOnly: true,
    start: new Date(blockedHour.startDate),
    end: new Date(blockedHour.endDate),
    backgroundColor: '#808080',
    borderColor: '#666666',
    dragBackgroundColor: '#808080',
  })

  useEffect(() => {
    if (!initialAppointments && !companyHoursBlocked) return

    let parsedAppointments: Partial<EventObject>[] = []

    if (initialAppointments) {
      const { appointments } = initialAppointments
      parsedAppointments = appointments.map((appointment: Appointment) =>
        formatAppointment(appointment),
      )
    }

    let parsedBlockedHours: Partial<EventObject>[] = []
    if (companyHoursBlocked) {
      parsedBlockedHours = companyHoursBlocked.map((blockedHour) =>
        formatBlockedHour(blockedHour),
      )
    }

    const mergedInfo = [...parsedAppointments, ...parsedBlockedHours]
    setAppointments(mergedInfo)
  }, [initialAppointments, companyHoursBlocked])

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

  const deleteBlockedHour = (blockedHourId: number) => {
    deleteCompanyHourBlock(
      {
        dynamicRoute: blockedHourId.toString(),
      },
      {
        onSuccess: () => {
          api.destroy()
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appt) => appt.id !== blockedHourId),
          )

          api.success({
            message: 'Horário Desbloqueado',
            description: 'O horário foi desbloqueado com sucesso.',
            placement: 'top',
            duration: 3,
          })
        },
        onError: () => {
          api.destroy()
          api.error({
            message: 'Erro ao desbloquear horário',
            description: 'Ocorreu um erro ao desbloquear o horário.',
            placement: 'top',
            duration: 3,
          })
        },
      },
    )
  }

  const handleClickEvent: ExternalEventTypes['clickEvent'] = ({
    event,
  }: any) => {
    if (event.calendarId === 'blocked') {
      api.open({
        message: 'Horário Bloqueado',
        description: (
          <div>
            <p>Este horário está bloqueado. Deseja remover o bloqueio?</p>
            <Button
              type='primary'
              danger
              disabled={isDeletingCompanyHourBlock}
              onClick={() => deleteBlockedHour(event.id.split('-')[1])}
            >
              Remover Bloqueio
            </Button>
          </div>
        ),
        placement: 'top',
        duration: 0,
      })
      return
    }

    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === event.id,
    )

    setSelectedAppointment(selectedAppointment)
    setIsAppointmentManagerModalOpen(true)
  }

  const removeBlockedHoursFromAppointments = () => {
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.calendarId !== 'blocked',
    )
    return filteredAppointments
  }

  const filterAppointments = () => {
    if (!petServiceIdFilter || petServiceIdFilter.length === 0) {
      const appointmentsWithoutBlocked = removeBlockedHoursFromAppointments()
      setTotalAppointments(appointmentsWithoutBlocked.length)
      return appointments
    }

    const filteredAppointments = appointments.filter((appointment) => {
      return petServiceIdFilter.includes(appointment.calendarId as string)
    })

    const appointmentsWithoutBlocked = removeBlockedHoursFromAppointments()
    setTotalAppointments(appointmentsWithoutBlocked.length)

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
