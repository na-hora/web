import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useLoadNaHoraStates } from '@/hooks/na-hora/address/use-load-states'
import { Suspense, useEffect, useState } from 'react'

export const DashboardHome = () => {
  const [states, setStates] = useState([])
  const { triggerAlert } = useGlobalAlertContext()

  const { data } = useLoadNaHoraStates()

  useEffect(() => {
    if (data) {
      setStates(data.states)
      triggerAlert({
        type: 'success',
        message: 'Estados carregados com sucesso',
      })
    }
  }, [data])

  return (
    <Suspense fallback='Carregando...'>
      <Component states={states} />
    </Suspense>
  )
}

const Component = ({ states }) => {
  return (
    <ul>
      {states?.map((state) => (
        <li key={state?.name}>{state?.name}</li>
      ))}
    </ul>
  )
}
