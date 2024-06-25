import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export type UseForgotPasswordUserParams = {
  email: string
}

export const useForgotPasswordUser = () => {
  return useMutation<void, AxiosError, UseForgotPasswordUserParams>({
    mutationFn: async (input: UseForgotPasswordUserParams): Promise<void> => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/forgot-password`,
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
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    mutationKey: ['na-hora:forgot-password-user'],
  })
}
