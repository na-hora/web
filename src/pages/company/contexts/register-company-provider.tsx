import { createContext, useContext, useState } from "react";

type RegisterCompanyFormParams = {
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phone: string;
  password: string;
  address?: {
    zipCode: string;
    cityId: number;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
  };
  validator: string;
};

export type Params = {
  registerCompanyFormData: RegisterCompanyFormParams;
  setRegisterCompanyFormData: React.Dispatch<
    React.SetStateAction<RegisterCompanyFormParams>
  >;
};

export const RegisterCompanyContext = createContext<Params>({} as Params);

export const RegisterCompanyProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [registerCompanyFormData, setRegisterCompanyFormData] =
    useState<RegisterCompanyFormParams>({} as RegisterCompanyFormParams);

  return (
    <RegisterCompanyContext.Provider
      value={{ registerCompanyFormData, setRegisterCompanyFormData }}
    >
      {children}
    </RegisterCompanyContext.Provider>
  );
};

export const useRegisterCompanyContext = (): Params => {
  return useContext(RegisterCompanyContext);
};
