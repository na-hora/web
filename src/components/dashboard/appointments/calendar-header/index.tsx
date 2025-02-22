import { useAppointmentsContext } from '@/pages/dashboard/appointments/contexts/appointments-provider'
import { fullMonthAndYearDate } from '@/utils/time'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Row, Select } from 'antd'
import { useCallback, useEffect } from 'react'

type ViewType = 'month' | 'week' | 'day'

const viewModeOptions = [
  {
    title: 'Mês',
    value: 'month',
  },
  {
    title: 'Semana',
    value: 'week',
  },
  {
    title: 'Dia',
    value: 'day',
  },
]

export type FormattedServices = {
  id: string
  name: string
  backgroundColor: string
  borderColor: string
  dragBackgroundColor: string
}[]

type Props = {
  services: FormattedServices
}

export const CalendarHeader = ({ services }: Props) => {
  const {
    selectedDateRangeText,
    setSelectedDateRangeText,
    selectedView,
    setSelectedView,
    calendarRef,
    petServiceIdFilter,
    setPetServiceIdFilter,
  } = useAppointmentsContext()
  const getCallInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    [],
  )

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCallInstance()
    if (!calInstance) {
      setSelectedDateRangeText('')
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
  }, [])

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

  const petServiceFilter = (id: string) => {
    if (id === petServiceIdFilter) {
      setPetServiceIdFilter('')
      return
    }

    setPetServiceIdFilter(id)
  }

  return (
    <Row align='middle' style={{ marginBottom: 16, gap: 10 }}>
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

      {services.map(({ id, name, backgroundColor }) => (
        <Button
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            borderColor: `${petServiceIdFilter === id ? '#03fc24' : ''}`,
          }}
          onClick={() => petServiceFilter(id)}
        >
          <span>{name}</span>
          <div
            style={{
              backgroundColor,
              height: '20px',
              width: '20px',
              borderRadius: '50%',
            }}
          ></div>
        </Button>
      ))}
    </Row>
  )
}
