import { Outlet } from 'react-router-dom'
import styles from './styles.module.css'

export const Admin = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  )
}
