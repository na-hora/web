import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, TimePicker, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

type Schedule = {
  weekDay: number
  startHour: number
  endHour: number
}

const daysOfWeek = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda-feira', value: 1 },
  { label: 'Terça-feira', value: 2 },
  { label: 'Quarta-feira', value: 3 },
  { label: 'Quinta-feira', value: 4 },
  { label: 'Sexta-feira', value: 5 },
  { label: 'Sábado', value: 6 },
]

export const DashboardHours = () => {
  const [schedules, setSchedules] = useState<{ [key: number]: Schedule[] }>(
    () =>
      daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day.value]: [{ weekDay: day.value, startHour: 6, endHour: 12 }],
        }),
        {},
      ),
  )

  const addSubline = (weekDay: number) => {
    setSchedules((prev) => ({
      ...prev,
      [weekDay]: [
        ...prev[weekDay],
        { weekDay, startHour: 6, endHour: 12 }, // Default new period
      ],
    }))
  }

  const removeSchedule = (weekDay: number, index: number) => {
    setSchedules((prev) => ({
      ...prev,
      [weekDay]: prev[weekDay].filter((_, i) => i !== index),
    }))
  }

  const handleScheduleChange = (
    weekDay: number,
    index: number,
    field: keyof Schedule,
    value: number | dayjs.Dayjs,
  ) => {
    setSchedules((prev) => {
      const updatedSchedules = [...prev[weekDay]]
      if (field === 'startHour' || field === 'endHour') {
        updatedSchedules[index][field] =
          dayjs(value).hour() + dayjs(value).minute() / 60
      } else {
        updatedSchedules[index][field] = value as number
      }
      return { ...prev, [weekDay]: updatedSchedules }
    })
  }

  const handleSave = () => {
    const payload = Object.values(schedules).flat()
    console.log(payload) // Replace with your API call
  }

  return (
    <Form
      layout='vertical'
      // style={{ padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}
    >
      {daysOfWeek.map((day) => (
        <Col
          key={day.value}
          style={{
            marginBottom: 24,
            background: '#fff',
            padding: 16,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography.Title level={5}>{day.label}</Typography.Title>
          {schedules[day.value].map((schedule, index) => (
            <Row gutter={[16, 16]} key={index} align='middle'>
              <Col xs={24} sm={10}>
                <Form.Item label={index === 0 ? 'Hora inicial' : ''}>
                  <TimePicker
                    format='HH:mm'
                    value={dayjs()
                      .hour(Math.floor(schedule.startHour))
                      .minute((schedule.startHour % 1) * 60)}
                    onChange={(value) =>
                      handleScheduleChange(
                        day.value,
                        index,
                        'startHour',
                        value!,
                      )
                    }
                    style={{ width: '20%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item label={index === 0 ? 'Hora final' : ''}>
                  <TimePicker
                    format='HH:mm'
                    value={dayjs()
                      .hour(Math.floor(schedule.endHour))
                      .minute((schedule.endHour % 1) * 60)}
                    onChange={(value) =>
                      handleScheduleChange(day.value, index, 'endHour', value!)
                    }
                    style={{ width: '20%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={4}>
                {schedules[day.value].length > 1 && (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeSchedule(day.value, index)}
                    style={{ width: '100%' }}
                  >
                    Remover
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          <Button
            type='dashed'
            onClick={() => addSubline(day.value)}
            style={{ marginTop: 16, width: '20%' }}
            icon={<PlusOutlined />}
          >
            Adicionar horário
          </Button>
        </Col>
      ))}
      <Button
        type='primary'
        onClick={handleSave}
        block
        style={{ marginTop: 24 }}
      >
        Salvar Horários
      </Button>
    </Form>
  )
}
