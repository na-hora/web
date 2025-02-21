import { useLoadAvailableDays } from '@/hooks/na-hora/appointments/use-load-available-days'
import { useLoadCompleteDaySchedule } from '@/hooks/na-hora/appointments/use-load-complete-day-schedule'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { locale } from '@/utils/calendar'
import { Button, Calendar, Card, Col, Row, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { SelectInfo } from 'antd/es/calendar/generateCalendar'

dayjs.extend(utc)
dayjs.extend(timezone)

const { Title, Text } = Typography

interface TimeSlot {
  date: string
  times: {
    morning: string[]
    afternoon: string[]
  }
}

export const Schedule = () => {
  const { appointmentData, setAppointmentData } = useAppointmentContext()
  const [availableHoursByDay, setAvailableHoursByDay] =
    useState<TimeSlot | null>(null)

  const { data: availableDays, isFetching: isFetchingAvailableDays } =
    useLoadAvailableDays() // para mostrar os dias disponíveis no calendário - "2025-02-12"

  const { data: completeDaySchedule, isFetching: isFetchingDaySchedule } =
    useLoadCompleteDaySchedule() // todos os horários disponíveis de um dia - "2025-02-12T10:40:00-03:00"

  useEffect(() => {
    setAppointmentData((prev) => ({
      ...prev,
      shouldFetchSchedule: false,
    }))

    const processedTimes = processScheduleTimes(completeDaySchedule)
    setAvailableHoursByDay(processedTimes)
  }, [completeDaySchedule])


  const processScheduleTimes = (completeDaySchedule: string[] | undefined) => {
    if (!completeDaySchedule?.length) return null

    const morning: string[] = []
    const afternoon: string[] = []

    completeDaySchedule.forEach((time: string) => {
      const hour = dayjs(time).hour()
      if (hour < 12) {
        morning.push(dayjs(time).format('HH:mm'))
      } else {
        afternoon.push(dayjs(time).format('HH:mm'))
      }
    })

    return {
      date: dayjs(completeDaySchedule[0]).format('YYYY-MM-DD'),
      times: {
        morning,
        afternoon,
      },
    }
  }

  const handleDateSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    const isChangingMonth = selectInfo.source !== 'date'

    if (isChangingMonth) {
      setAppointmentData(prev => ({
        ...prev,
        appointmentDate: null,
        appointmentTime: null,
        calendarDates: {
          firstDayOfMonth: date
            .startOf('month')
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          lastDayOfMonth: date
            .endOf('month')
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        },
      }))

      // Limpa os slots do dia
      setAvailableHoursByDay({
        date: date.format('YYYY-MM-DD'),
        times: {
          morning: [],
          afternoon: [],
        },
      })
    }

    // Atualiza a data selecionada apenas quando clica em um dia específico
    if (!isChangingMonth) {
      const dateString = date.format('YYYY-MM-DD')
      setAppointmentData((prev) => ({
        ...prev,
        appointmentTime: null,
        appointmentDate: date,
        appointmentDateString: dateString,
      }))
    }
  }

  const handleTimeSelect = (time: string) => {
    setAppointmentData((prev) => ({
      ...prev,
      appointmentTime: time,
    }))
  }

  const disabledDate = (current: dayjs.Dayjs) => {
    const currentDateStr = current.format('YYYY-MM-DD')
    const isBeforeToday = current < dayjs().startOf('day')
    const isUnavailable = !availableDays?.some(
      (date) => date === currentDateStr,
    )

    return isUnavailable || isBeforeToday
  }

  return (
    <div style={{ margin: '0 auto', padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Escolha seu Horário
      </Title>

      <Row gutter={24} style={{ gap: '24px' }} justify='center'>
        <Col xs={24} md={11}>
          <Card title='Selecione uma Data'>
            <Calendar
              defaultValue={appointmentData?.appointmentDate || dayjs()}
              fullscreen={false}
              onSelect={handleDateSelect}
              disabledDate={disabledDate}
              locale={locale}
            />
          </Card>

          {isFetchingAvailableDays && <Typography.Text type='danger'>Estamos carregando os horários, aguarde um momento</Typography.Text>}

        </Col>

        <Col xs={24} md={11}>
          <Card title='Horários Disponíveis' style={{ minHeight: '425px' }}>
            {!appointmentData.appointmentDate ? (
              <Col>
                <Text type='secondary'>
                  Selecione uma data para ver os horários disponíveis
                </Text>
              </Col>
            ) : isFetchingDaySchedule ? (
              <Skeleton active />
            ) : availableHoursByDay?.times.morning.length === 0 &&
              availableHoursByDay?.times.afternoon.length === 0 ? (
              <Text type='secondary'>
                Não há horários disponíveis para esta data
              </Text>
            ) : (
              <Col>
                {availableHoursByDay &&
                  availableHoursByDay?.times.morning.length > 0 && (
                    <>
                      <Title level={4}>Manhã</Title>
                      <Row gutter={[8, 8]}>
                        {availableHoursByDay?.times.morning.map((time) => (
                          <Col span={12} key={time}>
                            <Button
                              style={{ width: '100%' }}
                              type={
                                appointmentData.appointmentTime === time
                                  ? 'primary'
                                  : 'default'
                              }
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}

                {availableHoursByDay &&
                  availableHoursByDay?.times.afternoon.length > 0 && (
                    <>
                      <Title level={4}>Tarde</Title>
                      <Row gutter={[8, 8]}>
                        {availableHoursByDay?.times.afternoon.map((time) => (
                          <Col span={12} key={time}>
                            <Button
                              style={{ width: '100%' }}
                              type={
                                appointmentData.appointmentTime === time
                                  ? 'primary'
                                  : 'default'
                              }
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
              </Col>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
