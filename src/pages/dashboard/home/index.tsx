import http from '@/adapters/http'
import { Suspense, useState } from 'react'

export const DashboardHome = () => {
  const [states, setStates] = useState([])
  console.log('states: ', states)
  const getData = async () => {
    const response = await http.get('http://localhost:3333/api/v1/states/')

    setStates(response.data.states)
  }

  // useEffect(() => {
  //   getData()
  // }, [])

  getData()
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
