import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Row, Select } from 'antd'

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

export const CalendarHeader = ({
  selectedView,
  selectedDateRangeText,
  onChangeSelect,
  onClickNavi,
}: {
  selectedView: ViewType
  selectedDateRangeText: string
  onChangeSelect: (value: ViewType) => void
  onClickNavi: (ev: React.MouseEvent<HTMLButtonElement>) => void
}) => {
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
    </Row>
  )
}
