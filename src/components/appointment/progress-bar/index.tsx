import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Progress, ProgressProps } from 'antd'

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
}

export const AppointmentProgressBar = () => {
  const { currentStep } = useAppointmentContext()

  return (
    <Progress
      percent={currentStep * 17}
      strokeColor={twoColors}
      showInfo={currentStep === 6}
    />
  )
}
