import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { CompanyHour } from '@/hooks/na-hora/company-hour/types/load.type'
import { useLoadCompanyHours } from '@/hooks/na-hora/company-hour/use-load-company-hours'
import { useRelateCompanyHours } from '@/hooks/na-hora/company-hour/use-relate-company-hours'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Switch, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const daysOfWeek = [
  { label: 'Segunda', value: 1 },
  { label: 'Terça', value: 2 },
  { label: 'Quarta', value: 3 },
  { label: 'Quinta', value: 4 },
  { label: 'Sexta', value: 5 },
  { label: 'Sábado', value: 6 },
  { label: 'Domingo', value: 0 },
]

export const DashboardHours = () => {
  const [form] = Form.useForm()
  const { triggerAlert } = useGlobalAlertContext()
  const {
    data: companyHours,
    isLoading: companyHoursLoading,
    isRefetching: companyHoursRefetching,
  } = useLoadCompanyHours()

  const {
    mutate: relateCompanyHoursMutation,
    isPending: relatePending,
    isSuccess: relateSuccess,
    isError: relateError,
  } = useRelateCompanyHours()

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
        [day]: !schedules[day] || schedules[day]?.length == 0 ? true : false,
      }))
    }
  }, [schedules])

  useEffect(() => {
    if (relateSuccess) {
      triggerAlert({
        message: 'Operação realizada com sucesso',
        type: 'success',
      })
    }
  }, [relateSuccess])

  useEffect(() => {
    if (relateError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado na operação',
        type: 'error',
      })
    }
  }, [relateError])

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
    const availableSchedules: CompanyHour[] = []
    if (schedules) {
      const payload = Object.values(schedules).flat()
      for (const schedule of payload) {
        if (schedule && !disabledDays[schedule.weekday]) {
          availableSchedules.push({
            weekday: schedule.weekday,
            startMinute: schedule.startMinute,
            endMinute: schedule.endMinute,
            id: schedule.id,
          })
        }
      }
    }

    form.validateFields().then(() => {
      relateCompanyHoursMutation({
        body: {
          registers: availableSchedules,
        },
      })
    })
  }

  return (
    <Col span={24}>
      <Row
        style={{ marginBottom: '20px' }}
        justify='space-between'
        align='bottom'
      >
        <Col>
          <h1 style={{ marginBottom: '4px' }}>Horários</h1>
          <span>
            Defina aqui os horários que ficarão disponíveis para seus clientes
            agendarem atendimentos
          </span>
        </Col>

        <Col>
          <Button
            type='primary'
            onClick={handleSave}
            block
            style={{ marginTop: 24 }}
            disabled={
              companyHoursLoading || companyHoursRefetching || relatePending
            }
          >
            Salvar Horários
          </Button>
        </Col>
      </Row>
      <Row justify='center' gutter={[16, 24]}>
        <Col span={24}>
          <Form layout='vertical' form={form}>
            <Row gutter={[16, 24]} align='stretch'>
              {daysOfWeek.map((day) => (
                <Col
                  key={day.value}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  style={{
                    marginBottom: '24px',
                    padding: '0 8px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Col style={{ padding: 0 }}>
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
                        disabled={
                          companyHoursRefetching ||
                          companyHoursLoading ||
                          relatePending
                        }
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
                        <Col span={9}>
                          <Form.Item
                            label={index === 0 ? 'Início' : ''}
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
                                companyHoursRefetching ||
                                relatePending
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={9}>
                          <Form.Item
                            label={index === 0 ? 'Fim' : ''}
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
                                companyHoursRefetching ||
                                relatePending
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
                                [day.value]: prev[day.value]?.filter(
                                  (_, i) => i !== index,
                                ),
                              }))
                            }
                            disabled={
                              disabledDays[day.value] ||
                              companyHoursLoading ||
                              companyHoursRefetching ||
                              relatePending
                            }
                          />
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Button
                    type='dashed'
                    onClick={() =>
                      setSchedules((prev) => ({
                        ...prev,
                        [day.value]: [
                          ...(prev[day.value] || []),
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
                      companyHoursRefetching ||
                      relatePending
                    }
                  >
                    Adicionar horário
                  </Button>
                </Col>
              ))}
            </Row>
          </Form>
        </Col>
      </Row>
    </Col>
  )
}
