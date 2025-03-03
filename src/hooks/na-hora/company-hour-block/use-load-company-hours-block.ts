import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { LoadCompanyHourBlocksResponse } from './types/load.type'

export const useLoadCompanyHoursBlock =
  (): UseQueryResult<LoadCompanyHourBlocksResponse> => {
    const { useGetData } = useHooks()
    return useGetData({
      url: `${import.meta.env.VITE_API_URL}/companies/hour/block`,
    })
  }
