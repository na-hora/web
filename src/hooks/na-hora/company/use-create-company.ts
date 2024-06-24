import { useRegisterCompanyContext } from "@/pages/company/contexts/register-company-provider"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

type UseCreateCompanyAndAddressResult = {
  id: string
}

export type UseCreateCompanyAndAddressParams = {
  name: string
  fantasyName: string
  cnpj: string
  email: string
  phone: string
  password: string
  address: Address
  validator: string
}

export interface Address {
  cityIbge: string
  zipCode: string
  neighborhood: string
  street: string
  number: string
  complement: string
}

export const useCreateCompanyAndAddress = () => {
  const { setCurrentStep } = useRegisterCompanyContext()

  return useMutation<
    UseCreateCompanyAndAddressResult,
    AxiosError,
    UseCreateCompanyAndAddressParams
  >({
    mutationFn: async (
      input: UseCreateCompanyAndAddressParams
    ): Promise<UseCreateCompanyAndAddressResult> => {
      try {
        const response = await axios.post<UseCreateCompanyAndAddressResult>(
          `${import.meta.env.VITE_API_URL}/companies/register`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (response.status !== 201) {
          throw new Error(response.data.toString())
        }

        return response.data
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    mutationKey: ["na-hora:create-company-and-address"],
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1)
    },
  })
}
