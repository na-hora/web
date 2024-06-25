import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export type UseResetPasswordUserParams = {
  email: string
  password: string
  validator: string
}

export const useResetPasswordUser = () => {
  return useMutation<string, AxiosError, UseResetPasswordUserParams>({
    mutationFn: async (input: UseResetPasswordUserParams): Promise<string> => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/reset-password`,
          input,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.status !== 200) {
          throw new Error(response.data.toString())
        }

        return response.data
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    mutationKey: ['na-hora:reset-password-user'],
  })
}
