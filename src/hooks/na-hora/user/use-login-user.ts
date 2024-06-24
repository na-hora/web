import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type UseLoginUserResult = {
  id: string;
  token: string;
};

export type UseLoginUserParams = {
  username: string;
  password: string;
};

export const useLoginUser = () => {
  return useMutation<UseLoginUserResult, AxiosError, UseLoginUserParams>({
    mutationFn: async (
      input: UseLoginUserParams
    ): Promise<UseLoginUserResult> => {
      try {
        const response = await axios.post<UseLoginUserResult>(
          `${import.meta.env.VITE_API_URL}/users/login`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(response.data.toString());
        }

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    mutationKey: ["na-hora:login-user"],
  });
};
