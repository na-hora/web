import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { Alert } from 'antd'
import { useEffect } from 'react'
import styles from './styles.module.css'

export const GlobalAlert: React.FC = () => {
  const { open, setOpen, message, type, duration } = useGlobalAlertContext()

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), duration)
    }
  }, [open, duration, setOpen])

  return (
    open && (
      <Alert
        message={message}
        type={type}
        showIcon
        closable
        onClose={() => setOpen(false)}
        className={styles.alert}
      />
    )
  )
}
