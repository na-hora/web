import { Button } from 'antd'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof Button>
type ButtonStyle = ComponentProps<typeof Button>['style']

type Props = ButtonProps & {
  children: React.ReactNode
  style?: ButtonStyle
}

export const AppointmentButton = ({ children, style, ...props }: Props) => {
  return (
    <Button
      {...props}
      type='primary'
      style={{
        background: '#3196b5',
        padding: '20px 32px',
        width: '80%',
        borderRadius: '24px',
        ...style,
      }}
    >
      {children}
    </Button>
  )
}
