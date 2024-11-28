import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, TimePicker, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const daysOfWeek = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda-feira', value: 1 },
  { label: 'Terça-feira', value: 2 },
  { label: 'Quarta-feira', value: 3 },
  { label: 'Quinta-feira', value: 4 },
  { label: 'Sexta-feira', value: 5 },
  { label: 'Sábado', value: 6 },
]

interface Schedule {
  weekDay: number
  startMinute: number
  endMinute: number
}

export const DashboardHours = () => {
  const [schedules, setSchedules] = useState<{ [key: number]: Schedule[] }>(
    () =>
      daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day.value]: [],
        }),
        {},
      ),
  )

  const addSubline = (weekDay: number) => {
    setSchedules((prev) => ({
      ...prev,
      [weekDay]: [
        ...prev[weekDay],
        { weekDay, startMinute: 480, endMinute: 720 }, // Default 08:00 to 12:00
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
    value: dayjs.Dayjs | null,
  ) => {
    if (!value) return
    const totalMinutes = value.hour() * 60 + value.minute()
    setSchedules((prev) => {
      const updatedSchedules = [...prev[weekDay]]
      updatedSchedules[index][field] = totalMinutes
      return { ...prev, [weekDay]: updatedSchedules }
    })
  }

  const handleSave = () => {
    const payload = Object.values(schedules).flat()
    console.log(payload) // Replace with your API call
  }

  return (
    <>
      <h1 style={{ marginBottom: '4px' }}>Horários</h1>
      <span>
        Defina aqui os horários que ficarão disponíveis para seus clientes
        agendarem atendimentos
      </span>
      <Row justify='center'>
        <Col span={10}>
          <Form layout='vertical'>
            {daysOfWeek.map((day) => (
              <div
                key={day.value}
                style={{
                  marginBottom: 24,
                  padding: '4px 16px',
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '500px',
                }}
              >
                <Typography.Title level={5} style={{ marginBottom: 16 }}>
                  {day.label}
                </Typography.Title>
                {schedules[day.value].map((schedule, index) => (
                  <Col
                    key={index}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                      marginBottom: 16,
                      justifyContent: 'center',
                    }}
                  >
                    <Form.Item
                      label={index === 0 ? 'Hora inicial' : ''}
                      style={{ marginBottom: 0 }}
                    >
                      <TimePicker
                        format='HH:mm'
                        value={dayjs()
                          .hour(Math.floor(schedule.startMinute / 60))
                          .minute(schedule.startMinute % 60)}
                        onChange={(value) =>
                          handleScheduleChange(
                            day.value,
                            index,
                            'startMinute',
                            value,
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label={index === 0 ? 'Hora final' : ''}
                      style={{ marginBottom: 0 }}
                    >
                      <TimePicker
                        format='HH:mm'
                        value={dayjs()
                          .hour(Math.floor(schedule.endMinute / 60))
                          .minute(schedule.endMinute % 60)}
                        onChange={(value) =>
                          handleScheduleChange(
                            day.value,
                            index,
                            'endMinute',
                            value,
                          )
                        }
                      />
                    </Form.Item>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeSchedule(day.value, index)}
                      style={{
                        height: 'fit-content',
                        alignSelf: 'flex-end',
                      }}
                    >
                      Remover
                    </Button>
                  </Col>
                ))}
                <Button
                  type='dashed'
                  onClick={() => addSubline(day.value)}
                  icon={<PlusOutlined />}
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  Adicionar horário
                </Button>
              </div>
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
        </Col>
      </Row>
    </>
  )
}
