import { locale } from '@/utils/calendar'
import { Button, Calendar, Card, Col, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const { Title, Text } = Typography

export const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedTime, setSelectedTime] = useState(null)

  const fakeTimeSlots = {
    morning: ['08:00', '09:00', '10:00', '11:00'],
    afternoon: ['14:00', '15:00', '16:00', '17:00'],
  }

  const handleDateSelect = (date: any) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: any) => {
    setSelectedTime(time)
  }

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day')
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
                <Title level={4}>Manhã</Title>
                <Row gutter={[8, 8]}>
                  {fakeTimeSlots.morning.map((time) => (
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

                <Title level={4}>Tarde</Title>
                <Row gutter={[8, 8]}>
                  {fakeTimeSlots?.afternoon?.map((time) => (
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
