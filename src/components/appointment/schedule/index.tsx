import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { locale } from '@/utils/calendar'
import { Button, Calendar, Card, Col, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

interface TimeSlot {
  date: string
  times: {
    morning: string[]
    afternoon: string[]
  }
}

export const Schedule = () => {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } =
    useAppointmentContext()
  const [availableDates, setAvailableDates] = useState<TimeSlot[]>([])
  const [timeSlots, setTimeSlots] = useState<{
    morning: string[]
    afternoon: string[]
  }>({
    morning: [],
    afternoon: [],
  })

  const mockApiData = [
    {
      datetime: '2024-12-20T10:00:00',
    },
    {
      datetime: '2024-12-27T08:00:00',
    },
    {
      datetime: '2024-12-27T09:00:00',
    },
    {
      datetime: '2024-12-27T14:00:00',
    },
    {
      datetime: '2024-12-27T10:00:00',
    },
  ]

  useEffect(() => {
    const processApiData = (data: any[]) => {
      const dateMap = new Map<
        string,
        { morning: string[]; afternoon: string[] }
      >()

      data.forEach((slot) => {
        const dateTime = dayjs(slot.datetime)
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

    processApiData(mockApiData)
  }, [])

  const handleDateSelect = (date: any) => {
    setSelectedDate(date)
    setSelectedTime(null)

    const selectedDateStr = date.format('YYYY-MM-DD')
    const availableSlot = availableDates.find(
      (slot) => slot.date === selectedDateStr,
    )

    if (availableSlot) {
      setTimeSlots(availableSlot.times)
    } else {
      setTimeSlots({ morning: [], afternoon: [] })
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Escolha seu Horário
      </Title>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card title='Selecione uma Data'>
            <Calendar
              fullscreen={false}
              onSelect={handleDateSelect}
              value={selectedDate}
              disabledDate={disabledDate}
              locale={locale}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Horários Disponíveis' style={{ height: '425px' }}>
            {selectedDate ? (
              <Col>
                {timeSlots.morning.length > 0 && (
                  <>
                    <Title level={4}>Manhã</Title>
                    <Row gutter={[8, 8]}>
                      {timeSlots.morning.map((time) => (
                        <Col span={12} key={time}>
                          <Button
                            style={{ width: '100%' }}
                            type={selectedTime === time ? 'primary' : 'default'}
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
                            type={selectedTime === time ? 'primary' : 'default'}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {timeSlots.morning.length === 0 &&
                  timeSlots.afternoon.length === 0 && (
                    <Text type='secondary'>
                      Não há horários disponíveis para esta data
                    </Text>
                  )}
              </Col>
            ) : (
              <Col>
                <Text type='secondary'>
                  Selecione uma data para ver os horários disponíveis
                </Text>
              </Col>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
