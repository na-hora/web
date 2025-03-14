import { LoadPetServicesResponse } from '@/hooks/na-hora/pet-services/types/list.type'
import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { fullMonthAndYearDate } from '@/utils/time'
import {
  LeftOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Flex, Row, Select, Spin, Typography } from 'antd'
import { parseCookies } from 'nookies'
import { useCallback, useEffect } from 'react'

type ViewType = 'month' | 'week' | 'day'

const viewModeOptions = [
  { title: 'Mês', value: 'month' },
  { title: 'Semana', value: 'week' },
  { title: 'Dia', value: 'day' },
]

export type FormattedServices = {
  id: string
  name: string
  backgroundColor: string
  borderColor: string
  dragBackgroundColor: string
}[]

type CalendarHeaderProps = {
  services?: LoadPetServicesResponse | undefined
}

export const CalendarHeader = ({ services } = [] as CalendarHeaderProps) => {
  const {
    selectedDateRangeText,
    setSelectedDateRangeText,
    selectedView,
    setSelectedView,
    calendarRef,
    petServiceIdFilter,
    setPetServiceIdFilter,
    fetchingAppointments,
  } = useAppointmentsContext()

  const getCallInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    [],
  )

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCallInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
      return
    }

    const viewName = calInstance.getViewName()
    const calDate = calInstance.getDate()
    const rangeStart = calInstance.getDateRangeStart()
    const rangeEnd = calInstance.getDateRangeEnd()

    const year = calDate.getFullYear()
    const month = calDate.getMonth() + 1
    const date = calDate.getDate()
    let dateRangeText: string

    switch (viewName) {
      case 'month': {
        dateRangeText = fullMonthAndYearDate<string>(month, year)
        break
      }
      case 'week': {
        const startDate = `${rangeStart
          .getDate()
          .toString()
          .padStart(2, '0')}/${(rangeStart.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${rangeStart.getFullYear()}`
        const endDate = `${rangeEnd.getDate().toString().padStart(2, '0')}/${(
          rangeEnd.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${rangeEnd.getFullYear()}`
        dateRangeText = `${startDate} - ${endDate}`
        break
      }
      default:
        dateRangeText = `${date}/${month}/${year}`
    }

    setSelectedDateRangeText(dateRangeText)
  }, [getCallInstance, setSelectedDateRangeText])

  const onClickNavi = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (ev.currentTarget.tagName === 'BUTTON') {
      const button = ev.currentTarget
      const actionName = (
        button.getAttribute('data-action') ?? 'month'
      ).replace('move-', '')
      getCallInstance()[actionName]()
      updateRenderRangeText()
    }
  }

  const onChangeSelect = (value: ViewType) => {
    setSelectedView(value)
    getCallInstance().changeView(value)
  }

  useEffect(() => {
    updateRenderRangeText()
  }, [selectedView, updateRenderRangeText])

  const handleServiceFilterChange = (selectedIds: string[]) => {
    setPetServiceIdFilter(selectedIds)
  }

  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  return (
    <Row
      align='middle'
      justify='space-between'
      style={{ marginBottom: 16, gap: 10 }}
    >
      <Flex gap='middle' vertical={false} align='center'>
        <Select
          style={{ width: 120 }}
          value={selectedView}
          onChange={(value: ViewType) => onChangeSelect(value)}
        >
          {viewModeOptions.map((option, index) => (
            <Select.Option value={option.value} key={index}>
              {option.title}
            </Select.Option>
          ))}
        </Select>

        <Button data-action='move-today' onClick={onClickNavi}>
          Hoje
        </Button>

        <Button data-action='move-prev' onClick={onClickNavi}>
          <LeftOutlined />
        </Button>

        <span className='render-range'>{selectedDateRangeText}</span>

        <Button data-action='move-next' onClick={onClickNavi}>
          <RightOutlined />
        </Button>

        <Select
          mode='multiple'
          style={{ width: 200 }}
          value={petServiceIdFilter}
          onChange={handleServiceFilterChange}
          placeholder='Filtrar por serviço'
          allowClear
        >
          {services?.map(({ id, name }) => (
            <Select.Option value={String(id)} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>

        <Spin spinning={fetchingAppointments} />
      </Flex>

      <Typography.Link href={`/appointment?q=${companyId}`} target='_blank'>
        <PlusCircleOutlined /> Criar agendamento
      </Typography.Link>
    </Row>
  )
}
