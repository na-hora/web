import { createContext, useContext, useState } from "react"

export type Params = {
  teste: number
  setTeste: React.Dispatch<React.SetStateAction<number>>
}

export const DashboardContext = createContext<Params>({} as Params)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teste, setTeste] = useState(0)

  return (
    <DashboardContext.Provider value={{ teste, setTeste }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = (): Params => {
  return useContext(DashboardContext)
}
