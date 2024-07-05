import axios from '@/adapters/http'
import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useQuery } from '@tanstack/react-query'
export const useHooks = () => {
  const { triggerAlert } = useGlobalAlertContext()
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

  const usePostData = ({ url, options }: { url: string; options?: any }) => {
    return useQuery({
      queryKey: [url],
      queryFn: async () => {
        try {
          const response = await axios.post(url, {
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
    })
  }

  const usePutData = ({ url, options }: { url: string; options?: any }) => {
    return useQuery({
      queryKey: [url],
      queryFn: async () => {
        try {
          const response = await axios.put(url, {
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
    })
  }

  const useDeleteData = ({ url, options }: { url: string; options?: any }) => {
    return useQuery({
      queryKey: [url],
      queryFn: async () => {
        try {
          const response = await axios.delete(url, {
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
    })
  }

  return {
    useGetData,
    usePostData,
    usePutData,
    useDeleteData,
  }
}
