import { CompanyHour } from '@/hooks/na-hora/company-hour/types/load.type'
import { useLoadCompanyHours } from '@/hooks/na-hora/company-hour/use-load-company-hours'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Row, Switch, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

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
  const {
    data: companyHours,
    isLoading: companyHoursLoading,
    isRefetching: companyHoursRefetching,
  } = useLoadCompanyHours()

  const [schedules, setSchedules] = useState<{ [key: number]: CompanyHour[] }>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  })

  useEffect(() => {
    setSchedules(() => {
      const updatedSchedules = daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day.value]: companyHours?.filter((h) => h.weekday === day.value),
        }),
        {},
      )
      return updatedSchedules
    })
  }, [companyHours])

  useEffect(() => {
    for (const day in schedules) {
      setDisabledDays((prev) => ({
        ...prev,
        [day]: schedules[day]?.length == 0 ? true : false,
      }))
    }
  }, [schedules])

  const [disabledDays, setDisabledDays] = useState<{ [key: number]: boolean }>(
    () =>
      daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day.value]: false,
        }),
        {},
      ),
  )

  const toggleDayAvailability = (weekday: number) => {
    setDisabledDays((prev) => ({
      ...prev,
      [weekday]: !prev[weekday],
    }))
  }

  const handleScheduleChange = (
    weekday: number,
    index: number,
    field: keyof CompanyHour,
    value: dayjs.Dayjs | null,
  ) => {
    if (!value) return
    const totalMinutes = value.hour() * 60 + value.minute()
    setSchedules((prev) => {
      const updatedSchedules = [...prev[weekday]]
      updatedSchedules[index][field] = totalMinutes
      return { ...prev, [weekday]: updatedSchedules }
    })
  }

  const handleSave = () => {
    const payload = Object.values(schedules).flat()
    const availableSchedules = payload.filter(
      (schedule) => !disabledDays[schedule.weekday],
    )

    console.log(availableSchedules)
  }

  return (
    <Col>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <h1 style={{ marginBottom: '4px' }}>Horários</h1>
          <span>
            Defina aqui os horários que ficarão disponíveis para seus clientes
            agendarem atendimentos
          </span>
        </Col>
      </Row>
      <Row justify='center' gutter={[0, 24]}>
        <Col span={24}>
          <Form layout='vertical'>
            {daysOfWeek.map((day) => (
              <Col
                key={day.value}
                style={{
                  marginBottom: '24px',
                  background: '#fafafa',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  padding: '0 16px 16px',
                }}
              >
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2>{day.label}</h2>
                  <Switch
                    checked={disabledDays[day.value]}
                    onChange={() => toggleDayAvailability(day.value)}
                    style={{
                      backgroundColor: disabledDays[day.value]
                        ? '#ff4d4f'
                        : '#52c41a',
                    }}
                    checkedChildren='Indisponível'
                    unCheckedChildren='Disponível'
                    disabled={companyHoursRefetching || companyHoursLoading}
                  />
                </Col>
                {schedules[day.value]?.map((schedule, index) => (
                  <Row
                    key={index}
                    gutter={16}
                    style={{
                      marginBottom: '16px',
                      alignItems: index === 0 ? 'flex-end' : 'center',
                    }}
                  >
                    <Col>
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
                          disabled={
                            disabledDays[day.value] ||
                            companyHoursLoading ||
                            companyHoursRefetching
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col>
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
                          disabled={
                            disabledDays[day.value] ||
                            companyHoursLoading ||
                            companyHoursRefetching
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setSchedules((prev) => ({
                            ...prev,
                            [day.value]: prev[day.value].filter(
                              (_, i) => i !== index,
                            ),
                          }))
                        }
                        disabled={
                          disabledDays[day.value] ||
                          companyHoursLoading ||
                          companyHoursRefetching
                        }
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  type='dashed'
                  onClick={() =>
                    setSchedules((prev) => ({
                      ...prev,
                      [day.value]: [
                        ...prev[day.value],
                        {
                          id: 0,
                          weekday: day.value,
                          startMinute: 480,
                          endMinute: 720,
                        },
                      ],
                    }))
                  }
                  icon={<PlusOutlined />}
                  style={{
                    marginTop: 8,
                    width: '100%',
                  }}
                  disabled={
                    disabledDays[day.value] ||
                    companyHoursLoading ||
                    companyHoursRefetching
                  }
                >
                  Adicionar horário
                </Button>
              </Col>
            ))}
            <Divider />
            <Button
              type='primary'
              onClick={handleSave}
              block
              style={{ marginTop: 24 }}
              disabled={companyHoursLoading || companyHoursRefetching}
            >
              Salvar Horários
            </Button>
          </Form>
        </Col>
      </Row>
    </Col>
  )
}
