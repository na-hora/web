import { StepProps, Steps } from 'antd'

type Props = {
  items: StepProps[] | undefined
  current: number
}

export const StepsBlueprint = ({ items, current = 0 }: Props) => (
  <Steps current={current} items={items} />
)
