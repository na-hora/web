import { useLoadAvailableDays } from '@/hooks/na-hora/appointments/use-load-available-days'
import { useLoadCompleteDaySchedule } from '@/hooks/na-hora/appointments/use-load-complete-day-schedule'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { locale } from '@/utils/calendar'
import { Button, Calendar, Card, Col, Row, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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
  const [availableDates, setAvailableDates] = useState<TimeSlot[]>([])
  const [timeSlots, setTimeSlots] = useState<{
    morning: string[]
    afternoon: string[]
  }>({
    morning: [],
    afternoon: [],
  })

  const { data: availableDays, isFetching: isFetchingAvailableDays } =
    useLoadAvailableDays()

  const { data: completeDaySchedule, isFetching: isFetchingDaySchedule } =
    useLoadCompleteDaySchedule()

  useEffect(() => {
    const processApiData = (data: string[] | undefined) => {
      if (!data) return

      const dateMap = new Map<
        string,
        { morning: string[]; afternoon: string[] }
      >()

      data.forEach((slot) => {
        const dateTime = dayjs(slot)
        const date = dateTime.format('YYYY-MM-DD')
        const time = dateTime.format('HH:mm')
        const hour = dateTime.hour()

        if (!dateMap.has(date)) {
          dateMap.set(date, { morning: [], afternoon: [] })
        }

        const slots = dateMap.get(date)!
        if (hour < 12) {
          slots.morning.push(time)
        } else {
          slots.afternoon.push(time)
        }
      })

      const processed: TimeSlot[] = Array.from(dateMap.entries()).map(
        ([date, times]) => ({
          date,
          times,
        }),
      )

      setAvailableDates(processed)
    }

    processApiData(availableDays)
  }, [availableDays])

  useEffect(() => {
    if (completeDaySchedule) {
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

      setTimeSlots({ morning, afternoon })
    }
  }, [completeDaySchedule])

  const handleDateSelect = async (date: dayjs.Dayjs) => {
    setTimeSlots({ morning: [], afternoon: [] })

    setAppointmentData((prev) => ({
      ...prev,
      appointmentDate: date,
      appointmentDateString: date.format('YYYY-MM-DD'),
    }))

    const selectedDateStr = date.format('YYYY-MM-DD')
    const availableSlot = availableDates.find(
      (slot) => slot.date === selectedDateStr,
    )

    if (!availableSlot) {
      setTimeSlots({ morning: [], afternoon: [] })
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
    const isUnavailable = !availableDates.some(
      (slot) => slot.date === currentDateStr,
    )

    return isBeforeToday || isUnavailable
  }

  return (
    <div style={{ margin: '0 auto', padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Escolha seu Horário
      </Title>

      <Row gutter={24} style={{ gap: '24px' }} justify='center'>
        <Col xs={24} md={11}>
          <Card title='Selecione uma Data'>
            {isFetchingAvailableDays ? (
              <Skeleton active />
            ) : (
              <Calendar
                fullscreen={false}
                onSelect={handleDateSelect}
                value={appointmentData.appointmentDate as dayjs.Dayjs}
                disabledDate={disabledDate}
                locale={locale}
              />
            )}
          </Card>
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
            ) : timeSlots.morning.length === 0 &&
              timeSlots.afternoon.length === 0 ? (
              <Text type='secondary'>
                Não há horários disponíveis para esta data
              </Text>
            ) : (
              <Col>
                {timeSlots.morning.length > 0 && (
                  <>
                    <Title level={4}>Manhã</Title>
                    <Row gutter={[8, 8]}>
                      {timeSlots.morning.map((time) => (
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

                {timeSlots.afternoon.length > 0 && (
                  <>
                    <Title level={4}>Tarde</Title>
                    <Row gutter={[8, 8]}>
                      {timeSlots.afternoon.map((time) => (
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
