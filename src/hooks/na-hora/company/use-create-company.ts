import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type UseCreateCompanyAndAddressResult = {
  id: string;
};

export type UseCreateCompanyAndAddressParams = {
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phone: string;
  password: string;
  address: Address;
  validator: string;
};

export interface Address {
  cityIbge: string;
  zipCode: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
}

export const useCreateCompanyAndAddress = () => {
  return useMutation<UseCreateCompanyAndAddressResult>({
    mutationFn: async (
      input: UseCreateCompanyAndAddressParams
    ): Promise<UseCreateCompanyAndAddressResult | void> => {
      try {
        const response = await axios.post<UseCreateCompanyAndAddressResult>(
          "http://localhost:3333/api/v1/companies/register",
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 201) {
          throw new Error(response.data.toString());
        }

        return response.data as UseCreateCompanyAndAddressResult;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    mutationKey: ["na-hora:create-company-and-address"],
  });
};
