import { useHooks } from '@/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import {  CompanyResponsePublic } from './types/load-company-details'

export const useLoadCompanyDetailsPublic =
  (companyId: string | null): UseQueryResult<CompanyResponsePublic> => {
    const { useGetData } = useHooks()

    return useGetData({
      url: `${import.meta.env.VITE_API_URL}/companies/info-public?q=${companyId}`,
      enabled: !!companyId,
    })
  }
