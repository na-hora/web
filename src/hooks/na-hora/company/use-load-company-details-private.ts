import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { CompanyInfoResponse } from './types/load-company-details'

export const useLoadCompanyDetailsPrivate =
  (): UseQueryResult<CompanyInfoResponse> => {
    const { useGetData } = useHooks()

    return useGetData({
      url: `${import.meta.env.VITE_API_URL}/companies/info-private`,
    })
  }
