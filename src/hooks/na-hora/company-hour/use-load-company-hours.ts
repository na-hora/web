import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadCompanyHoursResponse } from './types/load.type'

export const useLoadCompanyHours =
  (): UseQueryResult<LoadCompanyHoursResponse> => {
    const { useGetData } = useHooks()
    return useGetData({
      url: `${import.meta.env.VITE_API_URL}/companies/hour`,
    })
  }
