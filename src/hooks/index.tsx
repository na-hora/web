import axios from '@/adapters/http'
import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import {
  InvalidateQueryFilters,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
export const useHooks = () => {
  const { triggerAlert } = useGlobalAlertContext()
  const queryClient = useQueryClient()
  const useGetData = ({
    url,
    options,
    enabled = true,
  }: {
    url: string
    options?: any
    enabled?: boolean
  }) => {
    return useQuery({
      queryKey: [url],
      queryFn: async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
            },
            ...options,
          })

          return response.data
        } catch (error) {
          triggerAlert({
            message: 'Ocorreu um erro inesperado',
            type: 'error',
          })
        }
      },
      enabled,
    })
  }

  const usePostData = <TData, TResponse>({
    url,
    options,
    mutationKey,
  }: {
    url: string
    options?: any
    mutationKey?: string
  }): UseMutationResult<TResponse, unknown, TData, unknown> => {
    return useMutation<TResponse, unknown, TData>({
      mutationFn: async (data: TData) => {
        try {
          const response = await axios.post<TResponse>(url, data, {
            ...options,
          })

          return response.data
        } catch (error) {
          triggerAlert({
            message: 'Ocorreu um erro inesperado',
            type: 'error',
          })

          throw error
        }
      },
      mutationKey: [mutationKey || url],
      onSuccess: () => {
        queryClient.invalidateQueries([
          mutationKey || url,
        ] as InvalidateQueryFilters)
      },
    })
  }

  const usePutData = ({
    url,
    options,
    mutationKey,
  }: {
    url: string
    options?: any
    mutationKey?: string
  }) => {
    return useMutation({
      mutationFn: async (data: any) => {
        try {
          const response = await axios.put(url, data, {
            ...options,
          })

          return response.data
        } catch (error) {
          triggerAlert({
            message: 'Ocorreu um erro inesperado',
            type: 'error',
          })

          throw error
        }
      },
      mutationKey: [mutationKey || url],
      onSuccess: () => {
        queryClient.invalidateQueries([
          mutationKey || url,
        ] as InvalidateQueryFilters)
      },
    })
  }
  const useDeleteData = ({
    url,
    options,
    mutationKey,
  }: {
    url: string
    options?: any
    mutationKey?: string
  }) => {
    return useMutation({
      mutationFn: async () => {
        try {
          const response = await axios.delete(url, {
            ...options,
          })

          return response.data
        } catch (error) {
          triggerAlert({
            message: 'Ocorreu um erro inesperado',
            type: 'error',
          })

          throw error
        }
      },
      mutationKey: [mutationKey || url],
      onSuccess: () => {
        queryClient.invalidateQueries([
          mutationKey || url,
        ] as InvalidateQueryFilters)
      },
    })
  }

  return {
    useGetData,
    usePostData,
    usePutData,
    useDeleteData,
  }
}
