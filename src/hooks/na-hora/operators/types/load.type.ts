export type Operator = {
  id: number
  name: string
  petServices: Array<{ id: number; name: string }>
}

export type LoadOperatorsResponse = { operators: Array<Operator> }
