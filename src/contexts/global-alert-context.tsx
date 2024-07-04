import { createContext, useContext, useState } from 'react'

type AlertTypes = 'error' | 'success' | 'warning' | 'info'
export type Params = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  type: AlertTypes
  setType: React.Dispatch<
    React.SetStateAction<'error' | 'success' | 'warning' | 'info'>
  >
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  triggerAlert: (params: TriggerAlertParams) => void
}

type TriggerAlertParams = {
  message: string
  type: AlertTypes
  duration?: number
}

export const GlobalAlertContext = createContext<Params>({} as Params)

export const GlobalAlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<Params['type']>('success')
  const [duration, setDuration] = useState(5000)

  const triggerAlert = ({ message, type, duration }: TriggerAlertParams) => {
    setMessage(message)
    setType(type)
    if (duration) setDuration(duration)
    setOpen(true)
  }

  return (
    <GlobalAlertContext.Provider
      value={{
        open,
        setOpen,
        message,
        type,
        setMessage,
        setType,
        duration,
        setDuration,
        triggerAlert,
      }}
    >
      {children}
    </GlobalAlertContext.Provider>
  )
}

export const useGlobalAlertContext = (): Params => {
  return useContext(GlobalAlertContext)
}
