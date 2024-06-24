import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'

type UseLoadStatesResult = {
  states: {
    id: number
    name: string
    uf: string
  }[]
}

export const useLoadNaHoraStates = (): UseQueryResult<UseLoadStatesResult> => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get('http://localhost:3333/api/v1/states', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    },
    queryKey: ['na-hora:states'],
  })
}
