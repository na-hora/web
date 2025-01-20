import { Input } from 'antd'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Input>

export const PhoneInput = (props: Props) => {
  return (
    <Input
      placeholder='(00) 00000-0000'
      maxLength={15}
      pattern='\(\d{2}\) \d{5}-\d{4}'
      {...props}
    />
  )
}
