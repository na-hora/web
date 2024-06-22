import { createContext, useContext } from "react";

export type Params = {
  // teste: number
  // setTeste: React.Dispatch<React.SetStateAction<number>>
};

export const DashboardContext = createContext<Params>({} as Params);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [teste, setTeste] = useState(0)

  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
};

export const useDashboardContext = (): Params => {
  return useContext(DashboardContext);
};
