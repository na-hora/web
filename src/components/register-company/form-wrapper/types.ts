type Address = {
  cityIbge: string | undefined // Ajuste o tipo conforme necessário
  zipCode: string | undefined
  neighborhood: string
  street: string
  number: string
  complement: string
}

export type RegisterCompanyFormData = {
  name: string
  fantasyName: string
  cnpj?: string
  email: string
  phone?: string
  password: string
  address: Address
  validator: string
}
