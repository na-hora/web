import { createContext, useContext, useState } from "react";

type RegisterCompanyFormParams = {
  name?: string;
  email?: string;
  password?: string;
  address?: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    complement?: string;
  };
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
    useState<RegisterCompanyFormParams>({});

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
