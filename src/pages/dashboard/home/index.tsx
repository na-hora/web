import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useLoadNaHoraStates } from '@/hooks/na-hora/address/use-load-states'
import { useEffect, useState } from 'react'

type State = {
  id: number
  name: string
  uf: string
}

export const DashboardHome = () => {
  const [states, setStates] = useState<Array<State>>([])
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

  return <Component states={states} />
}

const Component = ({ states }: { states: State[] }) => {
  return (
    <ul>
      {states?.map((state) => (
        <li key={state?.name}>{state?.name}</li>
      ))}
    </ul>
  )
}
