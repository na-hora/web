export interface CompanyInfoResponse {
  id: string
  name: string
  fantasyName: string
  cnpj: string
  email: string
  phone: string
  avatarUrl: string
  categoryId: number
  createdAt: string
  updatedAt: string
  category: Category
  companyHours: any
  companyAddresses: CompanyAddress[]
  users: any
  services: any
  appointments: any
  companyPetBreeds: any
  companyPetSizes: any
}

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface CompanyAddress {
  id: string
  companyId: string
  zipCode: string
  cityId: number
  neighborhood: string
  street: string
  number: string
  complement: string
  createdAt: string
  updatedAt: string
  company: Company
  city: City
}

export interface Company {
  id: string
  name: string
  fantasyName: string
  cnpj: string
  email: string
  phone: string
  avatarUrl: string
  categoryId: number
  createdAt: string
  updatedAt: string
  category: Category2
  companyHours: any
  companyAddresses: any
  users: any
  services: any
  appointments: any
  companyPetBreeds: any
  companyPetSizes: any
}

export interface Category2 {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface City {
  id: number
  name: string
  stateId: number
  ibge: string
  latLon: string
  codTom: number
  createdAt: string
  state: State
}

export interface State {
  id: number
  uf: string
  name: string
  ibge: number
  ddd: string
  createdAt: string
}
