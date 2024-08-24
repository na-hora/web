import axios from '@/adapters/http'
import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import {
  InvalidateQueryFilters,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  TDeleteDataParams,
  TGetDataParams,
  TPostDataParams,
  TPutDataParams,
} from './types'

export const useHooks = () => {
  const formattedUrl = (
    url: string,
    dynamicRoute?: string,
    queryParams?: string,
  ) => {
    if (dynamicRoute) {
      url = `${url}/${dynamicRoute}`
    }

    if (queryParams) {
      url = `${url}?${queryParams}`
    }

    return url
  }

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
      queryFn: async (data) => {
        try {
          const { dynamicRoute, queryParams } = data as TGetDataParams

          const response = await axios.get(
            formattedUrl(url, dynamicRoute, queryParams),
            {
              headers: {
                'Content-Type': 'application/json',
              },
              ...options,
            },
          )

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
          const { body, dynamicRoute, queryParams } =
            data as TPostDataParams<TData>
          const response = await axios.post<TResponse>(
            formattedUrl(url, dynamicRoute, queryParams),
            body,
            {
              ...options,
            },
          )

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

  const usePutData = <TData, TResponse>({
    url,
    options,
    mutationKey,
  }: {
    url: string
    options?: any
    mutationKey?: string
  }): UseMutationResult<TResponse, unknown, TData, unknown> => {
    return useMutation<TResponse, unknown, TData>({
      mutationFn: async (data: any) => {
        try {
          const { body, dynamicRoute, queryParams } =
            data as TPutDataParams<TData>
          const response = await axios.put(
            formattedUrl(url, dynamicRoute, queryParams),
            body,
            {
              ...options,
            },
          )

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

  const useDeleteData = <TData, TResponse>({
    url,
    options,
    mutationKey,
  }: {
    url: string
    options?: any
    mutationKey?: string
  }): UseMutationResult<TResponse, unknown, TData, unknown> => {
    return useMutation<TResponse, unknown, TData, unknown>({
      mutationFn: async (data) => {
        try {
          const { dynamicRoute, queryParams } = data as TDeleteDataParams

          const response = await axios.delete(
            formattedUrl(url, dynamicRoute, queryParams),
            {
              ...options,
            },
          )

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
