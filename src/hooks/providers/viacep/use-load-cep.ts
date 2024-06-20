import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseLoadCepResult = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
};

export const useLoadViaCepCep = (
  cep: string
): UseQueryResult<UseLoadCepResult> => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    queryKey: ["via_cep", cep],
  });
};
